<script lang="ts">
    export let labelText = '';
    export let onClose: (event: MouseEvent) => void;


</script>

<div class="badge">   
    <button type="button" aria-label="Close" class="button" on:click={onClose}> {labelText} &times;</button>   
</div>

<style>
    .badge {
        display: inline-block;
        padding: 0.1em 0.1em;
        margin: 0.5em;
        background-color: white;
        color: black;
        border-radius: 1em;
        font-size: 1em;
        position: relative;
        white-space: normal; /* Allow text to wrap */
        max-width: 100%; /* Ensure badge doesn't overflow container */
        word-wrap: break-word; /* Break long words */
    }

</style>