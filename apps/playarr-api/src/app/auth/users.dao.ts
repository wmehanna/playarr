import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { User } from '@prisma/client';

@Injectable()
export class UsersDao {
    constructor(private prisma: PrismaService) {}

    findByUsername(username: string): Promise<User | null> {
        return this.prisma.user.findUnique({ where: { username } });
    }

    create(username: string, passwordHash: string): Promise<User> {
        return this.prisma.user.create({ data: { username, passwordHash } });
    }

    updatePassword(userId: number, hash: string) {
        return this.prisma.user.update({ where: { id: userId }, data: { passwordHash: hash } });
    }
}
