import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { CustomLogger } from 'src/shared/logger/custom-logger.service';
import { LoginDto } from './dto/user-login.dto';
import { FetchUserQuery } from './db-query/db-queries';

@Injectable()
export class UserService {
  constructor(
    private readonly logger: CustomLogger,
    private readonly db: DatabaseService<any>,
  ) {
    this.logger.setContext(UserService.name);
  }

  async login(body: LoginDto) {
    try {
      const { username } = body;

      const resultData = await this.db.rawQuery(
        FetchUserQuery,
        [username],
        LoginDto,
        true,
      );

      if (!resultData || !resultData.length) {
        throw new HttpException(
          'Invalid username/password',
          HttpStatus.BAD_REQUEST,
        );
      }

      const [user] = resultData;

      return user;
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }
}
