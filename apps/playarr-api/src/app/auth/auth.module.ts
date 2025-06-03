import { Module } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersDao } from './users.dao';
import { JwtStrategy } from './jwt.strategy';
import { PasswordResetDao } from './password-reset.dao';

@Module({
    imports: [
        PassportModule,
        JwtModule.register({
            secret: process.env.JWT_SECRET || 'supersecretkey',
            signOptions: { expiresIn: '24h' },
        }),
    ],
    providers: [AuthService, UsersDao, JwtStrategy, PasswordResetDao, PrismaService],
    controllers: [AuthController],
    exports: [AuthService, PrismaService],
})
export class AuthModule {}
