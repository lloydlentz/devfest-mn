import { Routes, UrlSegment } from '@angular/router';
import { YearSwitcherComponent } from './year-switcher.component';

export const AuthenticatedRoutes: Routes = [
    // Trying to nest this module so it works similarly if you have a year or not.
    {
        matcher: isYear,
        component: YearSwitcherComponent,
        loadChildren: () => import('./authenticated.routes'),
    },
    {
        path: 'admin',
        loadChildren: () => import('../admin/admin.routes'),
        data: { title: 'Admin' },
    },
    {
        path: 'cfp',
        loadComponent: () => import('../cfp/cfp.component'),
        data: { title: 'Call For Papers' },
    },
    { path: '', loadChildren: () => import('../main/main.routes') },
];

export function isYear(url: UrlSegment[]) {
    return url.length >= 1 && url[0].path.match(/\d{4}/) ? { consumed: [url[0]] } : null;
}

export default AuthenticatedRoutes;
