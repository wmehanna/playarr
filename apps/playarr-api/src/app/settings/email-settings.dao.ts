import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { EmailSettings } from '@prisma/client';

@Injectable()
export class EmailSettingsDao {
    constructor(private prisma: PrismaService) {}

    get(): Promise<EmailSettings | null> {
        return this.prisma.emailSettings.findFirst({ where: { id: 1 } });
    }

    upsert(data: Omit<EmailSettings, 'id' | 'createdAt' | 'updatedAt'>) {
        return this.prisma.emailSettings.upsert({
            where: { id: 1 },
            create: { id: 1, ...data },
            update: data,
        });
    }
}
