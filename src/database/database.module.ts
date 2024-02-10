import { Module } from '@nestjs/common';
import { DatabaseService } from './database.service';
import { UtilsModule } from 'src/utils/utils.module';
import {
  pgReadConnectionFactory,
  pgWriteConnectionFactory,
} from './database.provider';
import { CustomLoggerModule } from 'src/shared/logger/custom-logger.module';

@Module({
  imports: [CustomLoggerModule, UtilsModule],
  providers: [
    pgReadConnectionFactory,
    pgWriteConnectionFactory,
    DatabaseService,
  ],
  exports: [DatabaseService],
})
export class DatabaseModule {}
