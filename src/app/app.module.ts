import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, UrlSegment } from '@angular/router';
import { AppComponent } from './app.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ADirective } from './a.directive';

@NgModule({
    declarations: [AppComponent],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        RouterModule.forRoot(
            [
                {
                    path: '',
                    pathMatch: 'full',
                    loadChildren: () => import('./home/home.module').then((m) => m.HomeModule),
                },
                {
                    matcher: isMarketingContent,
                    loadChildren: () =>
                        import('./content/content.module').then((m) => m.ContentModule),
                },
                {
                    path: '',
                    loadChildren: () =>
                        import('./authenticated/authenticated.module').then(
                            (m) => m.AuthenticatedModule
                        ),
                },
            ],
            {}
        ),
        MatSnackBarModule,
        ADirective,
    ],
    bootstrap: [AppComponent],
    providers: [],
})
export class AppModule {
    constructor() {}
}

export function isMarketingContent(url: UrlSegment[]) {
    let result =
        url.length === 1 && url[0].path.match(/(tickets|sponsors|past|speaker-cfp|conduct)/)
            ? { consumed: [] }
            : null;
    return result;
}
