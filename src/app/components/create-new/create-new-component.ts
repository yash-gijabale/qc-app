import { Component, inject } from "@angular/core";
import { LayoutStoreService } from "../../store/layout-store.service";

@Component({
    selector:'app-create-new',
    templateUrl:'./create-new-component.html',
    standalone:true
})
export class CreateNewComponent{

    layoutService = inject(LayoutStoreService);

    state = this.layoutService.getCreateMenuState()

    toggleCreateMenu(){
        this.layoutService.toggleCreateMenu();
    }

}
