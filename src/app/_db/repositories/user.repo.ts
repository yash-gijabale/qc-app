import { Injectable } from "@angular/core";
import { IndexDB } from "../indexdb.service";
import { BaseRepository } from "./base.repo";

@Injectable({
    providedIn: 'root'
})
export class UserRepository extends BaseRepository<any> {

    constructor(private idb: IndexDB) {
        super(idb, 'users')
    }
}