import { Routes } from "@angular/router";


export const reportRoutes:Routes = [
    {
        path:'',
        loadComponent: ()=>  import('./pages/non-confirmity-report/non-confirmity-report.component')
        .then(m => m.NonConfirmityReportComponent)
    }
]