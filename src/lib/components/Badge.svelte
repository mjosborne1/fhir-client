<script lang="ts">
    export let labelText = '';
    export let onClose: (event: MouseEvent) => void;


</script>


    <a href="/" aria-label="Close" role="button" on:click={onClose}> {labelText} &times;</a>   

