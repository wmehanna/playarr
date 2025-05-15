import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GameDto } from '@playarr/shared-types';

@Injectable()
export class LibraryService {
    constructor(private http: HttpClient) {}

    list(): Observable<GameDto[]> {
        return this.http.get<GameDto[]>('/api/library');
    }

    enrich(hash: string, title: string): Observable<GameDto> {
        return this.http.post<GameDto>('/api/library/enrich', { hash, title });
    }
}
