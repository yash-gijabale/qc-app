import { Component, inject } from "@angular/core";
import { RouterLink } from "@angular/router";
import { LayoutStoreService } from "../../store/layout-store.service";

@Component({
    selector: 'app-footer',
    templateUrl: 'footer.component.html',
    standalone: true,
    imports: [RouterLink]
})
export class FootComponent {

    layoutStore = inject(LayoutStoreService);

    toggleMenu() {
        this.layoutStore.toggleCreateMenu()
    }


}