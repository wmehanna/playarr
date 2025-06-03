import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { SearchService } from './search.service';
import { SearchController } from './search.controller';
import { SettingsModule } from '../settings/settings.module';

@Module({
  imports: [HttpModule, SettingsModule],
  controllers: [SearchController],
  providers: [SearchService],
})
export class SearchModule {}
