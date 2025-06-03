import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { PasswordResetToken } from '@prisma/client';
import { randomBytes } from 'crypto';

@Injectable()
export class PasswordResetDao {
  constructor(private prisma: PrismaService) {}

  async generateToken(userId: number): Promise<string> {
    const token = randomBytes(32).toString('hex');
    await this.prisma.passwordResetToken.create({
      data: {
        userId,
        token,
        expiresAt: new Date(Date.now() + 3600 * 1000),
      },
    });
    return token;
  }

  findByToken(token: string): Promise<PasswordResetToken | null> {
    return this.prisma.passwordResetToken.findUnique({ where: { token } });
  }

  markUsed(id: number) {
    return this.prisma.passwordResetToken.update({ where: { id }, data: { used: true } });
  }
}
