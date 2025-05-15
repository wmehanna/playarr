import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { LogEntryDto } from '@playarr/shared-types';
import { HttpClient } from '@angular/common/http';

@Component({
    selector: 'pa-log-dialog',
    template: `
    <h2 mat-dialog-title>Logs for {{ data.hash }}</h2>
    <mat-dialog-content>
      <pre *ngFor="let log of logs">
        [{{ log.timestamp | date:'shortTime' }}] {{ log.type }}: {{ log.message }}
      </pre>
    </mat-dialog-content>
    <mat-dialog-actions>
      <button mat-button (click)="close()">Close</button>
    </mat-dialog-actions>
  `,
    styles: [`pre { white-space: pre-wrap; word-break: break-word; }`]
})
export class LogDialogComponent {
    logs: LogEntryDto[] = [];

    constructor(
        private dialogRef: MatDialogRef<LogDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: { hash: string },
        private http: HttpClient
    ) {
        this.http.get<LogEntryDto[]>(`/api/logs/${data.hash}`)
            .subscribe(l => this.logs = l);
    }

    close() {
        this.dialogRef.close();
    }
}
