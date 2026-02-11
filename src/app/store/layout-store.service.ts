import { Injectable, signal } from "@angular/core";

@Injectable({
    providedIn:'root'
})
export class LayoutStoreService{


    private createMenu = signal(false);

    toggleCreateMenu(){
        this.createMenu.update(pre => !pre);
    }

    getCreateMenuState(){
        return this.createMenu;
    }

    resetCreateMenu(){
        this.createMenu.set(false);
    }

}