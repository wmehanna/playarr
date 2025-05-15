import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../core/auth.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoadingService } from '../../core/loading.service';

@Component({
    selector: 'pa-login',
    template: `
    <div fxLayout="column" fxLayoutAlign="center center" class="auth__container">
      <mat-card class="auth__card">
        <mat-card-header>
          <mat-card-title>Login</mat-card-title>
        </mat-card-header>
        <mat-card-content [formGroup]="form">
          <mat-form-field appearance="outline" class="u-full-width">
            <mat-label>Username</mat-label>
            <input matInput formControlName="username" />
            <mat-error *ngIf="form.get('username').hasError('required')">
              Username is required
            </mat-error>
          </mat-form-field>
          <mat-form-field appearance="outline" class="u-full-width">
            <mat-label>Password</mat-label>
            <input matInput type="password" formControlName="password" />
            <mat-error *ngIf="form.get('password').hasError('required')">
              Password is required
            </mat-error>
          </mat-form-field>
          <mat-checkbox formControlName="rememberMe">Remember Me</mat-checkbox>
        </mat-card-content>
        <mat-card-actions>
          <button
            mat-raised-button
            color="primary"
            class="u-full-width"
            (click)="submit()"
            [disabled]="form.invalid || loading"
          >
            <span *ngIf="!loading">Login</span>
            <mat-progress-spinner
              *ngIf="loading"
              diameter="20"
              mode="indeterminate"
            ></mat-progress-spinner>
          </button>
        </mat-card-actions>
        <mat-card-footer>
          <a routerLink="/register">Register</a> |
          <a routerLink="/forgot-password">Forgot Password?</a>
        </mat-card-footer>
      </mat-card>
    </div>
  `
})
export class LoginComponent {
    form: FormGroup;
    loading = false;

    constructor(
        fb: FormBuilder,
        private auth: AuthService,
        private router: Router,
        private snackBar: MatSnackBar,
        private loadingService: LoadingService
    ) {
        this.form = fb.group({
            username: ['', Validators.required],
            password: ['', Validators.required],
            rememberMe: [true]
        });
    }

    submit() {
        if (this.form.invalid) return;
        this.loading = true;
        this.auth.login(
            this.form.value.username,
            this.form.value.password,
            this.form.value.rememberMe
        ).subscribe({
            next: () => this.router.navigateByUrl('/'),
            error: err => {
                this.snackBar.open(err.error?.message || 'Login failed', 'Close', { duration: 5000 });
                this.loading = false;
            }
        });
    }
}
