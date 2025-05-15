import { Injectable } from '@nestjs/common';
import { EmailSettingsDao } from './email-settings.dao';
import { EmailSettingsDto } from '@playarr/shared-types';

@Injectable()
export class EmailSettingsService {
    constructor(private dao: EmailSettingsDao) {}

    async getSettings(): Promise<EmailSettingsDto> {
        return (await this.dao.get()) as EmailSettingsDto;
    }

    async saveSettings(dto: EmailSettingsDto): Promise<EmailSettingsDto> {
        return (await this.dao.upsert(dto as any)) as EmailSettingsDto;
    }
}
