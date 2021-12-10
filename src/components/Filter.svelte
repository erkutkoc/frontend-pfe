<script>
	import annonceServices from '../services/annonceServices';
	import { onMount } from 'svelte';
	import {selectedCategorie, selectedCampus, selectedMaxPrice, selectedMinPrice} from '../utils/filterProperties.js';
	let categories = [];
	onMount(async () => {
		const res = await annonceServices.findAllCategorie();
		categories = res;
	});
	let selectedCat;
	let selectedCamp;
	function handleChangeCat(){
		selectedCategorie.setSelected(selectedCat)
		selectedCamp = {};
	}	
	function handleChangeCamp(){
		selectedCampus.setSelected(selectedCamp)
		selectedCat = {};
	}
	let campus = [
		{id : -1 ,campus : ``, value :``},
		{ id: 1, campus: `Ixelles`, value:`Ixelles` },
		{ id: 2, campus: `Louvain-la-Neuve`, value: `Louvain-la-Neuve` },
		{ id: 3, campus: `Woluwe`, value:`Woluwe` },
	];
</script>


<aside class="column is-2 is-narrow-mobile is-fullheight section is-hidden-mobile">
	<div class="field">
			<label class="label">Categorie</label>
			<div class="select">
				<select bind:value={selectedCat} on:change={handleChangeCat}>
					{#each categories as categorie}
					<option value={categorie}>
						{categorie.nom}
					</option>
					{/each}
				</select>
			</div>
		</div>

		<div class="field">
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
		</div>

		<div class="">
			<div class="field">
				<label class="label">Min</label>
				<div class="control">
					<input class="input" type="min" placeholder="Prix min" />
				</div>
			</div>
		</div>
		<div class="">
			<div class="field">
				<label class="label">Max</label>
				<div class="control">
					<input class="input" type="max" placeholder="Prix max" />
				</div>
			</div>
		</div>
		<div>
			<div class="field ">
				<div class="control">
					<button class="button is-primary">Rechercher</button>
				</div>
			</div>
		</div>
</aside>
