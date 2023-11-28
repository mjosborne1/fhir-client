import api  from '$lib/api/api.js';
export const prerender = true;


export function load({ params }) {	  
  let id:string = '18838';
  return {    
    patient: api.getPatientHeading(id),
    categories: api.getCategories(),
    radiology: api.getRadiologyServices(),
    pathology: api.getPathologyServices()
    
  };
}

