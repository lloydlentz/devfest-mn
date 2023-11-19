import { enableProdMode, importProvidersFrom } from '@angular/core';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { UrlSegment, provideRouter } from '@angular/router';
import { AppComponent } from './app/app.component';
import { environment } from './environments/environment';

if (environment.production) {
    enableProdMode();
} else {
    console.log('In DEV mode');
}

bootstrapApplication(AppComponent, {
    providers: [
        importProvidersFrom(BrowserModule, MatSnackBarModule),
        provideAnimations(),
        provideRouter([
            {
                path: '',
                pathMatch: 'full',
                loadComponent: () => import('./app/home/home.component'),
            },
            {
                matcher: isMarketingContent,
                loadChildren: () => import('./app/content/content.routes'),
            },
            {
                path: '',
                loadChildren: () => import('./app/authenticated/authenticated.routes'),
            },
        ]),
    ],
});

export function isMarketingContent(url: UrlSegment[]) {
    let result =
        url.length === 1 && url[0].path.match(/(tickets|sponsors|past|speaker-cfp|conduct)/)
            ? { consumed: [] }
            : null;
    return result;
}
