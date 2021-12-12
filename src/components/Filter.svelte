<script>
	import annonceServices from '../services/annonceServices';
	import { onMount } from 'svelte';
	import {
		selectedCategorie,
		selectedCampus,
		selectedMaxPrice,
		selectedMinPrice,
		sort
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
	let annoncesByCampus = [];
	const fetchAnnoncesByCampus = async () => {
		const resp = await annonceServices.findAllByCampus(selectedCamp.campus);
		annoncesByCampus = resp;
		selectedCampus.setSelected(annoncesByCampus);
	};

	function handleChangeCat() {
		selectedCategorie.setSelected(selectedCat);
	}
	function handleChangeCamp() {
		fetchAnnoncesByCampus();
	}
	function handleChangeMinPrice() {
		selectedMinPrice.setSelected(selectedMin);
	}
	function handleChangeMaxPrice() {
		selectedMaxPrice.setSelected(selectedMax);
	}
	function handleResetFilter() {
		selectedCategorie.reset();
		selectedCampus.reset();
		selectedMinPrice.reset();
		selectedMaxPrice.reset();
		sort.reset();
	}
	let campus = [
		{ id: -1, campus: ``, value: `` },
		{ id: 1, campus: `Ixelles`, value: `Ixelles` },
		{ id: 2, campus: `Louvain-la-Neuve`, value: `Louvain-la-Neuve` },
		{ id: 3, campus: `Woluwe-Saint-Lambert`, value: `Woluwe-Saint-Lambert` }
	];
	let dropdown = false;
	let selectedButton = 'default';
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
			<input
				id="min"
				class="input"
				bind:value={selectedMin}
				on:change={handleChangeMinPrice}
				type="number"
				step="0.01"
				placeholder="Prix min"
			/>
		</div>
		<label class="label">Max</label>
		<div class="control">
			<input
				id="max"
				class="input"
				bind:value={selectedMax}
				on:change={handleChangeMaxPrice}
				type="number"
				step="0.01"
				placeholder="Prix max"
			/>
		</div>
	</a>

	<div class="panel-block">
		<button class="button is-info is-fullwidth" on:click={handleResetFilter}> Reset </button>
		<button class="button is-primary is-fullwidth">
			Rechercher</button
		>
		<div class={dropdown ? 'dropdown is-right is-active' : 'dropdown is-right'}>
			<div class="dropdown-trigger">
				<button
					class="button"
					aria-haspopup="true"
					aria-controls="dropdown-menu"
					on:click={() => (dropdown = !dropdown)}
				>
					<span>Trier</span>
					<span class="icon is-small">
						<i class="fas fa-angle-down" aria-hidden="true" />
					</span>
				</button>
			</div>
			<div class="dropdown-menu" id="dropdown-menu" role="menu">
				<div class="dropdown-content">
					<a
						href="#"
						class="dropdown-item"
						id="prixCroissant"
						on:click={(e) => {
							sort.setSort(e.id);
						}}
					>
						Prix Croissant
					</a>
					<a
						class="dropdown-item"
						id="prixDecroissant"
						on:click={(e) => {
							sort.setSort(e.id);
						}}
					>
						Prix Decroissant
					</a>
					<hr class="dropdown-divider" />
					<a
						href="#"
						class="dropdown-item"
						id="titreAZ"
						on:click={(e) => {
							sort.setSort(e.id);
						}}
					>
						A -> Z
					</a>
					<a
						href="#"
						class="dropdown-item"
						id="titreZA"
						on:click={(e) => {
							sort.setSort(e.id);
						}}
					>
						Z -> A
					</a>
				</div>
			</div>
		</div>
	</div>
</nav>

<style>
	.panel-block {
		margin: auto;
		height: auto;
		font-size: 14px;
		font-weight: bolder;
	}
	#min {
	}
	#max {
	}
</style>
