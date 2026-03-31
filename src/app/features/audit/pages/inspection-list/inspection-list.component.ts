import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { PageHeaderCompoent } from "../../../../layout/components/page-header/page-header.component";
import { InputTextModule } from "primeng/inputtext";
import { ButtonModule } from "primeng/button";
import { IconFieldModule } from "primeng/iconfield";
import { InputIconModule } from "primeng/inputicon";
import { ChipModule } from "primeng/chip";
import { InspectionCardComponent } from "../../components/inspection-card/inspection-card.component";
import { Inspection } from "../../model";
import { debounceTime, distinctUntilChanged, Subject, takeUntil, tap } from "rxjs";
import { Popover, PopoverModule } from "primeng/popover";
import { OverlayBadgeModule } from "primeng/overlaybadge";

@Component({
    selector: 'app-inspection-list',
    templateUrl: './inspection-list.component.html',
    imports: [PageHeaderCompoent, InputTextModule, ButtonModule,
        IconFieldModule, InputIconModule, ChipModule,
        InspectionCardComponent, PopoverModule,
        OverlayBadgeModule],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class InspectionListComponent implements OnInit, OnDestroy {

    constructor(
        private cd: ChangeDetectorRef
    ) { }

    pageTitle: string = 'Inspection List'

    inspectionsSource: Inspection[] = [
        {
            title: 'Steel Pipe Type-A',
            id: 89788,
            icons: 'fa-solid fa-compass-drafting',
            dueDate: '2026-02-26',
            time: '2:00 PM',
            status: 'IN-PROCESS',
            iconConfig: {
                iconBg: 'bg-blue-200',
                iconColor: 'text-blue-600'
            }
        },
        {
            title: 'RCC Column Reinforcement Check',
            id: 89789,
            icons: 'fa-solid fa-building-columns',
            dueDate: '2026-02-27',
            time: '10:30 AM',
            status: 'UPCOMING',
            iconConfig: {
                iconBg: 'bg-yellow-200',
                iconColor: 'text-yellow-600'
            }

        },
        {
            title: 'Slab Shuttering Inspection',
            id: 89790,
            icons: 'fa-solid fa-layer-group',
            dueDate: '2026-02-28',
            time: '9:00 AM',
            status: 'COMPLETED',
            iconConfig: {
                iconBg: 'bg-green-200',
                iconColor: 'text-green-600'
            }
        },
        {
            title: 'Electrical Conduit Layout',
            id: 89791,
            icons: 'fa-solid fa-bolt',
            dueDate: '2026-03-01',
            time: '11:15 AM',
            status: 'IN-PROCESS',
            iconConfig: {
                iconBg: 'bg-red-200',
                iconColor: 'text-red-600'
            }
        },
        {
            title: 'Plumbing Pressure Test',
            id: 89792,
            icons: 'fa-solid fa-faucet-drip',
            dueDate: '2026-03-02',
            time: '3:30 PM',
            status: 'UPCOMING',
            iconConfig: {
                iconBg: 'bg-violet-200',
                iconColor: 'text-violet-600'
            }
        },
        {
            title: 'Fire Safety Equipment Check',
            id: 89793,
            icons: 'fa-solid fa-fire-extinguisher',
            dueDate: '2026-03-03',
            time: '1:00 PM',
            status: 'CANCELLED',
            iconConfig: {
                iconBg: 'bg-orange-200',
                iconColor: 'text-orange-600'
            }
        },
        {
            title: 'Finishing – Tile Alignment',
            id: 89794,
            icons: 'fa-solid fa-border-all',
            dueDate: '2026-03-04',
            time: '12:00 PM',
            status: 'COMPLETED',
            iconConfig: {
                iconBg: 'bg-violet-200',
                iconColor: 'text-violet-600'
            }
        },
        {
            title: 'Waterproofing Membrane Inspection',
            id: 89795,
            icons: 'fa-solid fa-droplet',
            dueDate: '2026-03-05',
            time: '4:45 PM',
            status: 'IN-PROCESS',
            iconConfig: {
                iconBg: 'bg-blue-200',
                iconColor: 'text-blue-600'
            }
        }
    ];

    BADGE_LIST = ['ALL', 'IN-PROCESS', 'UPCOMING', 'COMPLETED', 'CANCELLED']

    filterState = {
        activeTab: 'ALL',
        search: ''
    }

    inspections: Inspection[]
    seachInspection$ = new Subject<string>();
    destroy$ = new Subject<void>();

    ngOnInit(): void {
        this.inspections = this.inspectionsSource;
        this.searchInspectionLister()
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }


    searchInspection(e: Event) {
        let search = (e.target as HTMLInputElement).value
        this.seachInspection$.next(search)
    }

    searchInspectionLister() {
        this.seachInspection$.pipe(
            // debounceTime(100),
            distinctUntilChanged(),
            takeUntil(this.destroy$),
        ).subscribe(search => {
            this.filterState.search = search
            this.filterInspection();
        })
    }

    private filterInspection(): void {
        // console.log(search)
        let tempInspection = [...this.inspectionsSource];

        //APPLY TABS
        if (this.filterState.activeTab !== 'ALL') {
            tempInspection = tempInspection.filter(inspection => inspection.status == this.filterState.activeTab)
        }

        //APPLY SEARCH
        let { search } = this.filterState
        if (search) {
            tempInspection = tempInspection.filter(inspection => inspection.title.toLowerCase().includes(search.toLowerCase()) || inspection.id.toString().includes(search))
        } else {
            tempInspection = [...tempInspection]
        }

        this.inspections = [...tempInspection]

        this.cd.markForCheck();

    }

    setActiveTab(badge) {
        this.filterState.activeTab = badge
        this.filterInspection();
    }








    // 
    @ViewChild('op') op!: Popover;

    selectedMember = null;

    members = [
        { name: 'Amy Elsner', image: 'amyelsner.png', email: 'amy@email.com', role: 'Owner' },
        { name: 'Bernardo Dominic', image: 'bernardodominic.png', email: 'bernardo@email.com', role: 'Editor' },
        { name: 'Ioni Bowcher', image: 'ionibowcher.png', email: 'ioni@email.com', role: 'Viewer' },
    ];

    toggle(event) {
        this.op.toggle(event);
    }

    selectedMembers: Array<string> = []
    selectMember(member) {
        if (this.selectedMember != null && member.email == this.selectedMember.email) {
            this.selectedMember = null
            return
        }
        this.selectedMember = member;
        // this.op.hide();
    }

}