export interface QueryBuilder {
    toQueryMap: () => Map<string, string>;
    toQueryString: () => string;
  }
      
  export class QueryOptions implements QueryBuilder {
    public pageNumber: number;
    public pageSize: number;
    public queryMap: Map<string,string>;
  
    constructor(queryMap?: Map<string,string>) {
      this.pageNumber = 1;
      this.pageSize = 10000;
      this.queryMap = queryMap;
    }
  
    toQueryMap() {

      if(this.queryMap==undefined){
        this.queryMap = new Map<string,string>()
      }
      return this.queryMap;
    }
  
    toQueryString() {
      let queryString = '';
      this.toQueryMap().forEach((value: string, key: string) => {
        queryString = queryString.concat(`${key}/${value}/`);
      });
  
      return queryString.substring(0, queryString.length - 1);
    }
  }