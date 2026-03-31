import {Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root',

})
export class IndexDB {

    private db!: IDBDatabase;

    constructor() { }

    init(): Promise<IDBDatabase> {
        return new Promise((resolve, reject) => {
            const request = indexedDB.open('QC', 1);

            request.onupgradeneeded = (event: IDBVersionChangeEvent) => {
                const db = (event.target as IDBOpenDBRequest).result;

                if (!db.objectStoreNames.contains("users")) {
                    db.createObjectStore("users", { keyPath: "id" });
                }
            };

            request.onsuccess = (event: Event) => {
                this.db = (event.target as IDBOpenDBRequest).result;
                console.log("Database ready!");
                resolve(this.db);
            };

            request.onerror = (event) => {
                console.error("DB Error:", request.error);
                reject(request.error);
            };

            request.onblocked = () => {
                console.warn("DB upgrade blocked");
            };
        });
    }

    getDB(): IDBDatabase {
        if (!this.db) {
            throw new Error("DB not initialized. Call init() first.");
        }
        return this.db;
    }

    getStore(storeName: string, mode: IDBTransactionMode = 'readonly'): IDBObjectStore {
        if (!this.db) {
            throw new Error("DB not initialized. Call init() first.");
        }
        const transaction = this.db.transaction(storeName, mode);
        return transaction.objectStore(storeName);
    }

}