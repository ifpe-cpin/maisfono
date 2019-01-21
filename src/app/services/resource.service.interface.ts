import { Resource } from "../models/resource";
import { Observable } from "rxjs";
import { QueryOptions } from "../models/query-options";

export interface ResourceServiceInterface<T extends Resource>{

    create(item: T): Observable<T>
    update(item: T): Observable<T>
    read(id: any): Observable<T>
    list(queryOptions: QueryOptions): Observable<T[]>
    delete(id: any)
}