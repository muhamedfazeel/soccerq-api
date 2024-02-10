export const POSTGRES_READ_CONNECTION = {
  NAME: 'Read Replica',
  PROVIDER: 'postgres_read_connection',
  FACTORY: 'pgReadConnectionFactory',
};

export const POSTGRES_WRITE_CONNECTION = {
  NAME: 'Write Replica',
  PROVIDER: 'postgres_write_connection',
  FACTORY: 'pgWriteConnectionFactory',
};

export const DATABASE_CONNECTION = 'Database connection';

export const MAX_ATTEMPT = 9;
export const ATTEMPT_DELAY = 1000;
