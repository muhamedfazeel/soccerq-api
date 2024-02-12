import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { SuccessResponseDto } from 'src/shared/dto/success-response.dto';

export class LoginDto {
  @ApiProperty({ example: 'user' })
  @IsString()
  username: string;
}

class LoginUserData extends LoginDto {
  @ApiProperty()
  password: string;
}

export class LoginResponse extends SuccessResponseDto {
  @ApiProperty({ type: LoginUserData })
  data: LoginUserData;
}
