import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { Resource } from "../models/resource";
import { Serializer } from "../serializers/serializer";
import { QueryOptions } from "../models/query-options";
import { ResourceServiceInterface } from "./resource.service.interface";

export class ResourceService<T extends Resource> implements ResourceServiceInterface<T>{
    constructor(
        private httpClient: HttpClient,
        private url: string,
        private endpoint: string,
        private serializer: Serializer) {}
    
      public create(item: T): Observable<T> {
        return this.httpClient
          .post<T>(`${this.url}/${this.endpoint}`, this.serializer.toJson(item))
          .map(data => this.serializer.fromJson(data) as T,
                err => err
          );
      }
    
      public update(item: T): Observable<T> {
        return this.httpClient
          .put<T>(`${this.url}/${this.endpoint}/${item.id}`,
            this.serializer.toJson(item))
          .map(data => this.serializer.fromJson(data) as T);
      }
    
      public read(id: any): Observable<T> {
        return this.httpClient
          .get(`${this.url}/${this.endpoint}/${id}`)
          .map((data: any) =>{
              return this.serializer.fromJson(data) as T
            });
      }
    
      list(queryOptions: QueryOptions): Observable<T[]> {
          console.log("URL"+`${this.url}/${this.endpoint}/${queryOptions.toQueryString()}`)
        return this.httpClient
          .get(`${this.url}/${this.endpoint}/${queryOptions.toQueryString()}`)
          .map((data: any) => {
              console.log(data)
              return this.convertData(data)
            });
      }
    
      delete(id: any) {
        return this.httpClient
          .delete(`${this.url}/${this.endpoint}/${id}`);
      }
    
      private convertData(data: any): T[] {
        return data.map(item => this.serializer.fromJson(item));
      }
    }