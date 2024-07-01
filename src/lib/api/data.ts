import type { Concept } from "$lib/types/concept-type";
import type { Bundle } from "fhir/r4";
// Service Categories
export const categories : Concept[] =
    [
      {
        id: "108252007", display: "Pathology" 
      },
      {
        id: "363679005", display: "Imaging"
      },
      {
        id: "1231393002", display: "Lung function testing"
      }
    ];

const realExampleBundle  = 
{
  id: "0914f990-8506-11ee-ada2-d2cbed391bce",
  entry: [
      {
          fullUrl: "urn:uuid:b052053c-8505-11ee-ada2-d2cbed391bce",
          request: {
              method: "PUT",
              url: "Organization/b052053c-8505-11ee-ada2-d2cbed391bce"
          },
          resource: {
              id: "b052053c-8505-11ee-ada2-d2cbed391bce",
              meta: {
                  profile: [
                      "http://hl7.org.au/fhir/StructureDefinition/au-organization"
                  ],
                  source: "creator:uiGeniePathOrder/v0.0.6"
              },
              active: true,
              address: [
                  {
                      city: "North Stacie",
                      country: "AU",
                      line: [
                          "340 Rodney Edge"
                      ],
                      postalCode: "3704",
                      state: "TAS",
                      text: "340 Rodney Edge\nNorth Stacie, TAS, 3704",
                      type: "physical",
                      use: "work"
                  }
              ],
              identifier: [
                  {
                      system: "http://ns.electronichealth.net.au/id/hi/hpio/1.0",
                      type: {
                          coding: [
                              {
                                  code: "NOI",
                                  display: "National Organisation Identifier",
                                  system: "http://terminology.hl7.org.au/CodeSystem/v2-0203"
                              }
                          ],
                          text: "HPI-O"
                      },
                      value: "8003627307452201"
                  }
              ],
              name: "North Stacie Medical Centre",
              telecom: [
                  {
                      system: "phone",
                      use: "work",
                      value: "6148824490"
                  },
                  {
                      system: "fax",
                      use: "work",
                      value: "0796996767"
                  },
                  {
                      system: "email",
                      use: "work",
                      value: "williamsricardo@example.com"
                  }
              ],
              resourceType: "Organization"
          }
      },
      {
          fullUrl: "urn:uuid:b0519a48-8505-11ee-ada2-d2cbed391bce",
          request: {
              method: "PUT",
              url: "Practitioner/b0519a48-8505-11ee-ada2-d2cbed391bce"
          },
          resource: {
              id: "b0519a48-8505-11ee-ada2-d2cbed391bce",
              meta: {
                  profile: [
                      "http://hl7.org.au/fhir/StructureDefinition/au-practitioner"
                  ],
                  source: "creator:uiGeniePathOrder/v0.0.6"
              },
              active: true,
              identifier: [
                  {
                      system: "http://ns.electronichealth.net.au/id/hi/hpii/1.0",
                      type: {
                          coding: [
                              {
                                  code: "NPI",
                                  display: "National provider identifier",
                                  system: "http://terminology.hl7.org/CodeSystem/v2-0203"
                              }
                          ],
                          text: "HPI-I"
                      },
                      value: "8003613904760816"
                  }
              ],
              name: [
                  {
                      family: "King",
                      given: [
                          "Julia"
                      ],
                      prefix: [
                          "Dr"
                      ],
                      text: "Julia King",
                      use: "official"
                  }
              ],
              resourceType: "Practitioner"
          }
      },
      {
          fullUrl: "urn:uuid:b0521482-8505-11ee-ada2-d2cbed391bce",
          request: {
              method: "PUT",
              url: "PractitionerRole/b0521482-8505-11ee-ada2-d2cbed391bce"
          },
          resource: {
              id: "b0521482-8505-11ee-ada2-d2cbed391bce",
              meta: {
                  profile: [
                      "http://draft.hl7.org.au/fhir/diagnostic-orders/StructureDefinition/eorders-practitionerrole"
                  ],
                  source: "creator:uiGeniePathOrder/v0.0.6"
              },
              active: true,
              identifier: [
                  {
                      system: "http://ns.electronichealth.net.au/id/medicare-provider-number",
                      type: {
                          coding: [
                              {
                                  code: "UPIN",
                                  display: "Medicare Provider Number",
                                  system: "http://terminology.hl7.org.au/CodeSystem/v2-0203"
                              }
                          ],
                          text: "Medicare Provider Number"
                      },
                      value: "814304DF"
                  },
                  {
                      assigner: {
                          display: "Betoota Pathology"
                      },
                      system: "http://ns.electronichealth.net.au/id/hpio-scoped/service-provider-individual/1.0/8003629538686011",
                      type: {
                          coding: [
                              {
                                  code: "DN",
                                  system: "http://terminology.hl7.org/CodeSystem/v2-0203"
                              }
                          ]
                      },
                      value: "BE0549"
                  }
              ],
              location: [
                  {
                      display: "North Stacie Medical Centre"
                  }
              ],
              organization: {
                  display: "North Stacie Medical Centre",
                  reference: "Organization/b052053c-8505-11ee-ada2-d2cbed391bce"
              },
              practitioner: {
                  display: "Julia King",
                  reference: "Practitioner/b0519a48-8505-11ee-ada2-d2cbed391bce"
              },
              resourceType: "PractitionerRole"
          }
      },
      {
          fullUrl: "urn:uuid:b052a2e4-8505-11ee-ada2-d2cbed391bce",
          request: {
              method: "PUT",
              url: "Patient/b052a2e4-8505-11ee-ada2-d2cbed391bce"
          },
          resource: {
              id: "b052a2e4-8505-11ee-ada2-d2cbed391bce",
              meta: {
                  profile: [
                      "http://hl7.org.au/fhir/StructureDefinition/au-patient"
                  ],
                  source: "creator:uiGeniePathOrder/v0.0.6"
              },
              active: true,
              address: [
                  {
                      city: "Maryville",
                      country: "AU",
                      line: [
                          "Unit 70 045 Amber Garden"
                      ],
                      postalCode: "2647",
                      state: "NT",
                      text: "Unit 70 045 Amber Garden\nMaryville, NT, 2647",
                      type: "physical",
                      use: "home"
                  }
              ],
              birthDate: "1963-01-28",
              deceasedBoolean: false,
              gender: "female",
              generalPractitioner: [
                  {
                      display: "PractitionerRole",
                      reference: "PractitionerRole/b0521482-8505-11ee-ada2-d2cbed391bce"
                  }
              ],
              identifier: [
                  {
                      period: {
                          end: "2026-08"
                      },
                      system: "http://ns.electronichealth.net.au/id/medicare-number",
                      type: {
                          coding: [
                              {
                                  code: "MC",
                                  display: "Patient's Medicare Number",
                                  system: "http://terminology.hl7.org/CodeSystem/v2-0203"
                              }
                          ],
                          text: "Patient's Medicare Number"
                      },
                      value: "27173390821"
                  },
                  {
                      system: "http://ns.electronichealth.net.au/id/hi/ihi/1.0",
                      type: {
                          coding: [
                              {
                                  code: "NI",
                                  display: "National unique individual identifier",
                                  system: "http://terminology.hl7.org/CodeSystem/v2-0203"
                              }
                          ],
                          text: "National unique individual identifier"
                      },
                      value: "8003608297041642"
                  },
                  {
                      assigner: {
                          display: "Department of Veterans' Affairs",
                          type: "Organization"
                      },
                      system: "http://ns.electronichealth.net.au/id/dva",
                      type: {
                          coding: [
                              {
                                  code: "DVG",
                                  display: "DVA Number (Gold Card)",
                                  system: "http://terminology.hl7.org.au/CodeSystem/v2-0203"
                              }
                          ],
                          text: "DVA Number (Gold Card)"
                      },
                      value: "TFW72641"
                  }
              ],
              managingOrganization: {
                  display: "North Stacie Medical Centre",
                  reference: "Organization/b052053c-8505-11ee-ada2-d2cbed391bce"
              },
              name: [
                  {
                      family: "Greer",
                      given: [
                          "Jennifer"
                      ],
                      prefix: [
                          "Mrs."
                      ],
                      text: "Jennifer Greer",
                      use: "official"
                  }
              ],
              telecom: [
                  {
                      system: "phone",
                      use: "mobile",
                      value: "0371662280"
                  },
                  {
                      system: "email",
                      use: "home",
                      value: "carriewoods@example.org"
                  }
              ],
              resourceType: "Patient"
          }
      },
      {
          fullUrl: "urn:uuid:ae4c3410-8505-11ee-ada2-d2cbed391bce",
          request: {
              method: "PUT",
              url: "Organization/ae4c3410-8505-11ee-ada2-d2cbed391bce"
          },
          resource: {
              id: "ae4c3410-8505-11ee-ada2-d2cbed391bce",
              meta: {
                  profile: [
                      "http://hl7.org.au/fhir/StructureDefinition/au-organization"
                  ],
                  source: "creator:uiGeniePathOrder/v0.0.6"
              },
              active: true,
              address: [
                  {
                      city: "Betoota",
                      country: "AU",
                      line: [
                          "199 Haddon Street"
                      ],
                      postalCode: "4482",
                      state: "QLD",
                      type: "physical",
                      use: "work"
                  }
              ],
              identifier: [
                  {
                      system: "http://ns.electronichealth.net.au/id/hi/hpio/1.0",
                      type: {
                          coding: [
                              {
                                  code: "NOI",
                                  display: "National Organisation Identifier",
                                  system: "http://terminology.hl7.org.au/CodeSystem/v2-0203"
                              }
                          ],
                          text: "HPI-O"
                      },
                      value: "8003629538686011"
                  }
              ],
              name: "Betoota Pathology",
              telecom: [
                  {
                      system: "phone",
                      use: "work",
                      value: "info@betootapath.com.au"
                  },
                  {
                      system: "fax",
                      use: "work",
                      value: "+61755512346"
                  }
              ],
              resourceType: "Organization"
          }
      },
      {
          fullUrl: "urn:uuid:09169d9a-8506-11ee-ada2-d2cbed391bce",
          request: {
              method: "PUT",
              url: "ServiceRequest/09169d9a-8506-11ee-ada2-d2cbed391bce"
          },
          resource: {
              id: "09169d9a-8506-11ee-ada2-d2cbed391bce",
              meta: {
                  profile: [
                      "http://draft.hl7.org.au/fhir/diagnostic-orders/StructureDefinition/eorders-diagnosticrequest-pathology"
                  ],
                  source: "creator:uiGeniePathOrder/v0.0.6"
              },
              contained: [
                  {
                      id: "billingCoverage",
                      meta: {
                          profile: [
                              "http://draft.hl7.org.au/fhir/diagnostic-orders/StructureDefinition/eorders-coverage,"
                          ],
                          source: "creator:uiGeniePathOrder/v0.0.6"
                      },
                      beneficiary: {
                          display: "Jennifer Greer",
                          reference: "Patient/b052a2e4-8505-11ee-ada2-d2cbed391bce"
                      },
                      payor: [
                          {
                              display: "Department of Veterans' Affairs",
                              type: "Organization"
                          }
                      ],
                      status: "active",
                      type: {
                          coding: [
                              {
                                  code: "VET",
                                  display: "veteran health program",
                                  system: "http://terminology.hl7.org/CodeSystem/v3-ActCode",
                                  version: "2018-08-12"
                              }
                          ],
                          text: "DVA"
                      },
                      resourceType: "Coverage"
                  },
                  {
                      id: "patientEncounter",
                      meta: {
                          profile: [
                              "http://draft.hl7.org.au/fhir/diagnostic-orders/StructureDefinition/eorders-encounter"
                          ],
                          source: "creator:uiGeniePathOrder/v0.0.6"
                      },
                      class: {
                          code: "AMB",
                          display: "ambulatory",
                          system: "http://terminology.hl7.org/CodeSystem/v3-ActCode"
                      },
                      status: "finished",
                      resourceType: "Encounter"
                  }
              ],
              extension: [
                  {
                      url: "http://hl7.org/fhir/StructureDefinition/servicerequest-precondition",
                      valueCodeableConcept: {
                          coding: [
                              {
                                  code: "726054005",
                                  display: "After fasting",
                                  system: "http://snomed.info/sct"
                              }
                          ],
                          text: "Fasting"
                      }
                  }
              ],
              authoredOn: "2023-11-17T14:59:06.000001+10:00",
              category: [
                  {
                      coding: [
                          {
                              code: "108252007",
                              display: "Laboratory procedure",
                              system: "http://snomed.info/sct"
                          }
                      ],
                      text: "Laboratory procedure"
                  }
              ],
              code: {
                  coding: [
                      {
                          extension: [
                              {
                                  url: "http://hl7.org/fhir/StructureDefinition/valueset-reference",
                                  valueUri: "https://www.rcpa.edu.au/fhir/ValueSet/spia-requesting-refset-3|3.0.1"
                              }
                          ],
                          code: "26604007",
                          display: "Full blood count",
                          system: "http://snomed.info/sct"
                      }
                  ],
                  text: "Full blood count"
              },
              encounter: {
                  display: "Encounter",
                  reference: "#patientEncounter",
                  type: "Encounter"
              },
              identifier: [
                  {
                      system: "http://ns.electronichealth.net.au/id/hpio-scoped/order/1.0/8003627307452201",
                      type: {
                          coding: [
                              {
                                  code: "PLAC",
                                  display: "Placer Identifier",
                                  system: "http://terminology.hl7.org/CodeSystem/v2-0203"
                              }
                          ],
                          text: "Placer Number"
                      },
                      value: "PON-Genie-20231117145906-0679"
                  }
              ],
              insurance: [
                  {
                      display: "Coverage",
                      reference: "#billingCoverage",
                      type: "Coverage"
                  }
              ],
              intent: "order",
              occurrencePeriod: {
                  end: "2024-11-15",
                  start: "2023-11-17"
              },
              patientInstruction: "Some patient instructions for the patient",
              priority: "routine",
              quantityQuantity: {
                  value: 1
              },
              reasonCode: [
                  {
                      text: "This is a clinical note to be read by the filler clinician"
                  }
              ],
              requester: {
                  display: "PractitionerRole",
                  reference: "PractitionerRole/b0521482-8505-11ee-ada2-d2cbed391bce"
              },
              requisition: {
                  assigner: {
                      display: "North Stacie Medical Centre",
                      reference: "Organization/b052053c-8505-11ee-ada2-d2cbed391bce"
                  },
                  system: "http://ns.electronichealth.net.au/id/hpio-scoped/order/1.0/8003627307452201",
                  type: {
                      coding: [
                          {
                              code: "PGN",
                              display: "Placer Group Number",
                              system: "http://terminology.hl7.org/CodeSystem/v2-0203"
                          }
                      ],
                      text: "Placer Group Number"
                  },
                  value: "GEN58924-A0440"
              },
              status: "active",
              subject: {
                  display: "Jennifer Greer",
                  reference: "Patient/b052a2e4-8505-11ee-ada2-d2cbed391bce"
              },
              resourceType: "ServiceRequest"
          }
      },
      {
          fullUrl: "urn:uuid:0916e386-8506-11ee-ada2-d2cbed391bce",
          request: {
              method: "PUT",
              url: "Task/0916e386-8506-11ee-ada2-d2cbed391bce"
          },
          resource: {
              id: "0916e386-8506-11ee-ada2-d2cbed391bce",
              meta: {
                  profile: [
                      "http://draft.hl7.org.au/fhir/diagnostic-orders/StructureDefinition/diagnostic-task-request"
                  ],
                  source: "creator:uiGeniePathOrder/v0.0.6",
                  tag: [
                      {
                          code: "diagnostic-task-request",
                          display: "diagnostic task request",
                          system: "http://draft.hl7.org.au/fhir/diagnostic-orders/CodeSystem/diagnostic-task-tag"
                      }
                  ]
              },
              authoredOn: "2023-11-17T14:59:06.000002+10:00",
              code: {
                  coding: [
                      {
                          code: "fulfill",
                          display: "Fulfill the focal request",
                          system: "http://hl7.org/fhir/CodeSystem/task-code"
                      }
                  ],
                  text: "Fulfill"
              },
              description: "Fulfillment workflow for the referenced ServiceRequest",
              focus: {
                  display: "ServiceRequest",
                  reference: "ServiceRequest/09169d9a-8506-11ee-ada2-d2cbed391bce"
              },
              for: {
                  display: "Jennifer Greer",
                  reference: "Patient/b052a2e4-8505-11ee-ada2-d2cbed391bce"
              },
              groupIdentifier: {
                  assigner: {
                      display: "North Stacie Medical Centre",
                      reference: "Organization/b052053c-8505-11ee-ada2-d2cbed391bce"
                  },
                  system: "http://ns.electronichealth.net.au/id/hpio-scoped/order/1.0/8003627307452201",
                  type: {
                      coding: [
                          {
                              code: "PGN",
                              display: "Placer Group Number",
                              system: "http://terminology.hl7.org/CodeSystem/v2-0203"
                          }
                      ],
                      text: "Placer Group Number"
                  },
                  value: "GEN58924-A0440"
              },
              intent: "order",
              owner: {
                  display: "Betoota Pathology",
                  reference: "Organization/ae4c3410-8505-11ee-ada2-d2cbed391bce"
              },
              partOf: [
                  {
                      display: "Task",
                      reference: "Task/0914f990-8506-11ee-ada2-d2cbed391bce"
                  }
              ],
              priority: "routine",
              requester: {
                  display: "PractitionerRole",
                  reference: "PractitionerRole/b0521482-8505-11ee-ada2-d2cbed391bce"
              },
              status: "requested",
              resourceType: "Task"
          }
      },
      {
          fullUrl: "urn:uuid:09172a8a-8506-11ee-ada2-d2cbed391bce",
          request: {
              method: "PUT",
              url: "CommunicationRequest/09172a8a-8506-11ee-ada2-d2cbed391bce"
          },
          resource: {
              id: "09172a8a-8506-11ee-ada2-d2cbed391bce",
              contained: [
                  {
                      id: "09171630-8506-11ee-ada2-d2cbed391bce",
                      meta: {
                          profile: [
                              "http://hl7.org.au/fhir/StructureDefinition/au-patient"
                          ],
                          source: "creator:uiGeniePathOrder/v0.0.6"
                      },
                      name: [
                          {
                              family: "Greer",
                              given: [
                                  "Jennifer"
                              ],
                              prefix: [
                                  "Mrs."
                              ],
                              text: "Jennifer Greer",
                              use: "official"
                          }
                      ],
                      telecom: [
                          {
                              system: "phone",
                              use: "mobile",
                              value: "0371662280"
                          }
                      ],
                      resourceType: "Patient"
                  }
              ],
              about: [
                  {
                      display: "Task",
                      reference: "Task/0914f990-8506-11ee-ada2-d2cbed391bce"
                  }
              ],
              authoredOn: "2023-11-17T14:59:06+10:00",
              category: [
                  {
                      coding: [
                          {
                              code: "reminder",
                              display: "Reminder",
                              system: "http://terminology.hl7.org/CodeSystem/communication-category"
                          }
                      ],
                      text: "Reminder"
                  },
                  {
                      coding: [
                          {
                              code: "instruction",
                              display: "Instruction",
                              system: "http://terminology.hl7.org/CodeSystem/communication-category"
                          }
                      ],
                      text: "Instruction"
                  }
              ],
              doNotPerform: false,
              groupIdentifier: {
                  assigner: {
                      display: "North Stacie Medical Centre",
                      reference: "Organization/b052053c-8505-11ee-ada2-d2cbed391bce"
                  },
                  system: "http://ns.electronichealth.net.au/id/hpio-scoped/order/1.0/8003627307452201",
                  type: {
                      coding: [
                          {
                              code: "PGN",
                              display: "Placer Group Number",
                              system: "http://terminology.hl7.org/CodeSystem/v2-0203"
                          }
                      ],
                      text: "Placer Group Number"
                  },
                  value: "GEN58924-A0440"
              },
              medium: [
                  {
                      coding: [
                          {
                              code: "WRITTEN",
                              display: "written",
                              system: "http://terminology.hl7.org/CodeSystem/v3-ParticipationMode"
                          }
                      ],
                      text: "SMS"
                  }
              ],
              priority: "routine",
              recipient: [
                  {
                      display: "Jennifer Greer",
                      reference: "#09171630-8506-11ee-ada2-d2cbed391bce",
                      type: "Patient"
                  }
              ],
              requester: {
                  display: "Jennifer Greer",
                  reference: "Patient/b052a2e4-8505-11ee-ada2-d2cbed391bce"
              },
              sender: {
                  display: "Betoota Pathology",
                  reference: "Organization/ae4c3410-8505-11ee-ada2-d2cbed391bce"
              },
              status: "active",
              resourceType: "CommunicationRequest"
          }
      },
      {
          fullUrl: "urn:uuid:091736f6-8506-11ee-ada2-d2cbed391bce",
          request: {
              method: "PUT",
              url: "Task/091736f6-8506-11ee-ada2-d2cbed391bce"
          },
          resource: {
              id: "091736f6-8506-11ee-ada2-d2cbed391bce",
              meta: {
                  profile: [
                      "http://draft.hl7.org.au/fhir/diagnostic-orders/StructureDefinition/diagnostic-task-communicationrequest"
                  ],
                  source: "creator:uiGeniePathOrder/v0.0.6",
                  tag: [
                      {
                          code: "diagnostic-task-request",
                          display: "diagnostic task request",
                          system: "http://draft.hl7.org.au/fhir/diagnostic-orders/CodeSystem/diagnostic-task-tag"
                      }
                  ]
              },
              authoredOn: "2023-11-17T14:59:06+10:00",
              code: {
                  coding: [
                      {
                          code: "fulfill",
                          display: "Fulfill the focal request",
                          system: "http://hl7.org/fhir/CodeSystem/task-code"
                      }
                  ],
                  text: "Fulfill"
              },
              focus: {
                  display: "CommunicationRequest",
                  reference: "CommunicationRequest/09172a8a-8506-11ee-ada2-d2cbed391bce"
              },
              for: {
                  display: "Jennifer Greer",
                  reference: "Patient/b052a2e4-8505-11ee-ada2-d2cbed391bce"
              },
              groupIdentifier: {
                  assigner: {
                      display: "North Stacie Medical Centre",
                      reference: "Organization/b052053c-8505-11ee-ada2-d2cbed391bce"
                  },
                  system: "http://ns.electronichealth.net.au/id/hpio-scoped/order/1.0/8003627307452201",
                  type: {
                      coding: [
                          {
                              code: "PGN",
                              display: "Placer Group Number",
                              system: "http://terminology.hl7.org/CodeSystem/v2-0203"
                          }
                      ],
                      text: "Placer Group Number"
                  },
                  value: "GEN58924-A0440"
              },
              intent: "order",
              owner: {
                  display: "Betoota Pathology",
                  reference: "Organization/ae4c3410-8505-11ee-ada2-d2cbed391bce"
              },
              partOf: [
                  {
                      display: "Task",
                      reference: "Task/0914f990-8506-11ee-ada2-d2cbed391bce"
                  }
              ],
              priority: "routine",
              requester: {
                  display: "PractitionerRole",
                  reference: "PractitionerRole/b0521482-8505-11ee-ada2-d2cbed391bce"
              },
              status: "requested",
              resourceType: "Task"
          }
      },
      {
          fullUrl: "urn:uuid:0914f990-8506-11ee-ada2-d2cbed391bce",
          request: {
              method: "PUT",
              url: "Task/0914f990-8506-11ee-ada2-d2cbed391bce"
          },
          resource: {
              id: "0914f990-8506-11ee-ada2-d2cbed391bce",
              meta: {
                  profile: [
                      "http://draft.hl7.org.au/fhir/diagnostic-orders/StructureDefinition/diagnostic-task-group"
                  ],
                  source: "creator:uiGeniePathOrder/v0.0.6",
                  tag: [
                      {
                          code: "diagnostic-task-group",
                          display: "diagnostic task group",
                          system: "http://draft.hl7.org.au/fhir/diagnostic-orders/CodeSystem/diagnostic-task-tag"
                      }
                  ]
              },
              authoredOn: "2023-11-17T14:59:06+10:00",
              code: {
                  coding: [
                      {
                          code: "fulfill",
                          display: "Fulfill the focal request",
                          system: "http://hl7.org/fhir/CodeSystem/task-code"
                      }
                  ],
                  text: "Fulfill"
              },
              description: "Group workflow task for a set of fulfillment tasks",
              for: {
                  display: "Jennifer Greer",
                  reference: "Patient/b052a2e4-8505-11ee-ada2-d2cbed391bce"
              },
              groupIdentifier: {
                  assigner: {
                      display: "North Stacie Medical Centre",
                      reference: "Organization/b052053c-8505-11ee-ada2-d2cbed391bce"
                  },
                  system: "http://ns.electronichealth.net.au/id/hpio-scoped/order/1.0/8003627307452201",
                  type: {
                      coding: [
                          {
                              code: "PGN",
                              display: "Placer Group Number",
                              system: "http://terminology.hl7.org/CodeSystem/v2-0203"
                          }
                      ],
                      text: "Placer Group Number"
                  },
                  value: "GEN58924-A0440"
              },
              intent: "order",
              owner: {
                  display: "Betoota Pathology",
                  reference: "Organization/ae4c3410-8505-11ee-ada2-d2cbed391bce"
              },
              priority: "routine",
              requester: {
                  display: "PractitionerRole",
                  reference: "PractitionerRole/b0521482-8505-11ee-ada2-d2cbed391bce"
              },
              status: "requested",
              resourceType: "Task"
          }
      }
  ],
  timestamp: "2023-11-17T14:59:06+10:00",
  type: "transaction",
  resourceType: "Bundle"
}



