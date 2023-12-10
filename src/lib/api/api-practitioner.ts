import type { Practitioner } from 'fhir/r4';
import type { PractitionerHeading } from '$lib/types/practitioner-heading'


function getUsualName(practitioner:Practitioner) {
    if (!practitioner || !practitioner.name) {
      return null;
    } 
    const name = practitioner.name[0];
    if (name && name.given && name.family) {
      return `${name.given.join(' ')} ${name.family}`; 
    }
  
    return null;
  }
  
  function getProviderNo(Practitioner:Practitioner) {
    if (!Practitioner || !Practitioner.identifier) {
      return null; 
    }
  
    const identifier = Practitioner.identifier.find(id => {
      return id.type && id.type.coding && id.type.coding.some(c => c.code === 'UPIN') &&
        id.system == "http://ns.electronichealth.net.au/id/medicare-provider-number"
    });
  
    return identifier ? identifier.value : null;
  }


  function getPhoneNo(practitioner: Practitioner) {
    if (!practitioner || !practitioner.telecom) {
      return null;
    }

    const phone = practitioner.telecom.find(contact => {
      return (contact.system === "phone")
    });

    return phone ? phone.value : null;
  }


  function getEmail(practitioner: Practitioner) {
    if (!practitioner || !practitioner.telecom) {
      return null;
    }

    const email = practitioner.telecom.find(contact => {
      return contact.system === "email"
    });

    return email? email.value : null;
  }

  function getPrescriberNo(Practitioner:Practitioner) {
    if (!Practitioner || !Practitioner.identifier) {
      return null; 
    }
  
    const identifier = Practitioner.identifier.find(id => {
      return id.type && id.type.coding && id.type.coding.some(c => c.code === 'PRES') &&
        id.system == "http://ns.electronichealth.net.au/id/medicare-prescriber-number"
    });
  
    return identifier ? identifier.value : null;
  }

  function getHPII(Practitioner:Practitioner){
    if (!Practitioner || !Practitioner.identifier) {
      return null; 
    }
    const identifier = Practitioner.identifier.find(id => {
      return id.type && id.type.coding && id.type.coding.some(c => c.code === 'NPI') &&
        id.system == "http://ns.electronichealth.net.au/id/hi/hpii/1.0"
    });
  
    return identifier ? identifier.value : null;

  }
  


export function mapPractitionerToPractitionerHeading(Practitioner:Practitioner):PractitionerHeading {
    return {
        id: Practitioner.id ?? 0,
        hpii: getHPII(Practitioner) ?? "",
        name: getUsualName(Practitioner),
        provno: getProviderNo(Practitioner) ?? "",
        prescno: getPrescriberNo(Practitioner) ?? "",
        phone: getPhoneNo(Practitioner) ?? "",
        email: getEmail(Practitioner) ?? ""
    }
}


export const isPractitioner = (resource: fhir4.Resource): resource is fhir4.Practitioner => {
    return resource.resourceType === 'Practitioner'
  }