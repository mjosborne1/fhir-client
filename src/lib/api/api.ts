import { error } from '@sveltejs/kit';
import  Client from 'fhir-kit-client'
import type { PatientHeading } from '../types/patient-heading'
import type { PractitionerHeading } from '../types/practitioner-heading'
import type { FormInput } from '$lib/types/form-input';
import { createRequestBundle } from '$lib/api/api-request-bundle';
import { categories, exampleBundle } from './data';
import { isPatient, mapPatientToPatientHeading } from '$lib/api/api-patient';
import { isPractitioner, mapPractitionerToPractitionerHeading } from '$lib/api/api-practitioner';
import { isOrganization, mapOrganizationToOrganizationHeading } from '$lib/api/api-organization';
import type { OrganizationHeading } from '$lib/types/organization-heading';
export const prerender = true;

const client = new Client(
    {  baseUrl: 'https://hl7auconnectathon.salessbx.smiledigitalhealth.com/fhir-request' }
)

export default {
  getPatientHeading: async (patientId:string) => {
    let response = await client.read({ resourceType: 'Patient', id: patientId });
    if (isPatient(response)) {
      let heading:PatientHeading = mapPatientToPatientHeading(response);
      return { heading };
    } else {
      throw error(404,{ message: "In function apt.ts: getPatientHeading()",
        details: "Unable to load patient from fhir server, is the server available?"});
    }
    
  },
  getPractitionerHeading: async (practitionerId:string) => {
    let response = await client.read({ resourceType: 'Practitioner', id: practitionerId });
    if (isPractitioner(response)) {
      let heading:PractitionerHeading = mapPractitionerToPractitionerHeading(response);
      return { heading };
    } else {
      throw error(404,{ message: "In function api.ts: getPractitionerHeading()",
        details: "Unable to load Practitioner from fhir server, is the server available?"});
    }    
  },
  getOrganizationHeading: async (organizationId:string) => {
    let response = await client.read({ resourceType: 'Organization', id: organizationId });
    if (isOrganization(response)) {
      let heading:OrganizationHeading = mapOrganizationToOrganizationHeading(response);
      return { heading };
    } else {
      throw error(404,{ message: "In function api.ts: getOrganizationHeading()",
        details: "Unable to load Organization from fhir server, is the server available?"});
    }    
  },
  // Return Example code,display pairs for Categories, Pathology, Radiology
  getCategories: () => {    
    return  categories;
  }, 
  postServiceRequest: async (formData:FormInput) => {
    let requestBundle = createRequestBundle(formData);
    const bundle = exampleBundle;
    let response = await client.create({
      //body: requestBundle,
      resourceType: 'Bundle',
      body: bundle      
    });
    console.log(response);
  }

} 
