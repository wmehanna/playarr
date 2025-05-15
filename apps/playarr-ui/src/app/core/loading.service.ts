import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({ providedIn: 'root' })
export class NotificationService {
    constructor(private snackBar: MatSnackBar) {
        if ('Notification' in window) {
            Notification.requestPermission();
        }
    }

    notify(title: string, options?: NotificationOptions) {
        if ('Notification' in window && Notification.permission === 'granted') {
            new Notification(title, options);
        } else {
            this.snackBar.open(title, 'Close', { duration: 5000 });
        }
    }
}
