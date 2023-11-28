export interface ServiceType {
    code: string;
    display:string;
}


export interface SearchResult {
    service: ServiceType[];
    total?: number;
  }
  