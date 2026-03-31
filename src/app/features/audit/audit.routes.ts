import { Routes } from "@angular/router";

export const auditRoutes:Routes = [
    {
        path:'view/:code',
        loadComponent: ()=> import('./pages/audit-detials/audit-details.page')
        .then(m => m.AuditDetailsComponent)
    },

    {
        path:'new',
        loadComponent: ()=> import('./pages/new-audit/new-audit.page')
        .then(m => m.newAuditComponent)
    },

     {
        path:'list',
        loadComponent: ()=> import('./pages/inspection-list/inspection-list.component')
        .then(m => m.InspectionListComponent)
    },
]