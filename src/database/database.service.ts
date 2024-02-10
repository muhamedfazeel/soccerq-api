import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Pool, PoolConfig } from 'pg';

@Injectable()
export class DatabaseService implements OnModuleInit, OnModuleDestroy {
  private readPool: Pool;
  private writePool: Pool;
  private readClient: any;
  private writeClient: any;

  constructor(private readonly configService: ConfigService) {
    const readPoolConfig = this.getConfig('read');
    const writePoolConfig = this.getConfig('write');

    this.readPool = new Pool(readPoolConfig as PoolConfig);
    this.writePool = new Pool(writePoolConfig as PoolConfig);
  }

  async onModuleInit() {
    await this.connectWithRetry(this.readPool);
    await this.connectWithRetry(this.writePool, false);
  }

  async onModuleDestroy() {
    await this.readPool.end();
    await this.writePool.end();
  }

  private async connectWithRetry(pool: Pool, read = true, attempts = 5) {
    try {
      const connection = await pool.connect();
      if (read) this.readClient = connection;
      else this.writeClient = connection;
    } catch (err) {
      if (attempts === 0) throw err;
      await new Promise((resolve) => setTimeout(resolve, 5000)); // wait for 5 seconds
      return this.connectWithRetry(pool, read, attempts - 1);
    }
  }

  private getConfig(type: 'read' | 'write'): Partial<PoolConfig> {
    const config = `database.${type}`;
    return {
      user: this.configService.get<string>(`${config}.username`),
      host: this.configService.get<string>(`${config}.host`), // Example usage of another config value
      database: this.configService.get<string>(`${config}.database`),
      password: this.configService.get<string>(`${config}.password`),
      port: parseInt(this.configService.get<string>(`${config}.port`), 10), // Ensure parsing to a number
      // Other configurations specific to read or write pool
    };
  }

  async query(text: string, params: any[], isReadQuery = true) {
    const client = isReadQuery ? this.readClient : this.writeClient;
    try {
      const result = await client.query(text, params);
      return result;
    } catch (err) {
      throw new Error(err);
    }
  }
}
