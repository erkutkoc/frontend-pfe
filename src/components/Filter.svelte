<script>
	import annonceServices from '../services/annonceServices';
	import { onMount } from 'svelte';
	import {
		selectedCategorie,
		selectedCampus,
		selectedMaxPrice,
		selectedMinPrice
	} from '../utils/filterProperties.js';
	let categories = [];
	onMount(async () => {
		const res = await annonceServices.findAllCategorie();
		categories = res;
	});
	let selectedCat;
	let selectedCamp;
	let selectedMin;
	let selectedMax;
	function handleChangeCat() {
		selectedCategorie.setSelected(selectedCat);
	}
	function handleChangeCamp() {
		selectedCampus.setSelected(selectedCamp);
	}
	function handleChangeMinPrice(){
		selectedMinPrice.setSelected(selectedMin);
	}
	function handleChangeMaxPrice(){
		selectedMaxPrice.setSelected(selectedMax);
	}
	let campus = [
		{ id: -1, campus: ``, value: `` },
		{ id: 1, campus: `Ixelles`, value: `Ixelles` },
		{ id: 2, campus: `Louvain-la-Neuve`, value: `Louvain-la-Neuve` },
		{ id: 3, campus: `Woluwe`, value: `Woluwe` }
	];
</script>

<nav class="panel">
	<p class="panel-heading has-background-info has-text-white">Recherche par filtre</p>
	<a class="panel-block">
		<label class="label">Catégorie </label>
		<div class="select">
			<select bind:value={selectedCat} on:change={handleChangeCat}>
				{#each categories as categorie}
					<option value={categorie}>
						{categorie.nom}
					</option>
				{/each}
			</select>
		</div>
		<label class="label">Campus</label>
		<div class="select">
			<select bind:value={selectedCamp} on:change={handleChangeCamp}>
				{#each campus as camp}
					<option value={camp}>
						{camp.campus}
					</option>
				{/each}
			</select>
		</div>
		<label class="label">Min</label>
		<div class="control">
			<input id="min" class="input" bind:value={selectedMin} on:change|preventDefault={handleChangeMinPrice} type="number" step="0.01" placeholder="Prix min" />
		</div>
		<label class="label">Max</label>
		<div class="control">
			<input id="max" class="input" bind:value={selectedMax}  on:change|preventDefault={handleChangeMaxPrice} type="number" step="0.01" placeholder="Prix max" />
		</div>
	</a>

	<div class="panel-block">
		<button class="button is-link is-outlined is-fullwidth"> Reset </button>
		<button class="button is-primary is-outlined is-fullwidth"> Rechercher</button>
	</div>
</nav>
<style>
	.panel-block{
		margin:auto;
		height: auto;
		font-size: 12px;
	}
	#min{

	}
	#max{

	}
</style>