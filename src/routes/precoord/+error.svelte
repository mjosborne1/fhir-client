<script>
	import { page } from '$app/stores';
</script>
<section class="container">
    <h1>{$page.status ?? 404}</h1>
    <p>{$page.error?.message ?? 'Unable to load patient from fhir server, is the server available?'}</p>
    <p>{$page.error?.details ?? ""}</p>
</section>