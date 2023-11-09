import { error } from '@sveltejs/kit';
import api  from '$lib/api.js';
export const prerender = true;


export function load({ params }) {	  
  let id:string = '16054';
  return {
    patient: api.getPatientHeading(id),
    categories: api.getServiceTypes()
  };
}

