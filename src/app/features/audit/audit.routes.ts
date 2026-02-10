import { Routes } from "@angular/router";

export const auditRoutes:Routes = [
    {
        path:'view/:code',
        loadComponent: ()=> import('./audit-detials/audit-details.page')
        .then(m => m.AuditDetailsComponent)
    }
]