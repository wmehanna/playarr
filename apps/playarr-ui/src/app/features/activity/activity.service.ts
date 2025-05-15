import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { Observable, Subject } from 'rxjs';

export interface DownloadEvent {
    hash: string;
    progress: number;
    timestamp: string;
}

export interface ExtractEvent {
    hash: string;
    status: string;
    message?: string;
    timestamp: string;
}

@Injectable()
export class ActivityService {
    private socket: Socket;
    private downloadSubject = new Subject<DownloadEvent>();
    private extractSubject = new Subject<ExtractEvent>();

    constructor() {
        this.socket = io(); // same origin
        this.socket.on('download.status', (evt: DownloadEvent) =>
            this.downloadSubject.next(evt)
        );
        this.socket.on('extract.status', (evt: ExtractEvent) =>
            this.extractSubject.next(evt)
        );
    }

    onDownload(): Observable<DownloadEvent> {
        return this.downloadSubject.asObservable();
    }

    onExtract(): Observable<ExtractEvent> {
        return this.extractSubject.asObservable();
    }
}
