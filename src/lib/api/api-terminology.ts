import type { ValueSet, OperationOutcome,ValueSetComposeIncludeConceptDesignation } from "fhir/r4";
import type { Concept, ConceptSearchResult } from "$lib/types/concept-type";
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
      console.log("Successful response was not FHIR JSON");
      throw new Error("Successful response was not FHIR JSON");
    }
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