<script lang="ts">

    // Sveltekit packages
   import { base, assets } from '$app/paths';
    
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
   <section class="container">           
        <header>
            <h2>Create a service request</h2>
        </header>
        <article>
            <div class="container">
                <a href="./precoord">Pre-coordinated Pathology and Radiology requests</a>
            </div>
            <br>
            <div class="container">
                <a href="./postcoord">Post-coordinated to single concept radiology requests</a>
            </div>
            <br>
            <div class="container">
                <a href="./pce">Post-coordinated expression radiology requests</a>
            </div>
        </article>
    </section>
</main>

   