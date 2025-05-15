import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { EmailSettingsDto } from '@playarr/shared-types';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
    selector: 'pa-email-settings',
    template: `
    <h3>Email Service Settings</h3>
    <form [formGroup]="form" (ngSubmit)="save()">
      <mat-form-field appearance="outline" class="u-full-width">
        <mat-label>Provider</mat-label>
        <mat-select formControlName="provider">
          <mat-option value="sendgrid">SendGrid</mat-option>
          <mat-option value="smtp">SMTP</mat-option>
        </mat-select>
      </mat-form-field>

      <mat-form-field *ngIf="form.value.provider==='sendgrid'" appearance="outline" class="u-full-width">
        <mat-label>SendGrid API Key</mat-label>
        <input matInput formControlName="apiKey" type="password" />
      </mat-form-field>

      <ng-container *ngIf="form.value.provider==='smtp'">
        <mat-form-field appearance="outline" class="u-full-width">
          <mat-label>SMTP Host</mat-label>
          <input matInput formControlName="smtpHost" />
        </mat-form-field>
        <mat-form-field appearance="outline" class="u-full-width">
          <mat-label>SMTP Port</mat-label>
          <input matInput formControlName="smtpPort" type="number" />
        </mat-form-field>
        <mat-form-field appearance="outline" class="u-full-width">
          <mat-label>SMTP User</mat-label>
          <input matInput formControlName="smtpUser" />
        </mat-form-field>
        <mat-form-field appearance="outline" class="u-full-width">
          <mat-label>SMTP Pass</mat-label>
          <input matInput formControlName="smtpPass" type="password" />
        </mat-form-field>
        <mat-checkbox formControlName="smtpSecure">Use SSL</mat-checkbox>
      </ng-container>

      <mat-form-field appearance="outline" class="u-full-width">
        <mat-label>From Address</mat-label>
        <input matInput formControlName="fromAddress" />
      </mat-form-field>

      <button mat-raised-button color="primary" class="u-full-width" [disabled]="form.invalid">
        Save
      </button>
    </form>
  `,
    styles: [`.u-full-width { width: 100%; }`]
})
export class EmailSettingsComponent implements OnInit {
    form: FormGroup;

    constructor(
        private fb: FormBuilder,
        private http: HttpClient,
        private snackBar: MatSnackBar
    ) {
        this.form = this.fb.group({
            provider: ['sendgrid', Validators.required],
            apiKey: ['', Validators.required],
            fromAddress: ['', [Validators.required, Validators.email]],
            smtpHost: [''],
            smtpPort: [''],
            smtpUser: [''],
            smtpPass: [''],
            smtpSecure: [false]
        });
    }

    ngOnInit() {
        this.http.get<EmailSettingsDto>('/api/settings/email')
            .subscribe(cfg => this.form.patchValue(cfg));
    }

    save() {
        this.http.put<EmailSettingsDto>('/api/settings/email', this.form.value)
            .subscribe(() => this.snackBar.open('Email settings saved', 'Close', { duration: 3000 }));
    }
}
