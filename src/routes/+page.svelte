<script lang="ts">
    import type { ActionData } from './$types';
    import type { SearchBoxProps } from '$lib/types/searchbox';
    export let data;       
    export let form:ActionData;
    let selectedConcept:string;

    // Sveltekit packages
   import { base, assets } from '$app/paths';
   import { enhance } from '$app/forms';   

   //Components
   import SearchBox from '$lib/components/SearchBox.svelte';
   import Modal from '$lib/components/Modal.svelte'


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

   export let testCodeSearchPropsRadiology: SearchBoxProps = {
     label:"Test Name:",
     fieldName:"TestSearch",
     formValueId: "testCodeValueId",
     formDisplayId: "testCodeDisplayId",
     heading:"Select a test name",
 //    apiECLQuery: "http://snomed.info/sct?fhir_vs=ecl/%3C%3C%20363679005%20",
     apiECLQuery: "http://erequestingexample.org.au/fhir/ValueSet/radiology-services-1",
     apiEndpoint: "https://r4.ontoserver.csiro.au/fhir",
     formId:"srchTestCodeId",
     preloadBehavior:'hover',
     loadingState: 'waiting'
   };

   export let testCodeSearchPropsSpirometry: SearchBoxProps = {
     label:"Test Name:",
     fieldName:"TestSearch",
     formValueId: "testCodeValueId",
     formDisplayId: "testCodeDisplayId",
     heading:"Select a test name",
     apiECLQuery: "http://snomed.info/sct?fhir_vs=ecl/%3C%3C%2023426006%20",
     apiEndpoint: "https://r4.ontoserver.csiro.au/fhir",
     formId:"srchTestCodeId",
     preloadBehavior:'hover',
     loadingState: 'waiting'
   };

   export let testCodeSearchPropsPathology: SearchBoxProps = {
     label:"Test Name:",
     fieldName:"TestSearch",
     formValueId: "testCodeValueId",
     formDisplayId: "testCodeDisplayId",
     heading:"Select a test name",
     // SPIA RefSet Members
     apiECLQuery: "http://snomed.info/sct?fhir_vs=ecl/%5E%201072351000168102%20",
     apiEndpoint: "https://r4.ontoserver.csiro.au/fhir",
     formId:"srchTestCodeId",
     preloadBehavior:'hover',
     loadingState: 'waiting'
   };

   export let bodySiteSearchProps: SearchBoxProps = {
       label: "Body Site:",
       fieldName: "ServiceRequestBodySite",
       formValueId: "bodySiteValueId",
       formDisplayId: "bodySiteDisplayId",
       heading:"Select a body site",
       apiECLQuery: "http://snomed.info/sct?fhir_vs=ecl/%5E%206021000036108%20",
       apiEndpoint: "https://r4.ontoserver.csiro.au/fhir",
       formId:"bodySiteId",
       preloadBehavior: 'hover',
       loadingState: 'waiting'
   };
   
    
</script>
<main class="container-fluid">   
   <nav>
       <h1>FHIR Test Client (MVP)</h1>
       <a href="{base}/">
           <picture>
               <img
               alt="FHIR Test Client"
               src="{assets}/icon-pack/LOGO_FHIR.svg"
               style="width: 100%; height: 100px;"
               />
           </picture>
       </a>    
   </nav>
   
       <article>
           
            {#await data}
                <p>Loading</p>
            {:then data}
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
            {/await}
        <section class="container">
            <form method="post">
                <header>
                    <h2>Create a service request</h2>
                </header>

                <!-- Service Category-->
                <label for="Concept">Service Category:</label>
                <select id="Concept" bind:value={selectedConcept}>
                    {#each data.categories as Concept}
                    <option value={Concept.id}>{Concept.display}</option>
                    {/each}
                </select>
 
                <!-- Add coded reason for request -->
                <SearchBox  searchBoxProps={reasonForRequestSearchProps}></SearchBox>    
                <!-- Radiology / Medical Imaging-->
                {#if selectedConcept === "363679005"}
                <!-- Radiology binding to ServiceRequest.code-->   
                <SearchBox  searchBoxProps={testCodeSearchPropsRadiology}></SearchBox>    

                <!-- ServiceRequest.bodySite for demo purposes - remove if not radiology -->        
                <SearchBox searchBoxProps={bodySiteSearchProps}></SearchBox>  

               <!-- Lung function testing --> 
               {:else if selectedConcept === "1231393002"}
                <!-- Spirometry ServiceRequest.code-->   
                <SearchBox  searchBoxProps={testCodeSearchPropsSpirometry}></SearchBox>              
               {:else}
                <!-- Default to Pathology ServiceRequest.code-->   
                <SearchBox  searchBoxProps={testCodeSearchPropsPathology}></SearchBox>    
               {/if}
               
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
