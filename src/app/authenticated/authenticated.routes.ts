import { Routes } from '@angular/router';
import HomeComponent from '../home/home.component';
import AdminRoutes from '../admin/admin.routes';

export const AuthenticatedRoutes: Routes = [
    { path: 'test', component: HomeComponent },
    {
        path: 'admin',
        //loadChildren: () => import('../admin/admin.routes'),
        children: AdminRoutes,
        data: { title: 'Admin' },
    },
    /*{
        path: 'cfp',
        loadComponent: () => import('../cfp/cfp.component'),
        data: { title: 'Call For Papers' },
    },
    { path: '', loadChildren: () => import('../main/main.routes') },*/
];

export default AuthenticatedRoutes;