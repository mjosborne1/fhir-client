<script lang="ts">
    import type { ActionData } from './$types.js';
    import type { SearchBoxProps } from '$lib/types/searchbox.js';
    export let data;       
    export let form:ActionData;
    let selectedConcept:string;

    // Sveltekit packages
   import { base, assets } from '$app/paths';
   import { enhance } from '$app/forms';   

   //Components
   import SearchBox from '$lib/components/SearchBox.svelte';
   import Modal from '$lib/components/Modal.svelte'

   export let presentingProblemSearchProps: SearchBoxProps = {
     label: "Presenting Problem",
     fieldName: "PresentingProblem",
     formValueId: "presentingProblemValueId",
     formDisplayId: "presentingProblemDisplayId",
     heading: "Select a presenting problem or condition",
     apiECLQuery: "http://snomed.info/sct?fhir_vs=ecl/%5E%2032570581000036105%20",
     apiEndpoint: "https://r4.ontoserver.csiro.au/fhir",
     formId: "srchPresentingProblemId",
     preloadBehavior: "hover",
     loadingState: "waiting"
   };

   export let testCodeSearchProps: SearchBoxProps = {
     label:"Test Name",
     fieldName:"TestSearch",
     formValueId: "testCodeValueId",
     formDisplayId: "testCodeDisplayId",
     heading:"Select a test name",
     apiECLQuery: "http://snomed.info/sct?fhir_vs=ecl/%3C%3C%20363679005%20",
     apiEndpoint: "https://r4.ontoserver.csiro.au/fhir",
     formId:"srchTestCodeId",
     preloadBehavior:'hover',
     loadingState: 'waiting'
   };


   export let bodySiteSearchProps: SearchBoxProps = {
       label: "Body Site",
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
   
    function handleSubmit() {       
    }


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
        <section class="container">

            <h2>Patient: </h2>     
            {#await data}
            <p>Loading</p>
            {:then data}
            <div>                
                <p><code>IHI:</code> {data.patient.heading.ihi}</p>
                <p><code>Name:</code> {data.patient.heading.name}
                <code>DOB:</code> {data.patient.heading.dob}
                <code>Age:</code> {data.patient.heading.age}</p>
                <p><code>Sex:</code> {data.patient.heading.sex}
                <code>Address:</code> {@html data.patient.heading.address}</p>

            </div>
            <h2>Practitioner</h2>
            <div>                
                <h4>Identifiers:</h4>
                <p><code>HPI-I</code> {data.practitioner.heading.hpii} 
                   <code>Provider No</code> {data.practitioner.heading.provno} 
                   <code>Prescriber No</code> {data.practitioner.heading.prescno} </p>
                <h4>Details:</h4>
                <p><code>Organisation:</code> {data.organization.heading.name} </p>
                <p><code>Name:</code> {data.practitioner.heading.name}
                <code>Email:</code> {data.practitioner.heading.email}
                <code>Phone:</code> {data.practitioner.heading.phone}</p>
            </div>
            {/await}
        </section>
        <section class="container">
            <form method="post">
                <header>
                    <h2>Create a service request</h2>
                </header>

                <!-- Service Category-->
                <label for="Concept">Service Category</label>
                <select id="Concept" bind:value={selectedConcept}>
                    {#each data.categories as Concept}
                    <option value={Concept.id}>{Concept.display}</option>
                    {/each}
                </select>
 
                <!-- Add presenting problem-->
                <SearchBox  searchBoxProps={presentingProblemSearchProps}></SearchBox>    

                <!-- ServiceRequest.code-->   
                <SearchBox  searchBoxProps={testCodeSearchProps}></SearchBox>    
               
                <!-- ServiceRequest.bodySite for demo purposes - remove if not radiology -->        
                <SearchBox searchBoxProps={bodySiteSearchProps}></SearchBox>               
               
                <!-- Free text description of the test-->         
                <label for="requestFreeText">Notes:</label>
                <textarea cols="40" rows="3" id="requestFreeText"></textarea>
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
