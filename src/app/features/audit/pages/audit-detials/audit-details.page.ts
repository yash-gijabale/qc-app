import { Location } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

@Component({
    selector:'app-audit-details',
    templateUrl:'./audit-details.page.html'
})
export class AuditDetailsComponent implements OnInit{
    constructor(
        private route: ActivatedRoute,
        private location:Location
    ){}

    auditCode:string

    ngOnInit(): void {
        this.auditCode = this.route.snapshot.params['code']
    }

    back(){
        this.location.back()
    }
}