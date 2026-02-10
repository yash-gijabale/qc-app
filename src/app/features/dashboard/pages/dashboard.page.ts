import { Component, OnInit } from "@angular/core";
import { RouterLink } from "@angular/router";

@Component({
    selector:'app-dashboard',
    templateUrl:'dashboard.page.html',
    standalone:true,
    imports: [RouterLink]
})
export class Dashbaord implements OnInit{

    ngOnInit(): void {}

}