import type { Organization } from "fhir/r4";
import type { OrganizationHeading } from '$lib/types/organization-heading';
import { getAddress, getPhoneNo, getType, getEmail } from '$lib/api/api-common';


function getHPIO(organization:Organization) {
    if (!organization || !organization.identifier) {
      return null; 
    }
  
    const identifier = organization.identifier.find(id => {
      return id.type && id.type.coding && id.type.text === "HPI-O" && 
        id.type.coding.some(c => c.code === 'NOI');
    });
  
    return identifier ? identifier.value : null;
  }


export function mapOrganizationToOrganizationHeading(organization:Organization):OrganizationHeading {
    return {
        id: organization.id ?? 0,
        type: getType(organization) ?? "",
        hpio: getHPIO(organization) ?? "",
        name: organization.name ?? "",
        address: getAddress(organization) ?? "",       
        phone: getPhoneNo(organization) ?? "",
        email: getEmail(organization) ?? ""
    }
}


export const isOrganization = (resource: fhir4.Resource): resource is fhir4.Organization => {
    return resource.resourceType === 'Organization'
  }