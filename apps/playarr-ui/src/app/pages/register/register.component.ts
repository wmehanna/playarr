import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../core/auth.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
    selector: 'pa-register',
    template: `
    <div fxLayout="column" fxLayoutAlign="center center" class="auth__container">
      <mat-card class="auth__card">
        <mat-card-header>
          <mat-card-title>Register</mat-card-title>
        </mat-card-header>
        <mat-card-content [formGroup]="form">
          <mat-form-field appearance="outline" class="u-full-width">
            <mat-label>Username</mat-label>
            <input matInput formControlName="username" />
            <mat-error *ngIf="form.get('username').hasError('required')">
              Username is required
            </mat-error>
            <mat-error *ngIf="form.get('username').hasError('minlength')">
              Minimum 4 characters
            </mat-error>
          </mat-form-field>
          <mat-form-field appearance="outline" class="u-full-width">
            <mat-label>Password</mat-label>
            <input matInput type="password" formControlName="password" />
            <mat-error *ngIf="form.get('password').hasError('required')">
              Password is required
            </mat-error>
            <mat-error *ngIf="form.get('password').hasError('minlength')">
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
            <span *ngIf="!loading">Register</span>
            <mat-progress-spinner
              *ngIf="loading"
              diameter="20"
              mode="indeterminate"
            ></mat-progress-spinner>
          </button>
        </mat-card-actions>
        <mat-card-footer>
          <a routerLink="/login">Already have an account? Login</a>
        </mat-card-footer>
      </mat-card>
    </div>
  `
})
export class RegisterComponent {
    form: FormGroup;
    loading = false;

    constructor(
        fb: FormBuilder,
        private auth: AuthService,
        private router: Router,
        private snackBar: MatSnackBar
    ) {
        this.form = fb.group({
            username: ['', [Validators.required, Validators.minLength(4)]],
            password: ['', [Validators.required, Validators.minLength(8)]]
        });
    }

    submit() {
        if (this.form.invalid) return;
        this.loading = true;
        this.auth.register(this.form.value.username, this.form.value.password, this.form.value.rememberMe)
            .subscribe({
                next: () => this.router.navigateByUrl('/'),
                error: err => {
                    this.snackBar.open(err.error?.message || 'Registration failed', 'Close', { duration: 5000 });
                    this.loading = false;
                }
            });
    }
}
