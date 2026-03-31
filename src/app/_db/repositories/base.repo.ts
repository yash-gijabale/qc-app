import { from, Observable } from "rxjs";
import { IndexDB } from "../indexdb.service";

export class BaseRepository<T> {
    constructor(
        private db: IndexDB,
        private tableName: string
    ) { }

    findById(id: number): Observable<T | undefined> {
        const store = this.db.getStore(this.tableName);
        const request: IDBRequest<T> = store.get(id);
        return this.toObservable(request);
    }

    private toObservable<T>(request: IDBRequest<T>): Observable<T> {
        return from(new Promise<T>((resolve, reject) => {
            request.onsuccess = () => resolve(request.result)
            request.onerror = () => reject(request.error)
        }))
    }
}