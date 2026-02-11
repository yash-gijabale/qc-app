import { Component } from "@angular/core";
import { NavigationEnd, Router, RouterOutlet } from "@angular/router";
import { HeaderComponent } from "./header.component";
import { FootComponent } from "../footer/footer.component";
import { filter } from "rxjs";
import { CreateNewComponent } from "../../components/create-new/create-new-component";
import { LayoutStoreService } from "../../store/layout-store.service";


@Component({
  selector: 'app-layout',
  template: `
    <!-- MAIN CONTAINER -->
   <div class="w-full flex justify-center">
<div class="h-dvh w-dvw mx-auto flex flex-col shadow-2xl relative">
       <!-- <app-header></app-header> -->
      <div class="h-[90%] overflow-y-auto content">
          <router-outlet></router-outlet>
        </div>
        <div class="h-[10%] z-50 bg-slate-100 w-full">
          <app-footer></app-footer>
        </div> 
        <app-create-new ></app-create-new>

  </div>
</div>

    `,
  imports: [RouterOutlet, FootComponent, CreateNewComponent],
  standalone: true
})
export class AppLayout {
  constructor(router: Router, layoutService:LayoutStoreService) {
    router.events
      .pipe(filter(e => e instanceof NavigationEnd))
      .subscribe(() => {
        document.querySelector('.content')?.scrollTo({
          top: 0,
          behavior: 'auto'
        });
        layoutService.resetCreateMenu();
      });
  }

}