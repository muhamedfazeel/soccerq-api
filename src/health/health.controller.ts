import { Controller, Get, HttpStatus } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { SuccessResponseDto } from 'src/shared/dto/success-response.dto';

@ApiTags('Health')
@Controller('status')
export class HealthController {
  @Get()
  @ApiOperation({ summary: 'Get health of server' })
  @ApiResponse({ type: SuccessResponseDto, status: HttpStatus.OK })
  statusCheck() {
    return {
      message: 'Server is up and running',
    };
  }
}
