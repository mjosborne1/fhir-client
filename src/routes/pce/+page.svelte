<script lang="ts">
    import { writable } from 'svelte/store';
    import type { ActionData } from './$types';
    import type { SearchBoxProps } from '$lib/types/searchbox';
    import type { Concept } from '$lib/types/concept-type';
    export let data;       
    export let form:ActionData;
    let selectedProcedure:Concept | null = null;
    let procedureCode:string;
    let badgeValue:string; 

    // Sveltekit packages
   import { base, assets } from '$app/paths';
   import { enhance } from '$app/forms';   

   //Components
   import SearchBox from '$lib/components/SearchBox.svelte';
   import Modal from '$lib/components/Modal.svelte';
   import Badge from '$lib/components/Badge.svelte';

   export let reasonForRequestSearchProps: SearchBoxProps = {
     label: "Reason for Request:",
     fieldName: "ReasonForRequest",
     formValueId: "reasonForRequestValueId",
     formDisplayId: "reasonForRequestDisplayId",
     heading: "Select a Reason for Request",
     apiECLQuery: "https://healthterminologies.gov.au/fhir/ValueSet/reason-for-request-1",
     apiEndpoint: "https://r4.ontoserver.csiro.au/fhir",
     formId: "srchReasonForRequestId",
     preloadBehavior: "hover",
     loadingState: "waiting"    
   };

   let bodySiteSearchProps = writable<SearchBoxProps> ({
     label: "Body Site",
     fieldName: "BodySite",
     formValueId: "bodySiteValueId",
     formDisplayId: "bodySiteDisplayId",
     heading: "Select a target body site",
     apiECLQuery: 'Set this based on the focus Procedure',
     apiEndpoint: "https://r4.ontoserver.csiro.au/fhir",
     formId: "srchBodySiteId",
     preloadBehavior: "hover",
     loadingState: "waiting"    
   });


	function handleBadgeClose(event: MouseEvent) {
		event.preventDefault(); // Prevent default action
        selectedProcedure = null;
		console.log('Badge closed', event)
	} 

// Reactive variables to store selected values
let bodySite = '';
let laterality = '';

// Options for the procedure field
const procedureRoot = [ 
         {code:'363678002',display:'PET imaging', bodySiteECL:'http://snomed.info/sct?fhir_vs=ecl/(%3C%2082918005%20.%20405813007%20)'},
         {code:'312254007',display:'Plain X-ray imaging', bodySiteECL: 'http://snomed.info/sct?fhir_vs=ecl/((%3C%20363680008%20OR%20%3C168537006%20)%20.%20405813007%20)' },
         {code:'312251004',display:'Computed tomography imaging', bodySiteECL:'http://snomed.info/sct?fhir_vs=ecl/(%3C%2077477000%20.%20405813007%20)'},
         {code:'702569007',display:'Cone beam acquisition', bodySiteECL:'http://snomed.info/sct?fhir_vs=ecl/(%3C%20717193008%20.%20405813007%20)'},
         {code:'312250003',display:'Magnetic resonance imaging', bodySiteECL:'http://snomed.info/sct?fhir_vs=ecl/(%3C%20113091000%20.%20405813007%20)'},
         {code:'278292003',display:'Ultrasound imaging', bodySiteECL:'http://snomed.info/sct?fhir_vs=ecl/(%3C%2016310003%20.%20405813007%20)'},
         {code:'312275004',display:'Fluoroscopy imaging', bodySiteECL:'http://snomed.info/sct?fhir_vs=ecl/(%3C%2044491008%20.%20405813007%20)'},
         {code:'278110001',display:'Radiographic imaging (was Mammo)', bodySiteECL:'http://snomed.info/sct?fhir_vs=ecl/(%3C%2071651007%20.%20405813007%20)'},
         {code:'360037004',display:'Imaging modality (was Angiography)', bodySiteECL:'http://snomed.info/sct?fhir_vs=ecl/(%3C%2077343006%20.%20405813007%20)'}     
         ];
 
         
