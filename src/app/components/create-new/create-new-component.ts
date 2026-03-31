import { Component, inject } from "@angular/core";
import { LayoutStoreService } from "../../store/layout-store.service";
import { RouterLink } from "@angular/router";

@Component({
    selector:'app-create-new',
    templateUrl:'./create-new-component.html',
    standalone:true,
    imports:[
        RouterLink,
    ]
})
export class CreateNewComponent{

    layoutService = inject(LayoutStoreService);

    state = this.layoutService.getCreateMenuState()

    toggleCreateMenu(){
        this.layoutService.toggleCreateMenu();
    }

}
