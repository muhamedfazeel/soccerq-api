import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ApiModule } from './api/api.module';
import configuration from './config/configuration';
import validationSchema from './config/validation';
import { HealthModule } from './health/health.module';
import { SharedModule } from './shared/shared.module';
import { UserModule } from './api/user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
      validationSchema,
    }),
    HealthModule,
    ApiModule,
    SharedModule,
    UserModule,
  ],
})
export class AppModule {}