export const exampleBundle:fhir4.Bundle = {
  resourceType: "Bundle",
  type: "transaction",
  timestamp: "2023-11-17T14:59:06+10:00",
  entry: [
    {
        fullUrl: "urn:uuid:b052053c-8505-11ee-ada2-d2cbed391bce",
        request: {
            method: "PUT",
            url: "Organization/b052053c-8505-11ee-ada2-d2cbed391bce"
        }
    ,
    resource: {
      id: "b052053c-8505-11ee-ada2-d2cbed391bce",
      meta: {
          profile: [
              "http://hl7.org.au/fhir/StructureDefinition/au-organization"
          ],
          source: "creator:uiGeniePathOrder/v0.0.6"
      },
      active: true,
      address: [
          {
              city: "North Stacie",
              country: "AU",
              line: [
                  "340 Rodney Edge"
              ],
              postalCode: "3704",
              state: "TAS",
              text: "340 Rodney Edge\nNorth Stacie, TAS, 3704",
              type: "physical",
              use: "work"
          }
      ],
      identifier: [
          {
              system: "http://ns.electronichealth.net.au/id/hi/hpio/1.0",
              type: {
                  coding: [
                      {
                          code: "NOI",
                          display: "National Organisation Identifier",
                          system: "http://terminology.hl7.org.au/CodeSystem/v2-0203"
                      }
                  ],
                  text: "HPI-O"
              },
              value: "8003627307452201"
          }
      ],
      name: "North Stacie Medical Centre",
      telecom: [
          {
              system: "phone",
              use: "work",
              value: "6148824490"
          },
          {
              system: "fax",
              use: "work",
              value: "0796996767"
          },
          {
              system: "email",
              use: "work",
              value: "williamsricardo@example.com"
          }
      ],
      resourceType: "Organization"
      } 
    }
  ]
}

