import { Controller, Get, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiQuery } from '@nestjs/swagger';
import { SearchService } from './search.service';
import { GameResultDto } from '@playarr/shared-types';

@ApiTags('Search')
@Controller('api/search')
export class SearchController {
    constructor(private readonly svc: SearchService) {}

    @Get()
    @ApiOperation({ summary: 'Search across all indexer feeds for game repacks' })
    @ApiQuery({ name: 'q', description: 'Search term', required: true })
    search(@Query('q') q: string): Promise<GameResultDto[]> {
        return this.svc.search(q);
    }
}
