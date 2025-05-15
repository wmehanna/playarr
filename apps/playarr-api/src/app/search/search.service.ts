import { Injectable, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import Parser from 'rss-parser';
import { firstValueFrom } from 'rxjs';
import { FeedsDao } from '../settings/feeds.dao';
import { GameResultDto } from '@playarr/shared-types';

@Injectable()
export class SearchService {
    private readonly logger = new Logger(SearchService.name);
    private parser = new Parser();

    constructor(private feedsDao: FeedsDao, private http: HttpService) {}

    async search(term: string): Promise<GameResultDto[]> {
        const feeds = await this.feedsDao.findAll();
        const results: GameResultDto[] = [];

        for (const feed of feeds) {
            try {
                const resp = await firstValueFrom(this.http.get<string>(feed.url, { responseType: 'text' }));
                const parsed = await this.parser.parseString(resp.data);
                for (const item of parsed.items) {
                    if (!item.title.toLowerCase().includes(term.toLowerCase())) continue;
                    const mag = (item.link || '').match(/(magnet:\?xt=[^&]+)/)?.[1] || '';
                    results.push({
                        title: item.title,
                        magnet: mag,
                        size: item.enclosure?.length || '',
                        seeds: 0,
                        peers: 0,
                        coverUrl: item.enclosure?.url,
                    });
                }
            } catch (err) {
                this.logger.error(`Feed error: ${feed.url}`, err.stack);
            }
        }
        return results;
    }
}
