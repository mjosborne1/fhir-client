import type { Patient, Organization } from 'fhir/r4';

// Common Function to get a web displayable Address from a Patient or organization
export function getAddress(resident:Patient | Organization | Patient) {
    if (!resident || !resident.address) {
      return null;
    }
  
    const address = resident.address[0]; // Get first address
  
    // Build address string
    let residentAddress = '';
    if (address.line) {
      residentAddress += address.line.join(' ');
    }
    if (address.city) {
      if (residentAddress) residentAddress += ', ';
      residentAddress += address.city; 
    }
    if (address.state) {
      if (residentAddress) residentAddress += ', ';
      residentAddress += address.state;
    }
    if (address.postalCode) {
      if (residentAddress) residentAddress += ' ';
      residentAddress += address.postalCode;
    }
    if (address.country) {
      if (residentAddress) residentAddress += ', ';
      residentAddress += address.country;
    }
  
    return residentAddress;  
  }

  // Common Function to get a web displayable telephone number 
  // from a Patient or Organization 
export function getPhoneNo(resident: Organization | Patient) {
    if (!resident || !resident.telecom) {
      return null;
    }

    const phone = resident.telecom.find(contact => {
      return (contact.system === "phone")
    });

    return phone ? phone.value : null;
  }

  // Common Function to get a web displayable email address
  // from a Patient or Organization 
export function getEmail(resident: Organization | Patient) {
    if (!resident || !resident.telecom) {
      return null;
    }

    const email = resident.telecom.find(contact => {
      return contact.system === "email"
    });

    return email? email.value : null;
  }  

  // Common Function to get a web displayable "type" from a Resource
  // e.g. Practitioner.type or Organization.type 
  // 
export function getType(res: Organization) {
    if (!res || !res.type) {
        return null;
    }
    const resType = res.type[0];
    
} 
