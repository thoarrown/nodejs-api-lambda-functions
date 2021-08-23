import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';

import { AuthSignupReq } from './dto/auth.signup.dto';
import {
  ApiBearerAuth,
  ApiExtraModels,
  ApiOkResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
  getSchemaPath,
} from '@nestjs/swagger';
import { AuthSigninReq } from './dto/auth.signin.dto';
import { AuthSigninResponse, AuthSignupResponse } from './response';
import { AuthGuard } from '@nestjs/passport';
import { CurrentUser } from '@app/decorators/current-user.decorator';
import { IUser } from '@app/interfaces/user.interface';
import { ApiProperty } from '@nestjsx/crud/lib/crud';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  @ApiOperation({ summary: 'Sign up' })
  @ApiOkResponse({
    status: 201,
    description: 'User object',
    type: AuthSignupResponse,
  })
  signup(@Body() args: AuthSignupReq): Promise<AuthSignupResponse> {
    return this.authService.signup(args);
  }

  @Post('signin')
  @ApiOperation({ summary: 'Sign in' })
  signin(@Body() args: AuthSigninReq): Promise<AuthSigninResponse> {
    return this.authService.signin(args);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('me')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Sign in' })
  getMe(@CurrentUser() args: IUser): any {
    return this.authService.getMe(args.email);
  }
}
