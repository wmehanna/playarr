import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { GeneralSettingsDto } from '@playarr/shared-types';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
    selector: 'pa-archive-settings',
    template: `
    <h3>Archive Settings</h3>
    <form [formGroup]="form" (ngSubmit)="save()">
      <label>
        Archive Path:
        <input formControlName="archivePath" placeholder="/mnt/user/appdata/playarr/archive" required />
      </label>
      <label>
        <input type="checkbox" formControlName="useRsync" />
        Use Rsync for moving
      </label>
      <button type="button" (click)="test()">Test Share</button>
      <button type="submit">Save</button>
    </form>
    <p *ngIf="statusMessage">{{ statusMessage }}</p>
  `,
    styles: [`.u-full-width { width: 100%; }`]
})
export class ArchiveSettingsComponent implements OnInit {
    form: FormGroup;
    statusMessage = '';

    constructor(
        private fb: FormBuilder,
        private http: HttpClient,
        private snackBar: MatSnackBar
    ) {
        this.form = this.fb.group({
            archivePath: [''],
            useRsync: [false]
        });
    }

    ngOnInit() {
        this.http.get<GeneralSettingsDto>('/api/settings/archive')
            .subscribe(cfg => this.form.patchValue(cfg));
    }

    save() {
        this.http.put<GeneralSettingsDto>('/api/settings/archive', this.form.value)
            .subscribe(() => this.snackBar.open('Archive settings saved', 'Close', { duration: 3000 }));
    }

    test() {
        this.http.post<{ok:boolean, message?:string}>('/api/settings/archive/test', {})
            .subscribe(res =>
                this.statusMessage = res.ok ? 'Share OK' : `Error: ${res.message}`
            );
    }
}
