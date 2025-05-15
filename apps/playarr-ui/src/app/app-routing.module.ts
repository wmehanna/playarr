import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/auth.guard';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './pages/reset-password/reset-password.component';

const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'forgot-password', component: ForgotPasswordComponent },
    { path: 'reset-password', component: ResetPasswordComponent },

    {
        path: '',
        canActivate: [AuthGuard],
        children: [
            {
                path: 'search',
                loadChildren: () =>
                    import('./features/search/search.module').then((m) => m.SearchModule),
            },
            {
                path: 'activity',
                loadChildren: () =>
                    import('./features/activity/activity.module').then((m) => m.ActivityModule),
            },
            {
                path: 'indexers',
                loadChildren: () =>
                    import('./features/indexers/indexers.module').then((m) => m.IndexersModule),
            },
            {
                path: 'wanted',
                loadChildren: () =>
                    import('./features/wanted/wanted.module').then((m) => m.WantedModule),
            },
            {
                path: 'clients',
                loadChildren: () =>
                    import('./features/clients/clients.module').then((m) => m.ClientsModule),
            },
            {
                path: 'library',
                loadChildren: () =>
                    import('./features/library/library.module').then((m) => m.LibraryModule),
            },
            {
                path: 'settings',
                loadChildren: () =>
                    import('./features/settings/settings.module').then((m) => m.SettingsModule),
            },
            { path: '', redirectTo: 'search', pathMatch: 'full' },
        ],
    },
    { path: '**', redirectTo: '' },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
