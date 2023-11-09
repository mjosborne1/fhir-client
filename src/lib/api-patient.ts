import type { Patient, ValueSet } from 'fhir/r4';
import type { PatientHeading } from './patient-heading'


function getUsualName(patient:Patient) {
    if (!patient || !patient.name) {
      return null;
    }
  
    const name = patient.name.find(name => {
      return name.use === 'usual' || name.use === 'official'; 
    });
  
    if (name && name.given && name.family) {
      return `${name.given.join(' ')} ${name.family}`; 
    }
  
    return null;
  }
  
  function getIHI(patient:Patient) {
    if (!patient || !patient.identifier) {
      return null; 
    }
  
    const identifier = patient.identifier.find(id => {
      return id.type && id.type.coding && id.type.text === "IHI" && 
        id.type.coding.some(c => c.code === 'NI');
    });
  
    return identifier ? identifier.value : null;
  }
  
  function getDOB(patient:Patient) {
    if (!patient || !patient.birthDate) {
      return null;
    }
  
    const dob = new Date(patient.birthDate);
    
    const day = dob.getDate().toString().padStart(2, '0');
    const month = (dob.getMonth() + 1).toString().padStart(2, '0'); 
    const year = dob.getFullYear();
  
    return `${day}/${month}/${year}`;
  }
  
  function getPatientAddress(patient:Patient) {
    if (!patient || !patient.address) {
      return null;
    }
  
    const address = patient.address[0]; // Get first address
  
    // Build address string
    let patientAddress = '';
    if (address.line) {
      patientAddress += address.line.join(' ');
    }
    if (address.city) {
      if (patientAddress) patientAddress += ', ';
      patientAddress += address.city; 
    }
    if (address.state) {
      if (patientAddress) patientAddress += ', ';
      patientAddress += address.state;
    }
    if (address.postalCode) {
      if (patientAddress) patientAddress += ' ';
      patientAddress += address.postalCode;
    }
    if (address.country) {
      if (patientAddress) patientAddress += ', ';
      patientAddress += address.country;
    }
  
    return patientAddress;  
  }


  function getPatientAge(patient:Patient) {
    if (!patient || !patient.birthDate) {
      return null; 
    }
  
    const dob = new Date(patient.birthDate);
    const today = new Date();
    
    let age = today.getFullYear() - dob.getFullYear();
    const monthDiff = today.getMonth() - dob.getMonth();
  
    if (
      monthDiff < 0 || 
      (monthDiff === 0 && today.getDate() < dob.getDate())
    ) {
      age--;
    }
    let ageStr = age.toString() + "Y"; 
    return ageStr;
  }




export function mapPatientToPatientHeading(patient:Patient):PatientHeading {
    return {
        id: patient.id ?? 0,
        ihi: getIHI(patient),
        name: getUsualName(patient),
        dob: getDOB(patient),
        address: getPatientAddress(patient),
        sex: patient.gender ?? "Unknown",
        age: getPatientAge(patient) ?? "Unknown"
    }
}


export const isPatient = (resource: fhir4.Resource): resource is fhir4.Patient => {
    return resource.resourceType === 'Patient'
  }