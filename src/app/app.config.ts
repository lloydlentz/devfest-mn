import { ApplicationConfig } from '@angular/core';
import { importProvidersFrom } from '@angular/core';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { UrlSegment, provideRouter } from '@angular/router';
import AuthenticatedRoutes from './authenticated/authenticated.routes';
import { DataService } from './shared/data.service';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AuthService } from './realtime-data/auth.service';
import { FirebaseService } from './realtime-data/firebase.service';
import { environment } from '../environments/environment';

export const appConfig: ApplicationConfig = {
    providers: [
        importProvidersFrom(BrowserModule, MatSnackBarModule),
        DataService,
        importProvidersFrom(
            AngularFireModule.initializeApp(environment.firebaseConfig),
            AngularFireAuthModule,
            AngularFireDatabaseModule,
            AngularFirestoreModule
        ),
        AuthService,
        FirebaseService,
        provideAnimations(),
        provideRouter([
            {
                path: '',
                pathMatch: 'full',
                loadComponent: () => import('./home/home.component'),
            },
            {
                matcher: isMarketingContent,
                loadChildren: () => import('./content/content.routes'),
            },
            {
                path: '',
                //loadChildren: () => import('./authenticated/authenticated.routes'),
                children: AuthenticatedRoutes,
            },
        ]),
        provideClientHydration(),
    ],
};

export function isMarketingContent(url: UrlSegment[]) {
    let result =
        url.length === 1 && url[0].path.match(/(tickets|sponsors|past|speaker-cfp|conduct)/)
            ? { consumed: [] }
            : null;
    return result;
}
