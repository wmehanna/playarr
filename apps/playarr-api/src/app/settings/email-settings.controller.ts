import { Controller, Get, Put, Body } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { EmailSettingsService } from './email-settings.service';
import { EmailSettingsDto } from '@playarr/shared-types';

@ApiTags('Settings')
@Controller('api/settings/email')
export class EmailSettingsController {
    constructor(private svc: EmailSettingsService) {}

    @Get()
    @ApiOperation({ summary: 'Get email service settings' })
    get() {
        return this.svc.getSettings();
    }

    @Put()
    @ApiOperation({ summary: 'Update email service settings' })
    save(@Body() dto: EmailSettingsDto) {
        return this.svc.saveSettings(dto);
    }
}
