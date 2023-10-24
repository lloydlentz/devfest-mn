import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { enableProdMode, importProvidersFrom } from '@angular/core';
import { environment } from './environments/environment';
import { isMarketingContent } from './app/app.module';
import { AppComponent } from './app/app.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { provideRouter, UrlSegment } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';

let result = (url) =>
    url.length === 1 && url[0].path.match(/(tickets|sponsors|past|speaker-cfp|conduct)/)
        ? { consumed: [] }
        : null;

if (environment.production) {
    enableProdMode();
}

bootstrapApplication(AppComponent, {
    providers: [
        importProvidersFrom(BrowserModule, MatSnackBarModule),
        provideAnimations(),
        provideRouter([
            {
                path: '',
                pathMatch: 'full',
                loadChildren: () => import('./app/home/home.module').then((m) => m.HomeModule),
            },
            {
                matcher: isMarketingContent,
                loadChildren: () => import('./app/content/content.routes'),
            },
            {
                path: '',
                loadChildren: () =>
                    import('./app/authenticated/authenticated.module').then(
                        (m) => m.AuthenticatedModule
                    ),
            },
        ]),
    ],
});
