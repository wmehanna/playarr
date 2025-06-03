import { Module } from '@nestjs/common';
import { EmailSettingsController } from './email-settings.controller';
import { EmailSettingsService } from './email-settings.service';
import { EmailSettingsDao } from './email-settings.dao';
import { GeneralSettingsDao } from './general-settings.dao';
import { FeedsDao } from './feeds.dao';

@Module({
  controllers: [EmailSettingsController],
  providers: [EmailSettingsService, EmailSettingsDao, GeneralSettingsDao, FeedsDao],
  exports: [EmailSettingsService, EmailSettingsDao, GeneralSettingsDao, FeedsDao],
})
export class SettingsModule {}
