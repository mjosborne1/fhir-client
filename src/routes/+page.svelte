<script lang="ts">
    export let data;       
    //console.log(data);
    import { base, assets } from '$app/paths';
    function handleSubmit() {
        console.log("Submitted!");
    }
    let selectedServiceType:string;

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

            <h2>Test patient: </h2>     
            {#await data}
            <p>Loading</p>
            {:then data}
            <div>  
                <p><code>IHI:</code> {data.patient?.patHeading.ihi}</p>
                <p><code>Name:</code> {data.patient?.patHeading.name}</p>
                <p><code>DOB:</code> {data.patient?.patHeading.dob}</p>
                <p><code>Age:</code> {data.patient?.patHeading.age}</p>
                <p><code>Sex:</code> {data.patient?.patHeading.sex}</p>
                <p><code>Address:</code> {@html data.patient?.patHeading.address}</p>
            </div>
            {/await}
        </section>
        <section class="container">
            <form on:submit|preventDefault={handleSubmit}>
                <header>
                    <h2>Create a service request</h2>
                </header>

                <!-- Service Category-->
                <label for="serviceType">Service Category</label>
                <select id="serviceType" bind:value={selectedServiceType}>
                    {#each data.categories as serviceType}
                    <option value={serviceType.code}>{serviceType.display}</option>
                    {/each}
                </select>
 
                <!-- ServiceRequest.code-->                  
                <label for="serviceCode">Test Name</label>
                <input type="text" id="serviceCode" name="serviceCode" size="20" placeholder="Test name">   

                <!-- ServiceRequest.bodySite for demo purposes - remove if not radiology -->        
                <label for="bodySite">Body Site:</label>
                <input type="text" id="bodySite" name="bodySite" size="20" placeholder="Body site">  
               
                <!-- Free text description of the test-->         
                <label for="requestFreeText">Notes:</label>
                <textarea cols="40" rows="3" id="requestFreeText"></textarea>
                <button type="submit">Create</button>
            </form>
        </section>

        </article>
    </main>