$: if (procedureCode) {
    console.log(procedureCode);
    let procedure = procedureRoot.find(proc => proc.code === procedureCode);
    if (procedure) {     
      console.log(`${procedure!.code} , ${procedure!.display}`);
      selectedProcedure = {
            id: procedure.code,
            display: procedure.display,
      }; 
      bodySiteSearchProps.update(props => {
        return { ...props, apiECLQuery: procedure.bodySiteECL };
      });
    }
}
</script>
<main class="container-fluid">  
    <nav>
       <a href="{base}/">
           <picture>
               <img
               alt="FHIR Test Client Post-coordinated Expression"
               src="{assets}/icon-pack/LOGO_FHIR.svg"
               style="width: 100%; height: 100px;"
               />
           </picture>
       </a>    
   </nav>
   <h1>FHIR Test Client (MVP)</h1>
   <h3>Post-coordinated Expression Request Example</h3>
   <h5>Procedures are now SNOMED qualifiers, subtypes of Imaging - action</h5>
       <article>
           
            {#await data}
                <p>Loading</p>
            {:then data}
                <div class="grid">
                    <div>
                        <section>
                            <h3>Patient: </h3>     
                            {#if data.patient.heading.ihi}
                            <p><code>IHI:</code> {data.patient.heading.ihi}</p>                    
                            {/if}                
                            <p><code>Name:</code> {data.patient.heading.name}
                                <code>DOB:</code> {data.patient.heading.dob}
                                <code>Age:</code> {data.patient.heading.age}
                            </p>
                            <p><code>Sex:</code> {data.patient.heading.sex}
                                <code>Address:</code> {@html data.patient.heading.address}</p>
                            </section>
                        </div>
                        <div>
                            <section>
                                <h3>Practitioner</h3>
                                <div>                
                                    <p>
                                        {#if data.practitioner.heading.hpii}
                                        <code>HPI-I</code> {data.practitioner.heading.hpii} 
                                        {/if}
                                        {#if data.practitioner.heading.provno}
                                        <code>Provider No</code> {data.practitioner.heading.provno} 
                                        {/if}
                                        {#if data.practitioner.heading.prescno}
                                        <code>Prescriber No</code> {data.practitioner.heading.prescno} 
                                        {/if}
                                    </p>
                                    
                                    {#if data.organization.heading.name}
                                    <p><code>Organisation:</code> {data.organization.heading.name} </p>
                                    {/if}
                                    <p>
                                        {#if data.practitioner.heading.name}
                                        <code>Name:</code> {data.practitioner.heading.name}
                                        {/if}
                                        {#if data.practitioner.heading.email}
                                        <code>Email:</code> {data.practitioner.heading.email}
                                        {/if}
                                        {#if data.practitioner.heading.phone}
                                        <code>Phone:</code> {data.practitioner.heading.phone}
                                        {/if}
                                        
                                    </p>
                                </div>
                            </section>
                        </div>
                </div>
            {/await}
        <section class="container">
            <form method="post">
                <header>
                    <h2>Create a Medical Imaging Service Request</h2>
                </header>

                <!-- Service Category: lock in to Imaging
                <label for="Concept">Service Category: Radiology</label>
                -->
                <input type="hidden" id="Concept" value="363679005"> 
 
                <!-- Add coded reason for request ValueSet SearchBox -->
                <SearchBox  searchBoxProps={reasonForRequestSearchProps}></SearchBox>
               
                <!-- Modality picklist-->   
                <label for="RootProcedure">Procedure/Modality</label>
                <select id="procedure" bind:value={procedureCode}>
                    <option value="">Select a procedure</option>
                    {#each procedureRoot as codedConcept}
                    <option value={codedConcept.code}>{codedConcept.display}</option>
                    {/each}
                </select>
                {#if selectedProcedure && selectedProcedure.id}
                 <Badge labelText={selectedProcedure.display} onClose={(event) => handleBadgeClose(event)}></Badge>
                {/if}
                <br><br>
                <!-- Body structure / body Site-->
                <SearchBox searchBoxProps={$bodySiteSearchProps}></SearchBox>  
                
                <div class="grid">
                    <section>
                        <!-- Laterality -->
                        <label for="fldLaterality">Laterality:</label>
                        <fieldset id="fldLaterality">
                            <label>
                                <input type="checkbox" name="laterality" value="Left" />
                                Left
                            </label>
                            <label>
                                <input type="checkbox" name="laterality" value="Right" />
                                Right
                            </label>
                            <label>
                                <input type="checkbox" name="laterality" value="Both" />
                                Both
                            </label>                            
                        </fieldset>  
                    </section>
                    <section>
                        <!-- Contrast -->
                        <label for="fldContrast">Contrast:</label>
                        <fieldset id="fldContrast">
                            <label>
                                <input type="checkbox" name="contrast" value="With Contrast" />
                                With Contrast
                            </label>
                            <label>
                                <input type="checkbox" name="contrast" value="Without Contrast" />
                                Without Contrast
                            </label>                                                   
                        </fieldset>  
                    </section>
                </div>
              
               
               <!-- Test list-->    
                <label for="freeTextTests">Free-Text Test List:</label>
                <textarea cols="40" rows="3" id="freeTextTests"></textarea>
               
               <!-- Billing suggestion -->
                <label for="requestBilling">Billing:</label>
                <fieldset id="requestBilling">
                    <label>
                        <input type="radio" name="requestBilling" checked />
                        Bulk Bill
                    </label>
                    <label>
                        <input type="radio" name="requestBilling" />
                        DVA Billing
                    </label>
                    <label>
                        <input type="radio" name="requestBilling" />
                        Rebate
                    </label>
                    <label>
                        <input type="radio" name="requestBilling" />
                        Private Billing
                    </label>
                </fieldset>                

                <!-- Free text description of the test-->         
                <label for="requestFreeText">Notes:</label>
                <textarea cols="40" rows="3" id="requestFreeText"></textarea>

                <!-- Submit the form data to the server-->
                <button type="submit">Create</button>
            </form>

            {#if form?.status === "success"}                           
                <Modal showModal={true}>
                    <h4><ins>Service Request Submitted!</ins></h4>
                </Modal>            
            {/if}
        </section>

        </article>
    </main>
   