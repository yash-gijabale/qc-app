import { Component } from "@angular/core";
import { NavigationEnd, Router, RouterOutlet } from "@angular/router";
import { HeaderComponent } from "./header.component";
import { FootComponent } from "../footer/footer.component";
import { filter } from "rxjs";


@Component({
    selector: 'app-layout',
    template: `
    <!-- MAIN CONTAINER -->
   <div class="w-full flex justify-center">
<div class="h-dvh w-dvw mx-auto flex flex-col shadow-2xl">
       <!-- <app-header></app-header> -->
        <div class="h-[90%] overflow-y-auto content">
            <router-outlet></router-outlet>
        </div>
        <div class="h-[10%] bg-slate-100 ">
            <app-footer></app-footer>
        </div>

  </div>
</div>

    `,
    imports: [RouterOutlet, FootComponent],
    standalone: true
})
export class AppLayout {
    constructor(router: Router) {
    router.events
      .pipe(filter(e => e instanceof NavigationEnd))
      .subscribe(() => {
        document.querySelector('.content')?.scrollTo({
          top: 0,
          behavior: 'auto'
        });
      });
  }

}