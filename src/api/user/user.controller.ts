import { Body, Controller, Post } from '@nestjs/common';
import { ApiBody, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';
import { LoginDto } from './dto/user-login.dto';

@ApiTags('User')
@Controller({ path: 'user', version: '1' })
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('login')
  @ApiOperation({ summary: 'User Login API' })
  @ApiBody({ type: LoginDto })
  @ApiOkResponse({ type: '' })
  userLogin(@Body() body: LoginDto) {
    return this.userService.login(body);
  }
}
