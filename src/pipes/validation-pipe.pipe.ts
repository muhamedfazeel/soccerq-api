import {
  ArgumentMetadata,
  HttpException,
  HttpStatus,
  ValidationPipe,
  ValidationPipeOptions,
} from '@nestjs/common';

export class CustomValidationPipe extends ValidationPipe {
  private readonly isWeb: boolean;

  constructor(private options?: ValidationPipeOptions, isWeb = false) {
    super();
    this.isWeb = isWeb;
  }

  async transform(value: any, metadata: ArgumentMetadata): Promise<any> {
    this.validatorOptions = {
      ...this.validatorOptions,
      skipMissingProperties: false,
      whitelist: true,
      forbidNonWhitelisted: false,
      ...this.options,
    };
    try {
      const result = await super.transform(value, metadata);
      return result;
    } catch (error) {
      let errorResponse = {};

      if (this.isWeb) {
        errorResponse = {
          code: -1,
          message: error.response.message.filter((err: any) => err),
        };
      } else {
        errorResponse = {
          statusCode: HttpStatus.BAD_REQUEST,
          message: error.response.message,
        };
      }

      throw new HttpException(errorResponse, HttpStatus.BAD_REQUEST);
    }
  }
}
