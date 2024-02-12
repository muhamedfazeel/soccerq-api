import { Inject, Injectable, Type } from '@nestjs/common';
import { Pool } from 'pg';
import { DbExceptionError } from '../errors/db-exception.error';
import { UtilsService } from '../utils/utils.service';
import * as K from './constants/database.constants';
import {
  DeleteQueryParams,
  InsertQueryParams,
  SelectQueryParams,
  UpdateQueryParams,
} from './interfaces/database.interface';
import { plainToClass } from 'class-transformer';
import { CustomLogger } from 'src/shared/logger/custom-logger.service';

@Injectable()
export class DatabaseService<T> {
  constructor(
    private readonly logger: CustomLogger,
    private readonly utils: UtilsService,
    @Inject(K.POSTGRES_READ_CONNECTION.PROVIDER)
    private readonly readPool: Pool,
    @Inject(K.POSTGRES_WRITE_CONNECTION.PROVIDER)
    private readonly writePool: Pool,
  ) {
    this.logger.setContext(DatabaseService.name);
  }

  /**
   * Method for running a query.
   * @param {string} query Query string.
   * @param {any[]} values Query parameters.
   * @param {Type<T>} type Query response DTO.
   * @param {boolean} isReadQuery The query type (read or write) identifier.
   * @returns {Promise<any>} Query output.
   */
  async runQuery(
    query: string,
    values: any[] = [],
    type: Type<T>,
    isReadQuery: boolean,
  ): Promise<any> {
    const pool = isReadQuery ? this.readPool : this.writePool;
    const start = Date.now();

    return pool
      .query(query, values)
      .then((result) => {
        this.logger.log({
          type: isReadQuery ? '[Read]' : '[Write]',
          query,
          time: Date.now() - start,
          rows: result.rows?.length || 0,
        });

        const data = result.rows;
        return plainToClass(type, data);
      })
      .catch((err) => {
        this.logger.log({ query, time: Date.now() - start });
        this.logger.error(err);
        throw new DbExceptionError(err, err.message);
      });
  }

  /**
   * Method specifically for running a raw query.
   * @param {string} query Query string.
   * @param {Array<any>} params The values to inject into the query at runtime, preventing SQL injection.
   * @param {Type<T>} type Query response DTO.
   * @param {boolean} isReadQuery The query type (read or write) identifier.
   * @returns {Promise<T>} Query output.
   */
  rawQuery(
    query: string,
    params: Array<any>,
    type: Type<T>,
    isReadQuery: boolean,
  ): Promise<T> {
    return this.runQuery(query, params, type, isReadQuery);
  }

  /**
   * Method specifically for running a SELECT query.
   * @param {SelectQueryParams} params Select query parameters [SelectQueryParams].
   * @param {Type<T>} type Query response DTO.
   * @returns {Promise<T>} Query output.
   */
  query(params: SelectQueryParams, type: Type<T>): Promise<T> {
    if (!params.query) params.query = '* ';
    let dbQuery = `SELECT ${params.query} \n FROM ${params.table}`;

    if (params.join) dbQuery = `\n${dbQuery} ${params.join}`;
    if (params.where) dbQuery = `\n${dbQuery} WHERE ${params.where}`;
    if (params.order) dbQuery = `\n${dbQuery} ORDER BY ${params.order}`;
    if (params.limit) dbQuery = `\n${dbQuery} LIMIT ${params.limit}`;
    if (params.offset) dbQuery = `\n${dbQuery} OFFSET ${params.offset}`;

    return this.runQuery(dbQuery, params.variables, type, true);
  }

  /**
   * Method specifically for running a INSERT query.
   * @param {InsertQueryParams} params Insert query parameters [InsertQueryParams].
   * @param {Type<T>} type Query response DTO.
   * @returns {Promise<T>} Query output.
   */
  insert(params: InsertQueryParams, type: Type<T>): Promise<T> {
    const query =
      'INSERT INTO ' +
      params.table +
      ' (' +
      params.columns +
      ') VALUES (' +
      params.values +
      ') RETURNING *;';
    return this.runQuery(query, params.variables, type, false);
  }

  /**
   * Method specifically for running a UPDATE query.
   * @param {UpdateQueryParams} params Update query parameters [UpdateQueryParams].
   * @param {Type<T>} type Query response DTO.
   * @returns {Promise<T>} Query output.
   */
  update(params: UpdateQueryParams, type: Type<T>): Promise<T> {
    const query =
      'UPDATE ' +
      params.table +
      ' SET ' +
      params.set +
      ' WHERE ' +
      params.where +
      ' RETURNING *;';
    return this.runQuery(query, params.variables, type, false);
  }

  /**
   * Method specifically for running a DELETE query.
   * @param {DeleteQueryParams} params Delete query parameters [DeleteQueryParams].
   * @param {Type<T>} type Query response DTO.
   * @returns {Promise<T>} Query output.
   */
  delete(params: DeleteQueryParams, type: Type<T>): Promise<T> {
    const query =
      'DELETE FROM ' + params.table + ' WHERE ' + params.where + ';';
    return this.runQuery(query, params.variables, type, false);
  }

  /**
   * Method for running a query.
   * @param {string} query Query string.
   * @param {any[]} values Query parameters.
   * @param {Type<T>} type Query response DTO.
   * @param {boolean} isReadQuery The query type (read or write) identifier.
   * @returns {Promise<any[]>} Query output.
   */
  async runQueryForOpenSearch(query: string, values: any[] = []): Promise<any> {
    const start = Date.now();

    return this.readPool
      .query(query, values)
      .then((result) => {
        this.logger.log({
          type: '[Read]',
          query,
          time: Date.now() - start,
          rows: result.rows?.length || 0,
        });
        return result.rows;
      })
      .catch((err) => {
        this.logger.log({ query, time: Date.now() - start });
        this.logger.error(err);
        throw new DbExceptionError(err, err.message);
      });
  }
  transaction(command: string): Promise<any> {
    return this.runQuery(command, null, null, false);
  }
}
