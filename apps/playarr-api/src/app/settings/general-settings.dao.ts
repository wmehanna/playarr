import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { GeneralSettings } from '@prisma/client';

@Injectable()
export class GeneralSettingsDao {
    constructor(private prisma: PrismaService) {}

    find(): Promise<GeneralSettings | null> {
        return this.prisma.generalSettings.findFirst({ where: { id: 1 } });
    }

    upsert(data: Omit<GeneralSettings, 'id'>): Promise<GeneralSettings> {
        return this.prisma.generalSettings.upsert({
            where: { id: 1 },
            create: { id: 1, ...data },
            update: data,
        });
    }
}
