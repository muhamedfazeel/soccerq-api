import { Provider } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { Pool } from 'pg';
import { from, lastValueFrom, timer } from 'rxjs';
import { catchError, retry, tap } from 'rxjs/operators';
import configuration from '../config/configuration';
import * as K from './constants/database.constants';
import { CustomLogger } from 'src/shared/logger/custom-logger.service';

export const pgReadConnectionFactory: Provider = generateDBPool({
  isWriteReplica: false,
  provider: K.POSTGRES_READ_CONNECTION.PROVIDER,
  connectionName: K.POSTGRES_READ_CONNECTION.NAME,
  factoryName: K.POSTGRES_READ_CONNECTION.FACTORY,
});

export const pgWriteConnectionFactory: Provider = generateDBPool({
  isWriteReplica: true,
  provider: K.POSTGRES_WRITE_CONNECTION.PROVIDER,
  connectionName: K.POSTGRES_WRITE_CONNECTION.NAME,
  factoryName: K.POSTGRES_WRITE_CONNECTION.FACTORY,
});

function generateDBPool({
  connectionName,
  isWriteReplica,
  provider,
  factoryName,
}): Provider {
  return {
    provide: provider,
    useFactory: async (config: ConfigType<typeof configuration>) => {
      const logger = new CustomLogger(factoryName);
      logger.setContext(factoryName);

      const writePool = {
        host: config.db.writeHost,
        database: config.db.writeDatabase,
        port: parseInt(config.db.writePort, 10),
        user: config.db.writeUsername,
        password: config.db.writePassword,
      };
      const readPool = {
        host: config.db.readHost,
        database: config.db.readDatabase,
        port: parseInt(config.db.readPort, 10),
        user: config.db.readUsername,
        password: config.db.readPassword,
      };
      const pool = new Pool(isWriteReplica ? writePool : readPool);

      return lastValueFrom(
        from(pool.connect()).pipe(
          retry({
            count: K.MAX_ATTEMPT,
            delay: (error: Error, retryCount) => {
              logger.warn(
                `Unable to connect to ${connectionName}. ${error.message}. Retrying ${retryCount}...`,
              );
              return timer(K.ATTEMPT_DELAY);
            },
            resetOnSuccess: true,
          }),
          catchError(async (err) => {
            const message = `${K.DATABASE_CONNECTION} [${connectionName}] ${err}`;
            logger.error(message);
            throw err;
          }),
          tap(() => {
            logger.log(`Connected to Postgres ${connectionName} successfully!`);
          }),
        ),
      );
    },
    inject: [configuration.KEY],
  };
}
