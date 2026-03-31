import { Component, Input } from "@angular/core";
import { ButtonModule } from "primeng/button";
import { Inspection, InspectionStatus } from "../../model";
import { RouterLink } from "@angular/router";
import { Menu, MenuModule } from "primeng/menu";
import { MenuItem } from "primeng/api";

@Component({
    selector: 'app-inspection-card',
    templateUrl: 'inspection-card.component.html',
    imports: [ButtonModule, RouterLink, MenuModule, Menu]
})
export class InspectionCardComponent {

    @Input() inspection: Inspection

    items: MenuItem[] = [
        {
            label: 'Refresh',
            icon: 'fa-solid fa-arrow-rotate-left'
        },
        {
            label: 'Move To Bin',
            icon: 'fa-solid fa-trash'
        }
    ];

    getStatusStyles(status: InspectionStatus) {
        switch (status) {
            case 'IN-PROCESS':
                return {
                    badge: 'bg-blue-200 text-blue-500 border-blue-400',
                    iconBg: 'bg-blue-100',
                    iconColor: 'text-blue-600'
                };

            case 'UPCOMING':
                return {
                    badge: 'bg-violet-200 text-violet-600',
                    iconBg: 'bg-amber-100',
                    iconColor: 'text-amber-600'
                };

            case 'COMPLETED':
                return {
                    badge: 'bg-green-200 text-green-600',
                    iconBg: 'bg-green-100',
                    iconColor: 'text-green-600'
                };

            case 'CANCELLED':
                return {
                    badge: 'bg-red-200 text-red-600',
                    iconBg: 'bg-red-100',
                    iconColor: 'text-red-600'
                };
        }
    }
}