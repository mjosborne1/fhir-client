import api  from '$lib/api/api.js';
import type { Actions } from './$types';

export const prerender = false;


export function load({ params }) {	  
  let patid:string = '18838';
  let docid:string = 'bobrester-bob';
  let orgid:string = '16057';
  let conceptMapId:string = 'c959bf2f-64bb-4d1d-91d3-710a251790b3';   // R4.ontoserver Id of ConceptMap
  return {    
    patient: api.getPatientHeading(patid),
    practitioner: api.getPractitionerHeading(docid),
    organization: api.getOrganizationHeading(orgid),
    categories: api.getCategories(),
    procedures: api.getRadiologyProcedureMap(conceptMapId)    
  };
}

export const actions: Actions = {
  default: async ({ request }) => {

    // Get form data
    const formData = await request.formData();

  //  api.postServiceRequest(formData:FormData);
    // Submit data to API
    console.log(formData);
    return {
      status: "success" 
    };
  }
};

