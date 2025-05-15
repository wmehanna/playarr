import { Component, OnInit } from '@angular/core';
import { ActivityService, DownloadEvent, ExtractEvent } from './activity.service';
import { NotificationService } from '../../core/notification.service';
import { MatDialog } from '@angular/material/dialog';
import { LogDialogComponent } from './log-dialog.component';

@Component({
    selector: 'pa-activity',
    template: `
    <h2>Activity</h2>
    <mat-list>
      <mat-list-item *ngFor="let e of events">
        <ng-container *ngIf="isDownload(e)">
          📥 {{ e.hash }}: {{ e.progress }}%
        </ng-container>
        <ng-container *ngIf="!isDownload(e)">
          🔄 {{ e.hash }}: {{ e.status }} {{ e.message || '' }}
        </ng-container>
        <span class="activity__timestamp">
          {{ e.timestamp | date:'shortTime' }}
        </span>
        <button mat-icon-button (click)="openLogs(e.hash)">
          <mat-icon>list</mat-icon>
        </button>
      </mat-list-item>
    </mat-list>
  `,
    styles: [`.activity__timestamp { margin-left:auto; font-size:0.8em; color:gray; }`]
})
export class ActivityComponent implements OnInit {
    events: Array<DownloadEvent | ExtractEvent> = [];

    constructor(
        private activity: ActivityService,
        private notifications: NotificationService,
        private dialog: MatDialog
    ) {}

    ngOnInit() {
        this.activity.onDownload().subscribe(evt => this.events.unshift(evt));
        this.activity.onExtract().subscribe(evt => {
            this.events.unshift(evt);
            if (evt.status === 'done') {
                this.notifications.notify(
                    `Extraction complete: ${evt.hash}`,
                    { body: 'Game unpacked successfully.' }
                );
            } else if (evt.status === 'error') {
                this.notifications.notify(
                    `Extraction failed: ${evt.hash}`,
                    { body: evt.message || 'An error occurred.' }
                );
            }
        });
    }

    isDownload(e: any): e is DownloadEvent {
        return (e as DownloadEvent).progress !== undefined;
    }

    openLogs(hash: string) {
        this.dialog.open(LogDialogComponent, { data: { hash } });
    }
}
