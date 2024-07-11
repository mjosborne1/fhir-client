
export interface Concept {
    id: string;
    display?: string;
    semanticTag?: string;
    text?: string;
  }
  
  export interface ConceptSearchResult {
    concepts: Concept[];
    total?: number;
  }


export type ProcedureToBodySitesMap = {
  [procedureCode: string]: Set<string>;
};

