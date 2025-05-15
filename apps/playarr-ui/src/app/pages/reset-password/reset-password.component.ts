import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../core/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
    selector: 'pa-reset-password',
    template: `
    <div fxLayout="column" fxLayoutAlign="center center" class="auth__container">
      <mat-card class="auth__card">
        <mat-card-header>
          <mat-card-title>Reset Password</mat-card-title>
        </mat-card-header>
        <mat-card-content [formGroup]="form">
          <mat-form-field appearance="outline" class="u-full-width">
            <mat-label>New Password</mat-label>
            <input matInput type="password" formControlName="newPassword" />
            <mat-error *ngIf="form.get('newPassword').hasError('required')">
              Password is required
            </mat-error>
            <mat-error *ngIf="form.get('newPassword').hasError('minlength')">
              Minimum 8 characters
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
            <span *ngIf="!loading">Reset Password</span>
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
export class ResetPasswordComponent implements OnInit {
    form: FormGroup;
    loading = false;
    token!: string;

    constructor(
        fb: FormBuilder,
        private auth: AuthService,
        private route: ActivatedRoute,
        private snackBar: MatSnackBar,
        private router: Router
    ) {
        this.form = fb.group({
            newPassword: ['', [Validators.required, Validators.minLength(8)]]
        });
    }

    ngOnInit() {
        this.token = this.route.snapshot.queryParamMap.get('token') || '';
    }

    submit() {
        if (!this.token || this.form.invalid) return;
        this.loading = true;
        this.auth.resetPassword(this.token, this.form.value.newPassword)
            .subscribe({
                next: () => {
                    this.snackBar.open('Password reset successful', 'Close', { duration: 5000 });
                    this.router.navigateByUrl('/login');
                },
                error: err => {
                    this.snackBar.open(err.error?.message || 'Reset failed', 'Close', { duration: 5000 });
                    this.loading = false;
                }
            });
    }
}
