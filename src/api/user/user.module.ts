import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UtilsService } from 'src/utils/utils.service';
import { CustomLoggerModule } from 'src/shared/logger/custom-logger.module';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [CustomLoggerModule, DatabaseModule],
  controllers: [UserController],
  providers: [UserService, UtilsService],
})
export class UserModule {}
