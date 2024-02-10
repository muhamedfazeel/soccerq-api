import { registerAs } from '@nestjs/config';

const env = process.env;

export default registerAs('config', () => ({
  environment: env.NODE_ENV,
  port: env.PORT,
  localhost: env.LOCALHOST,
  logger: {
    level: env.LOGGER_LEVEL,
    prettyPrintLog: env.PRETTY_PRINT_LOG,
  },
  swaggerServer: env.SWAGGER_SERVER,
  db: {
    readHost: env.DB_READ_HOST,
    readPort: env.DB_READ_PORT,
    readDatabase: env.DB_READ_NAME,
    readUsername: env.DB_READ_USERNAME,
    readPassword: env.DB_READ_PASSWORD,
    writeHost: env.DB_WRITE_HOST,
    writePort: env.DB_WRITE_PORT,
    writeDatabase: env.DB_WRITE_NAME,
    writeUsername: env.DB_WRITE_USERNAME,
    writePassword: env.DB_WRITE_PASSWORD,
  },
  devServerUrl: env.DEV_SERVER_URL,
  maxLoginLimit: env.MAX_LOGIN_LIMIT,
}));
