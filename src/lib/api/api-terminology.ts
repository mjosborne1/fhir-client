import type { ValueSet, ConceptMap, OperationOutcome,ValueSetComposeIncludeConceptDesignation } from "fhir/r4";
import type { Concept, ConceptSearchResult, ProcedureToBodySitesMap } from "$lib/types/concept-type";
export const SCT_URI = "http://snomed.info/sct";
export const FULLY_SPECIFIED_NAME_ID = "900000000000003001";
export const SEMANTIC_TAG_PATTERN = /\(([^)]+)\)$/;
import { json } from '@sveltejs/kit';

/*
buildSearchParams(searchBoxProps.apiEndpoint,		 				 
		                 searchBoxProps.apiECLQuery,
						 searchTerm,
						 10);
*/

  export function buildSearchParams(
    valueSetUrl: string,    
    searchTerm:string,
    limit: number
  ): URLSearchParams {
    const searchParams = new URLSearchParams();
    searchParams.set("url",valueSetUrl)   
    searchParams.set("filter", searchTerm);    
    // Only active concepts are included in the results.
    searchParams.set("activeOnly", "true");
    // Limit the number of results.
    searchParams.set("count", limit.toString(10));
    return searchParams;
  }
  


export async function extractError(response: Response): Promise<Error> {
    if (checkFhirJson(response)) {
      const parsedResponse = await response.json();
      if (isOperationOutcome(parsedResponse)) {
        return new Error(parsedResponse.issue[0].diagnostics);
      } else {
        console.warn(
          "Received FHIR JSON error response that was not an OperationOutcome"
        );
      }
    }
    return new Error(`${response.status} ${response.statusText}`);
  }



export function extractConceptsFromValueSet(
    valueSet: ValueSet
  ): ConceptSearchResult {
    if (!valueSet.expansion) {
      throw new Error("No expansion found in response");
    }
    const total = valueSet.expansion.total;
    if (total === 0) {
      return { concepts: [], total };
    }
    if (!valueSet.expansion.contains) {
      throw new Error("No expansion.contains found in response");
    }
    const concepts = valueSet.expansion.contains
      .map((concept): Partial<Concept> => {
        const fullySpecifiedName = concept.designation
            ?.filter(matchFullySpecifiedNameDesignation)
            ?.map((d) => d.value)
            .reduce<string | undefined>(
              (prev, curr, currentIndex) => (currentIndex === 0 ? curr : prev),
              undefined
            )         
        return {
          id: concept.code,
          display: concept.display
        };
      })
      .filter(isValidConcept);
    return { concepts, total };
  }


export async function parseJsonValueSet(response: Response): Promise<ValueSet> {
    if (checkFhirJson(response)) {
      return response.json();
    } else {
      console.log("parseJsonValueSet: Successful response was not FHIR JSON");
      throw new Error("Successful response was not FHIR JSON");
    }
  }


  function buildProcedureToBodySitesMap(conceptMap: ConceptMap): ProcedureToBodySitesMap {
    const procedureToBodySites: ProcedureToBodySitesMap = {};

    conceptMap.group?.forEach(group => {
        group.element.forEach(element => {
            const procedureCode = element.code;
            element.target?.forEach(target => {
                if (procedureCode && !procedureToBodySites[procedureCode]) {
                    procedureToBodySites[procedureCode] = new Set();
                }

                // If there are conditions (dependsOn), handle them appropriately
                if (target.dependsOn) {
                    target.dependsOn.forEach(dependency => {
                        // Here, you can add logic to handle different dependencies
                        // For now, we'll simply add the body site code
                        if (procedureCode) {                          
                           procedureToBodySites[procedureCode].add(dependency.value);
                        }
                    });
                } else {
                    // If no conditions, add the body site code directly
                    if (procedureCode && target.code) {   
                       procedureToBodySites[procedureCode].add(target.code);
                    }
                }
            });
        });
    });
    return procedureToBodySites;
}


export async function parseJsonConceptMap(response: Response): Promise<ConceptMap> {
  if (checkFhirJson(response)) {
    return response.json();
  } else {
    console.log("parseJsonConceptMap: Successful response was not FHIR JSON");
    throw new Error("Successful response was not FHIR JSON");
  }
}


export async function getConceptMap(conceptMapId:string) {
  let fhirEndpoint='https://r4.ontoserver.csiro.au/fhir';
  const response = await fetch(`${fhirEndpoint}/ConceptMap/${conceptMapId}`);
  if (!response.ok) {			
    throw await extractError(response);			
  }
  const conceptMap = await parseJsonConceptMap(response);
  const procMap = extractConceptsFromConceptMap(conceptMap);  
  return procMap;
}


export function  extractConceptsFromConceptMap(conceptMap: ConceptMap) {
  const procedureToBodySites = buildProcedureToBodySitesMap(conceptMap);  

  // Convert Sets to Arrays for easier consumption
  const procedureToBodySitesArray = Object.keys(procedureToBodySites).reduce((acc, procedureCode) => {
    acc[procedureCode] = Array.from(procedureToBodySites[procedureCode]);
    return acc;
  }, {} as { [procedureCode: string]: string[] });

}


function checkFhirJson(response: Response): boolean {
    const contentType = response.headers.get("content-type");
    return !!contentType && contentType.includes("application/fhir+json");
  }
  
  function matchFullySpecifiedNameDesignation(
    designation: ValueSetComposeIncludeConceptDesignation
  ): boolean {
    return (
      designation.use?.system === SCT_URI 
    );
  }
  
  function isOperationOutcome(
    response: Partial<OperationOutcome>
  ): response is OperationOutcome {
    return (
      response.resourceType === "OperationOutcome" &&
      Array.isArray(response.issue)
    );
  }
  
  function isValidConcept(concept: Partial<Concept>): concept is Concept {
    return concept.id !== undefined;
  }
