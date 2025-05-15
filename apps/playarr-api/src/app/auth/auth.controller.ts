import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { RegisterDto, LoginDto, AuthResponseDto, ForgotPasswordDto, ResetPasswordDto } from '@playarr/shared-types';

@ApiTags('Auth')
@Controller('api/auth')
export class AuthController {
    constructor(private svc: AuthService) {}

    @Post('register')
    @ApiOperation({ summary: 'Register a new user' })
    @ApiResponse({ status: 201, type: AuthResponseDto })
    register(@Body() dto: RegisterDto) {
        return this.svc.register(dto);
    }

    @Post('login')
    @ApiOperation({ summary: 'Login and receive JWT' })
    @ApiResponse({ status: 200, type: AuthResponseDto })
    login(@Body() dto: LoginDto) {
        return this.svc.login(dto);
    }

    @Post('forgot-password')
    @ApiOperation({ summary: 'Request a password reset' })
    @ApiResponse({ status: 200, schema: { example: { message: 'Password reset link sent' } } })
    forgot(@Body() dto: ForgotPasswordDto) {
        return this.svc.forgotPassword(dto);
    }

    @Post('reset-password')
    @ApiOperation({ summary: 'Reset password with token' })
    @ApiResponse({ status: 200, schema: { example: { message: 'Password has been reset' } } })
    reset(@Body() dto: ResetPasswordDto) {
        return this.svc.resetPassword(dto);
    }
}
