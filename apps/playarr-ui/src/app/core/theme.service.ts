import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ThemeService {
    toggleDark(): void {
        document.body.classList.toggle('dark-theme');
    }
}
