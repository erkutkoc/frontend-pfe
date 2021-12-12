<script>
	import annonceServices from '../services/annonceServices';
	import AnnonceList from './AnnonceList.svelte';

	import { onMount } from 'svelte';
	let sort;
	let categories = [];
	let allAnnonces = [];
	let annoncesFiltered = [];
	let selectedCat = null;
	let selectedCamp = null;
	let selectedMin = -1;
	let selectedMax = -1;
	let annoncesByCampus = [];
	let campus = [
		{ id: -1, campus: ``, value: `` },
		{ id: 1, campus: `Ixelles`, value: `Ixelles` },
		{ id: 2, campus: `Louvain-la-Neuve`, value: `Louvain-la-Neuve` },
		{ id: 3, campus: `Woluwe-Saint-Lambert`, value: `Woluwe-Saint-Lambert` }
	];
	onMount(async () => {
		const res = await annonceServices.findAllCategorie();
		categories = res;
		const resp = await annonceServices.findAllAnnonce();
		//let filtered = resp;
		//allAnnonces = filtered.filter(a => a.etat != 'A' && a.etat != 'E');
		allAnnonces = resp;
		annoncesFiltered = allAnnonces;
	});


	const fetchAnnoncesByCampus = async () => {
		const resp = await annonceServices.findAllByCampus(selectedCamp.campus);
		annoncesByCampus = resp;
		annoncesFiltered = annoncesByCampus;
	};

	function handleChange(e) {
		if(e.target.id == "min"){
			selectedMin = e.target.value;
		}
		if(e.target.id == "max"){
			selectedMax = e.target.value;
		}
		//reset annoncesFiltered
		annoncesFiltered = allAnnonces;
		if(selectedCamp){
			fetchAnnoncesByCampus();
		}
		if(selectedCat){
			let vals = annoncesFiltered.filter(a => a.categorie_id === selectedCat.id);
			annoncesFiltered = vals;
		}
		if(selectedMin != -1){
			console.log('dansa le min')
			console.log(selectedMin)
			let vals = annoncesFiltered.filter(a => a.prix >= selectedMin);
			annoncesFiltered = vals;
		}
		if(selectedMax != -1){
			console.log('dansa le mnax')
			let vals = annoncesFiltered.filter(a => a.prix <= selectedMax);
			annoncesFiltered = vals;
		}
	}

	function handleResetFilter() {
		annoncesFiltered = allAnnonces;
		selectedCat = null;
		selectedCamp = null;
		selectedMin = -1;
		selectedMax = -1;
	}

	let dropdown = false;
</script>

<nav class="panel">
	<a class="panel-block">
		<label class="label">Catégorie </label>
		<div class="select">
			<select bind:value={selectedCat} on:input={handleChange}>
				{#each categories as categorie}
					<option value={categorie}>
						{categorie.nom}
					</option>
				{/each}
			</select>
		</div>
		<label class="label">Campus</label>
		<div class="select">
			<select bind:value={selectedCamp} on:input={handleChange}>
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

				on:input={handleChange}
				type="number"
				step="0.01"
				min="0"
				
			/>
		</div>
		<label class="label">Max</label>
		<div class="control">
			<input
				id="max"
				class="input"

				on:input={handleChange}
				type="number"
				step="0.01"
				min="0"
				
			/>
		</div>
	</a>

	<div class="panel-block">
		<button class="button is-info" on:click={handleResetFilter}> Reset </button>

		<div class={dropdown ? 'dropdown is-left is-active' : 'dropdown is-left'}>
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
<AnnonceList
	data={annoncesFiltered}
/>

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
