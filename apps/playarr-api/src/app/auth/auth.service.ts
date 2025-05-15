import { Injectable, BadRequestException, UnauthorizedException, NotFoundException } from '@nestjs/common';
import { UsersDao } from './users.dao';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { RegisterDto, LoginDto, ForgotPasswordDto, ResetPasswordDto, AuthResponseDto } from '@playarr/shared-types';
import { PasswordResetDao } from './password-reset.dao';

@Injectable()
export class AuthService {
    constructor(
        private users: UsersDao,
        private jwt: JwtService,
        private resetDao: PasswordResetDao,
    ) {}

    async register(dto: RegisterDto): Promise<AuthResponseDto> {
        const existing = await this.users.findByUsername(dto.username);
        if (existing) throw new BadRequestException('Username already taken');
        const hash = await bcrypt.hash(dto.password, 10);
        const user = await this.users.create(dto.username, hash);
        const token = this.jwt.sign({ sub: user.id, username: user.username });
        return { accessToken: token };
    }

    async login(dto: LoginDto): Promise<AuthResponseDto> {
        const user = await this.users.findByUsername(dto.username);
        if (!user) throw new UnauthorizedException('Invalid credentials');
        const valid = await bcrypt.compare(dto.password, user.passwordHash);
        if (!valid) throw new UnauthorizedException('Invalid credentials');
        const token = this.jwt.sign({ sub: user.id, username: user.username });
        return { accessToken: token };
    }

    async forgotPassword(dto: ForgotPasswordDto) {
        const user = await this.users.findByUsername(dto.username);
        if (!user) throw new NotFoundException('User not found');
        const token = await this.resetDao.generateToken(user.id);
        // TODO: trigger email send
        return { message: 'Password reset link sent' };
    }

    async resetPassword(dto: ResetPasswordDto) {
        const entry = await this.resetDao.findByToken(dto.token);
        if (!entry || entry.used || entry.expiresAt < new Date()) {
            throw new BadRequestException('Invalid or expired token');
        }
        const hash = await bcrypt.hash(dto.newPassword, 10);
        await this.users.updatePassword(entry.userId, hash);
        await this.resetDao.markUsed(entry.id);
        return { message: 'Password has been reset' };
    }
}
