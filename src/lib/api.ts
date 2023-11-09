import { error } from '@sveltejs/kit';
import { isPatient, mapPatientToPatientHeading } from './api-patient';
import type { PatientHeading } from './patient-heading'
import type { ServiceType } from './service-type'
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
    } 
  },
  getServiceTypes: () => {
    const serviceTypes : ServiceType[] =
    [
      {
      code: "310074003", display: "Pathology" 
      },
      {
        code: "310125001", display: "Radiology"
      },
      {
        code: "1231393002", display: "Spirometry"
      }
    ];
    return  serviceTypes;
  } 
} 
