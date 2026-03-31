import { Component, Input } from "@angular/core";
import { RouterLink } from "@angular/router";

@Component({
    selector: 'app-page-header',
    templateUrl: './page-header.component.html',
    imports: [RouterLink],
    standalone:true
})
export class PageHeaderCompoent {

    @Input() redirectUrl: string
    @Input() pageTitle:string

}