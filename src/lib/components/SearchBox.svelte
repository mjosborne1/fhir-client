<script lang="ts">
	import { createSearchStore, searchHandler } from '$lib/stores/search';
	import { onDestroy } from 'svelte';
	import type { SearchBoxProps as SearchBoxProps  } from '$lib/types/searchbox';
	import { parseJsonValueSet ,
		     extractConceptsFromValueSet,  
			 buildSearchParams,
		    extractError } from '$lib/api/api-terminology'
    import type { URLSearchParams } from 'url';
    import type { Concept, ConceptSearchResult } from '$lib/types/concept-type';
 // import { validateHeaderValue } from 'http';
    import Badge from '$lib/components/Badge.svelte';

	export let searchBoxProps : SearchBoxProps;
	export let data:ConceptSearchResult = {concepts:[],total:0}; 
    let selected:Concept[] = [];

    
	let timer: NodeJS.Timeout;
	let searchTerm = '';

	async function fetchData(searchTerm:string) {
		let query:URLSearchParams = buildSearchParams(	
						searchBoxProps.apiECLQuery,	 				 		                 
						 searchTerm,
						 10);
		const endpoint = searchBoxProps.apiEndpoint;
		
		const response = await fetch(`${endpoint}/ValueSet/$expand?${query.toString()}`);

		if (!response.ok) {			
			throw await extractError(response);			
		}
		const valueSet = await parseJsonValueSet(response);
		
  		data = extractConceptsFromValueSet(valueSet);
	}


	function handleSearch(e: Event) {
		clearTimeout(timer);
		timer = setTimeout(() => {
			const target = e.target as HTMLInputElement;
			searchTerm = target.value;
			fetchData(searchTerm);
		}, 250);
		searchBoxProps.loadingState = 'loaded';	
	}

	function addSelected(value:Concept) {
		selected.push(value);
		selected = selected;
	}

	function handleBadgeClose(event: MouseEvent,  value:Concept) {
		event.preventDefault(); // Prevent default action
        selected = selected.filter(i => i.id !== value.id);
		console.log('Badge closed', event)
	} 

	function handleSelection(value:Concept) {
		console.log(value.id+","+value.display);
		searchBoxProps.valueId = value.id ?? '';
		searchBoxProps.valueDisplay = value.display ?? '';
		data  = {concepts:[{id: value.id, display: value.display}],total:1}; 
		addSelected(value);
		data = {concepts:[]};
		searchTerm = '';
	}

	/* Work-around for Typescript bug on:search in input */
	const notypecheck = (x: any) => x;

</script>
<div class="container">
	<label for={searchBoxProps.formId}>{searchBoxProps.label}</label> 
	<input type="search"
	       {...notypecheck({})}
		   id={searchBoxProps.formId} 
		   name={searchBoxProps.fieldName}
		   size={searchBoxProps.fieldSize} 
		   placeholder={searchBoxProps.heading}
		   on:keyup={handleSearch}
		   on:search={handleSearch}		   
		   data-sveltekit-preload-data={searchBoxProps.preloadBehavior}
		   data-sveltekit-preload-code={searchBoxProps.preloadBehavior}/> 
	<div class="container">
		{#if searchBoxProps.loadingState === "loading"}
			<div aria-busy="true">Please wait...</div>
		{:else if searchBoxProps.loadingState === "error" }
			<div aria-invalid="true">Error loading data.</div>
		{:else if searchBoxProps.loadingState === "loaded"}		
		 <div>		    
			 <table role="grid">				 				
				 {#each data.concepts as value}
				    <tr on:click={() => handleSelection(value)}><td>{value.id}</td><td>{value.display}</td></tr>				
				 {/each}
			</table>				
		</div>  
		<section>
			{#if selected && selected.length > 0} 
				{#each selected as value}
					<Badge labelText={value.display} onClose={(event) => handleBadgeClose(event, value)}></Badge>
					&nbsp;
				{/each}				
			{/if}
		</section>
		{/if}
	</div>
	<input type="hidden" id={searchBoxProps.formValueId}  name={searchBoxProps.formValueId} value={searchBoxProps.valueId}>
	<input type="hidden" id={searchBoxProps.formDisplayId} name={searchBoxProps.formDisplayId} value={searchBoxProps.valueDisplay}>

</div>
<style>

	.terms-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
		grid-gap: 1rem;
	}
	.spacer {
		display: flex;
		margin-left: 2em;
	}

</style>
