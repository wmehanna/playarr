import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GameResultDto } from '@playarr/shared-types';

@Injectable()
export class SearchService {
    constructor(private http: HttpClient) {}

    search(term: string): Observable<GameResultDto[]> {
        return this.http.get<GameResultDto[]>('/api/search', { params: { q: term } });
    }

    download(magnet: string, client: string = 'qBittorrent'): Observable<void> {
        return this.http.post<void>('/api/torrents', { magnet, client });
    }
}
