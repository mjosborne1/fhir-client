import { error } from '@sveltejs/kit';
import type { ServiceType } from '../types/service-type'
import type { PatientHeading } from '../types/patient-heading'
import { isPatient, mapPatientToPatientHeading } from './api-patient';
import { categories, radiologyServices, pathologyServices } from './data';
import  Client from 'fhir-kit-client'
export const prerender = true;

const client = new Client(
    {  baseUrl: 'https://hl7auconnectathon.salessbx.smiledigitalhealth.com/fhir-request' }
)

export default {
  getPatientHeading: async (patientId:string) => {
    let response = await client.read({ resourceType: 'Patient', id: patientId });
    if (isPatient(response)) {
      let patHeading:PatientHeading = mapPatientToPatientHeading(response);
      return { patHeading };
    } else {
      throw error(404,{ message: "In function apt.ts: getPatientHeading()",
        details: "Unable to load patient from fhir server, is the server available?"});
    }
    
  },
  // Return Example code,display pairs for Categories, Pathology, Radiology
  getCategories: () => {    
    return  categories;
  },
  getRadiologyServices: () => {
    return radiologyServices;
  },
  getPathologyServices: () => {
    return pathologyServices;
  }

} 
