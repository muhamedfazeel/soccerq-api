import { Module } from '@nestjs/common';
import { UtilsModule } from '../utils/utils.module';
import { CustomLoggerModule } from './logger/custom-logger.module';
import { DatabaseModule } from 'src/database/database.module';

const sharedModules = [CustomLoggerModule, UtilsModule];

@Module({
  imports: sharedModules,
  exports: sharedModules,
})
export class SharedModule {}
