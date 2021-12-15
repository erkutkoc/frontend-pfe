<script>
	import { FontAwesomeIcon } from 'fontawesome-svelte';
	export let annonce;
</script>

{#if annonce.etat === 'E'}
	<span style="color:hsl(217, 71%, 53%) ;font-weight:bold"> Annonce en attente attente</span>

	<a style="color:hsl(217, 71%, 53%)"><FontAwesomeIcon icon="pause-circle" /></a>
{:else if annonce.etat === 'V'}
	<span class=" has-text-primary-dark" style="font-weight:bold"> Annonce validée</span>
	<a class="has-text-primary-dark"><FontAwesomeIcon icon="check-circle" /></a>
{:else if annonce.etat === 'T'}
	<span class="" style="hsl(0, 0%, 29%) ;font-weight:bold"> Annonce vendu</span>
	<a style="hsl(0, 0%, 29%)"><FontAwesomeIcon icon="times-circle" /></a>
{:else if annonce.etat === 'R'}
	<span style="color:#F98A0C ; font-weight:bold"> Annonce réservée</span>
	<a style="color:#F98A0C"><FontAwesomeIcon icon="minus-circle" /></a>
{:else if annonce.etat === 'A'}
	<span class="has-text-danger-dark" style=" ; font-weight:bold"> Annonce supprimer</span>
	<a class="has-text-danger-dark"><FontAwesomeIcon icon="times-circle" /></a>
{/if}
