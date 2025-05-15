import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../core/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
    selector: 'pa-forgot-password',
    template: `
    <div fxLayout="column" fxLayoutAlign="center center" class="auth__container">
      <mat-card class="auth__card">
        <mat-card-header>
          <mat-card-title>Forgot Password</mat-card-title>
        </mat-card-header>
        <mat-card-content [formGroup]="form">
          <mat-form-field appearance="outline" class="u-full-width">
            <mat-label>Username</mat-label>
            <input matInput formControlName="username" />
            <mat-error *ngIf="form.get('username').hasError('required')">
              Username is required
            </mat-error>
          </mat-form-field>
        </mat-card-content>
        <mat-card-actions>
          <button
            mat-raised-button
            color="primary"
            class="u-full-width"
            (click)="submit()"
            [disabled]="form.invalid || loading"
          >
            <span *ngIf="!loading">Send Reset Link</span>
            <mat-progress-spinner
              *ngIf="loading"
              diameter="20"
              mode="indeterminate"
            ></mat-progress-spinner>
          </button>
        </mat-card-actions>
        <mat-card-footer>
          <a routerLink="/login">Back to Login</a>
        </mat-card-footer>
      </mat-card>
    </div>
  `
})
export class ForgotPasswordComponent {
    form: FormGroup;
    loading = false;

    constructor(
        fb: FormBuilder,
        private auth: AuthService,
        private snackBar: MatSnackBar
    ) {
        this.form = fb.group({
            username: ['', Validators.required]
        });
    }

    submit() {
        if (this.form.invalid) return;
        this.loading = true;
        this.auth.forgotPassword(this.form.value.username)
            .subscribe({
                next: () => {
                    this.snackBar.open('Reset link sent', 'Close', { duration: 5000 });
                    this.loading = false;
                },
                error: err => {
                    this.snackBar.open(err.error?.message || 'Request failed', 'Close', { duration: 5000 });
                    this.loading = false;
                }
            });
    }
}
