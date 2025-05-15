import { Component } from '@angular/core';
import { LoadingService } from './core/loading.service';
import { ThemeService } from './core/theme.service';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent {
    loading$: Observable<boolean>;

    constructor(
        private loading: LoadingService,
        private theme: ThemeService
    ) {
        this.loading$ = this.loading.loading$;
    }
}
