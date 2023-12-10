import api  from '$lib/api/api.js';
import type { Actions } from './$types';

export const prerender = false;


export function load({ params }) {	  
  let id:string = '18838';
  let docid:string = 'bobrester-bob';
  let orgid:string = '16057';
  return {    
    patient: api.getPatientHeading(id),
    practitioner: api.getPractitionerHeading(docid),
    organization: api.getOrganizationHeading(orgid),
    categories: api.getCategories()    
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

