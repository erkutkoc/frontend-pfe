<script>
	import annonceServices from '../services/annonceServices';
	import LoadingAnimation from './LoadingAnimation.svelte';
	//import AnnonceList from './AnnonceList.svelte';
	import Annonce from './Annonce.svelte';
	import { annonces, filteredAnnonces, annoncesByCampus } from '../utils/stores.js';
	import { onMount } from 'svelte';
	let categories = [];
	let highCategories = [];
	let subCategories = [];
	let selectedCat = null;
	let selectedCamp = null;
	let selectedMin = -1;
	let selectedMax = -1;
	let sort = 'default';
	let isLoading = true;
	let notifMsg, colorNotif;
	let snackbar = false;
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
		try {
			const resp = await annonceServices.findAllAnnonce().then((r) => {
				isLoading = false;
				return r;
			});
			$annonces = resp.filter((a) => a.etat != 'A' && a.etat != 'T' && a.etat != 'E');
			$filteredAnnonces = $annonces;
		} catch (error) {
			notifMsg = result.data;
			colorNotif = 'red';
			snackbar = true;
			return;
		}
	});
	const fetchAnnoncesByCampus = async () => {
		const resp = await annonceServices.findAllByCampus(selectedCamp.campus);
		let temp = resp;

		$annoncesByCampus = temp;

		$filteredAnnonces = $annoncesByCampus;
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
		} else if (e.target.id == 'prixDecroissant') {
			sort = 'prixDecroissant';
			dropdown = !dropdown;
		} else if (e.target.id == 'titreAZ') {
			sort = 'titreAZ';
			dropdown = !dropdown;
		} else if (e.target.id == 'titreZA') {
			sort = 'titreZA';
			dropdown = !dropdown;
		}

		/*if (selectedCamp) {
			fetchAnnoncesByCampus();
		}*/
		if (selectedCat) {
			$filteredAnnonces = $filteredAnnonces.filter((a) => a.categorie_id === selectedCat.id);
		}
		if (selectedMin != -1) {
			$filteredAnnonces = $filteredAnnonces.filter((a) => a.prix >= selectedMin);
		}
		if (selectedMax != -1) {
			$filteredAnnonces = $filteredAnnonces.filter((a) => a.prix <= selectedMax);
		}
		if (sort != 'default') {
			if (sort == 'prixCroissant') {
				$filteredAnnonces = $filteredAnnonces.sort(function (a, b) {
					return a.prix - b.prix;
				});
			} else if (sort == 'prixDecroissant') {
				$filteredAnnonces = $filteredAnnonces.sort(function (a, b) {
					return b.prix - a.prix;
				});
			} else if (sort == 'titreAZ') {
				$filteredAnnonces = $filteredAnnonces.sort(function (a, b) {
					if (a.titre < b.titre) return -1;
				});
			} else if (sort == 'titreZA') {
				$filteredAnnonces = $filteredAnnonces.sort(function (a, b) {
					if (a.titre > b.titre) return -1;
				});
			}
		}
	}

	function handleResetFilter() {
		$filteredAnnonces = $annonces;
		selectedCat = null;
		selectedCamp = null;
		document.getElementById('min').value = '';
		document.getElementById('max').value = '';
		sort = 'default';
	}

	let dropdown = false;
</script>

<div>
	<div class="panel-block">
		<label class="label">Catégorie </label>
		<div class="select">
			<select bind:value={selectedCat} on:click={handleChange}>
				{#each highCategories as hCategorie}
					<optgroup label={hCategorie.nom}>
						{#each subCategories as sCategorie}
							{#if hCategorie.id == sCategorie.sur_categorie_id}
								<option value={sCategorie}>
									{sCategorie.nom}
								</option>
							{/if}
						{/each}
					</optgroup>
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
		<label class="label">Campus</label>
		<div class="select">
			<select bind:value={selectedCamp} on:click={handleChange} disabled>
				{#each campus as camp}
					<option value={camp}>
						{camp.campus}
					</option>
				{/each}
			</select>
			<p class="has-text-link" style="text-align:center;">Future fonctionnalité</p>
		</div>
	</div>
</div>

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
{#if !isLoading}
	<div class="container column is-10">
		<div class="section">
			<!--Annonce-->
			<div class="columns is-desktop is-multiline ">
				{#each $filteredAnnonces as annonce (annonce.id)}
					<Annonce {annonce} />
				{/each}
			</div>
		</div>
	</div>
{:else}
	<LoadingAnimation />
{/if}

<style>
	.panel-block {
		margin: auto;
		height: auto;
		font-size: 14px;
		font-weight: bolder;
	}
</style>
