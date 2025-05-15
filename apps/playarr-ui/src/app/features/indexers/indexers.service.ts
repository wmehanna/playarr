import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FeedDto } from '@playarr/shared-types';

@Injectable()
export class IndexersService {
    private base = '/api/feeds';

    constructor(private http: HttpClient) {}

    list(): Observable<FeedDto[]> {
        return this.http.get<FeedDto[]>(this.base);
    }

    create(data: Omit<FeedDto, 'id'>): Observable<FeedDto> {
        return this.http.post<FeedDto>(this.base, data);
    }

    update(id: number, data: Partial<FeedDto>): Observable<FeedDto> {
        return this.http.put<FeedDto>(`${this.base}/${id}`, data);
    }

    remove(id: number): Observable<void> {
        return this.http.delete<void>(`${this.base}/${id}`);
    }
}
