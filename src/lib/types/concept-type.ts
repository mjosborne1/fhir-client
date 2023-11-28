
export interface Concept {
    id: string;
    display?: string;
    semanticTag?: string;
  }
  
  export interface ConceptSearchResult {
    concepts: Concept[];
    total?: number;
  }
