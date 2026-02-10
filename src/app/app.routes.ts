import { Routes } from '@angular/router';
import { dashboardRoutes } from './features/dashboard/dashboard.routes';
import { reportRoutes } from './features/report/reports.routes';
import { auditRoutes } from './features/audit/audit.routes';

export const routes: Routes = [
    {
        path:'dashboard',
        children:dashboardRoutes
    },

    {
        path:'reports',
        children:reportRoutes
    },

     {
        path:'audit',
        children:auditRoutes
    }
];

