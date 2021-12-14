<script>
	import annonceServices from '../services/annonceServices';
	import AnnonceList from './AnnonceList.svelte';
	import { annonces, filteredAnnonces } from '../utils/stores.js';
	import { onMount } from 'svelte';
	let categories = [];
	let highCategories = [];
	let subCategories = [];
	let selectedCat = null;
	let selectedCamp = null;
	let selectedMin = -1;
	let selectedMax = -1;
	let sort = 'default';
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
		highCategories = categories.filter((e) => e.sur_categorie_id == null);
		subCategories = categories.filter((e) => e.sur_categorie_id != null);
		const resp = await annonceServices.findAllAnnonce();
		$annonces = resp.filter((a) => a.etat != 'A' && a.etat != 'T' && a.etat != 'E');
		console.log($annonces);
		$filteredAnnonces = $annonces;
	});

	const fetchAnnoncesByCampus = async () => {
		const resp = await annonceServices.findAllByCampus(selectedCamp.campus);
		annoncesByCampus = resp;
		$filteredAnnonces = annoncesByCampus;
	};

	function handleChange(e) {
		$filteredAnnonces = $annonces;

		if (e.target.id == 'min') {
			selectedMin = e.target.value;
		}
		if (e.target.id == 'max') {
			selectedMax = e.target.value;
		}
		if (e.target.id == 'prixCroissant') {
			sort = 'prixCroissant';
			dropdown = !dropdown;
		}
		if (e.target.id == 'prixDecroissant') {
			sort = 'prixDecroissant';
			dropdown = !dropdown;
		}
		if (e.target.id == 'titreAZ') {
			sort = 'titreAZ';
			dropdown = !dropdown;
		}
		if (e.target.id == 'titreZA') {
			sort = 'titreZA';
			dropdown = !dropdown;
		}

		if (selectedCamp) {
			fetchAnnoncesByCampus();
		}
		if (selectedCat) {
			let vals = $filteredAnnonces.filter((a) => a.categorie_id === selectedCat.id);
			$filteredAnnonces = vals;
		}
		if (selectedMin != -1) {
			let vals = $filteredAnnonces.filter((a) => a.prix >= selectedMin);
			$filteredAnnonces = vals;
		}
		if (selectedMax != -1) {
			let vals = $filteredAnnonces.filter((a) => a.prix <= selectedMax);
			$filteredAnnonces = vals;
		}
		if (sort != 'default') {
			if (sort == 'prixCroissant') {
				$filteredAnnonces.sort(function (a, b) {
					return a.prix - b.prix;
				});
			}
			if (sort == 'prixDecroissant') {
				$filteredAnnonces.sort(function (a, b) {
					return b.prix - a.prix;
				});
			}
			if (sort == 'titreAZ') {
				$filteredAnnonces.sort(function (a, b) {
					if (a.titre < b.titre) return -1;
				});
			}
			if (sort == 'titreZA') {
				$filteredAnnonces.sort(function (a, b) {
					if (a.titre > b.titre) return -1;
				});
			}
		}
	}

	function handleResetFilter() {
		$filteredAnnonces = $annonces;
		selectedCat = null;
		selectedCamp = null;
		selectedMin = -1;
		selectedMax = -1;
		sort = 'default';
	}

	let dropdown = false;
</script>

<nav class="panel">
	<a class="panel-block">
		<label class="label">Catégorie </label>
		<div class="select">
			<select bind:value={selectedCat} on:input={handleChange}>
				{#each highCategories as hCategorie}
					<optgroup label={hCategorie.nom}>
						{#each subCategories as sCategorie}
							{#if hCategorie.id == sCategorie.sur_categorie_id}
								<option  value={sCategorie}>
									{sCategorie.nom}
								</option>
							{/if}
						{/each}
					</optgroup>
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
			<input id="min" class="input" on:input={handleChange} type="number" step="0.01" min="0" />
		</div>
		<label class="label">Max</label>
		<div class="control">
			<input id="max" class="input" on:input={handleChange} type="number" step="0.01" min="0" />
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
				<div class="dropdown-content" on:click={handleChange}>
					<a href="#" class="dropdown-item" id="prixCroissant"> Prix Croissant </a>
					<a class="dropdown-item" id="prixDecroissant"> Prix Decroissant </a>
					<hr class="dropdown-divider" />
					<a href="#" class="dropdown-item" id="titreAZ"> A -> Z </a>
					<a href="#" class="dropdown-item" id="titreZA"> Z -> A </a>
				</div>
			</div>
		</div>
	</div>
</nav>
<AnnonceList annonces={$filteredAnnonces} />

<style>
	.panel-block {
		margin: auto;
		height: auto;
		font-size: 14px;
		font-weight: bolder;
	}
</style>
