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
			<Annonce {annonce} />
		{/each}
	</div>

	<br />
{:else if $selectedCampus != null}
	<!--Annonce-->
	<div class="columns is-desktop is-multiline ">
		{#each $selectedCampus as annonce (annonce.id)}
			{#if $selectedCategorie != null && $selectedMaxPrice != -1 && $selectedMinPrice != -1}
				<!-- min  && max && categorie-->
				{#if annonce.categorie_id == $selectedCategorie.id && annonce.prix <= $selectedMaxPrice && annonce.prix >= $selectedMinPrice}
					<Annonce {annonce} />
				{/if}
			{:else if $selectedCategorie != null && $selectedMaxPrice != -1 && $selectedMinPrice == -1}
				<!-- max  && categorie-->
				{#if annonce.categorie_id == $selectedCategorie.id && annonce.prix <= $selectedMaxPrice};
					<Annonce {annonce} />
				{/if}
			{:else if $selectedCategorie != null && $selectedMaxPrice == -1 && $selectedMinPrice != -1}
				<!-- min  && categorie-->
				{#if annonce.categorie_id == $selectedCategorie.id && annonce.prix >= $selectedMinPrice}
					<Annonce {annonce} />
				{/if}
			{:else if $selectedMaxPrice != -1 && $selectedMinPrice != -1 && $selectedCategorie == null}
				<!-- min &&  max -->
				{#if annonce.prix <= $selectedMaxPrice && annonce.prix >= $selectedMinPrice}
					<Annonce {annonce} />
				{/if}
			{:else if $selectedCategorie != null && $selectedMaxPrice == -1 && $selectedMinPrice == -1}
				<!-- categorie-->
				{#if annonce.categorie_id == $selectedCategorie.id}
					<Annonce {annonce} />
				{/if}
			{:else if $selectedMinPrice != -1 && $selectedCategorie == null && $selectedMaxPrice == -1}
				<!-- Min-->
				{#if annonce.prix >= $selectedMinPrice}
					<Annonce {annonce} />{/if}
			{:else if $selectedMaxPrice != -1 && $selectedMinPrice == -1 && $selectedCategorie == null}
				<!--  Max-->
				{#if annonce.prix <= $selectedMaxPrice}
					<Annonce {annonce} />
				{/if}
			{:else}
				<Annonce {annonce} />
			{/if}
		{/each}
	</div>
{:else}
	<!--Annonce-->
	<div class="columns is-desktop is-multiline ">
		{#each data as annonce (annonce.id)}
			{#if $selectedCategorie != null && $selectedMaxPrice != -1 && $selectedMinPrice != -1}
				<!-- min  && max && categorie-->
				{#if annonce.categorie_id == $selectedCategorie.id && annonce.prix <= $selectedMaxPrice && annonce.prix >= $selectedMinPrice}
					<Annonce {annonce} />
				{/if}
			{:else if $selectedCategorie != null && $selectedMaxPrice != -1 && $selectedMinPrice == -1}
				<!-- max  && categorie-->
				{#if annonce.categorie_id == $selectedCategorie.id && annonce.prix <= $selectedMaxPrice};
					<Annonce {annonce} />
				{/if}
			{:else if $selectedCategorie != null && $selectedMaxPrice == -1 && $selectedMinPrice != -1}
				<!-- min  && categorie-->
				{#if annonce.categorie_id == $selectedCategorie.id && annonce.prix >= $selectedMinPrice}
					<Annonce {annonce} />
				{/if}
			{:else if $selectedMaxPrice != -1 && $selectedMinPrice != -1 && $selectedCategorie == null}
				<!-- min &&  max -->
				{#if annonce.prix <= $selectedMaxPrice && annonce.prix >= $selectedMinPrice}
					<Annonce {annonce} />
				{/if}
			{:else if $selectedCategorie != null && $selectedMaxPrice == -1 && $selectedMinPrice == -1}
				<!-- categorie-->
				{#if annonce.categorie_id == $selectedCategorie.id}
					<Annonce {annonce} />
				{/if}
			{:else if $selectedMinPrice != -1 && $selectedCategorie == null && $selectedMaxPrice == -1}
				<!-- Min-->
				{#if annonce.prix >= $selectedMinPrice}
					<Annonce {annonce} />{/if}
			{:else if $selectedMaxPrice != -1 && $selectedMinPrice == -1 && $selectedCategorie == null}
				<!--  Max-->
				{#if annonce.prix <= $selectedMaxPrice}
					<Annonce {annonce} />
				{/if}
			{/if}
		{/each}
	</div>
{/if}
