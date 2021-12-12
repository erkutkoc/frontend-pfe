<script>
	import AnnonceServices from '../services/annonceServices.js';
	import Annonce from './Annonce.svelte';
	import {
		selectedCategorie,
		selectedMaxPrice,
		selectedMinPrice,
		selectedCampus,
		sort
	} from '../utils/filterProperties.js';
	import { onMount } from 'svelte';
	let data = [];
	onMount(async () => {
		const res = await AnnonceServices.findAllAnnonce();
		data = res;
	});
</script>

{#if $selectedCategorie == null && $selectedMinPrice == -1 && $selectedMaxPrice == -1 && $selectedCampus == null}
	<!--Annonce-->
	<div class="columns is-desktop is-multiline ">
		{#each data as annonce (annonce.id)}
			{#if annonce.etat != 'A' && annonce.etat != 'E'}
				<Annonce {annonce} />
			{/if}
		{/each}
	</div>

	<br />
{/if}
