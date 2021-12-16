<script>
	import annonceServices from '../services/annonceServices';
	import LoadingAnimation from './LoadingAnimation.svelte';
	import Annonce from './Annonce.svelte';
	import { annonces, filteredAnnonces, annoncesByCampus } from '../utils/stores.js';
	import { onMount } from 'svelte';
	import { FontAwesomeIcon } from 'fontawesome-svelte';
	let categories = [];
	let highCategories = [];
	let subCategories = [];
	let selectedCat = null;
	let selectedCamp = null;
	let selectedMin = -1;
	let selectedMax = -1;
	let sort = 'default';
	let isLoading = true;
	let inputSearch = null;
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
	/* Fonctionnalité future : non fonctionnel
	 */
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
		if (inputSearch) {
			$filteredAnnonces = $filteredAnnonces.filter((a) => a.titre.toLowerCase().startsWith(inputSearch.toLowerCase()));
		}
		//Fonctionnalité future
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
		inputSearch = null;
	}

	let dropdown = false;
</script>

<div>
	<div class="panel-block">
		<label class="label">Titre </label>
		<input
			class="input is-info custom-search"
			type="text"
			bind:value={inputSearch}
			on:input={handleChange}
		/>

		<label class="label">Catégorie </label>
		<div class="select">
			<select class="custom-search" bind:value={selectedCat} on:click={handleChange}>
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
		<input
			id="min"
			class="input custom-search"
			on:input={handleChange}
			type="number"
			step="0.01"
			min="0"
		/>
		<label class="label">Max</label>
		<input
			id="max"
			class="input custom-search"
			on:input={handleChange}
			type="number"
			step="0.01"
			min="0"
		/>
		<label class="label">Campus</label>
		<div class="select" style="margin:auto">
			<select class="custom-search" bind:value={selectedCamp} on:click={handleChange} disabled>
				{#each campus as camp}
					<option value={camp}>
						{camp.campus}
					</option>
				{/each}
			</select>
			<p class="has-text-link" style="text-align:center; margin:auto">Future fonctionnalité</p>
		</div>

		<div
			class={dropdown
				? 'dropdown is-left is-active custom-search'
				: 'dropdown is-left custom-search'}
		>
			<div class="dropdown-trigger">
				<button
					class="button custom-search"
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
			<div class="dropdown-menu custom-search" id="dropdown-menu" role="menu">
				<div class="dropdown-content" on:click={handleChange}>
					<a href="#" class="dropdown-item" id="prixCroissant"> Prix Croissant </a>
					<a class="dropdown-item" id="prixDecroissant"> Prix Decroissant </a>
					<hr class="dropdown-divider" />
					<a href="#" class="dropdown-item" id="titreAZ"> A -> Z </a>
					<a href="#" class="dropdown-item" id="titreZA"> Z -> A </a>
				</div>
			</div>
		</div>
		<button class="button is-info custom-search" on:click={handleResetFilter}>
			Réinitialiser
		</button>
	</div>
	<div class="section" id="homeMsg">
			<blockquote>
				Nous avons tous des trésors enfouis au fond de notre grenier ou de nos placards. Trésors qui
				profiteraient à d’autres. Valorisons-les en leur donnant une seconde vie. <FontAwesomeIcon
					icon={["far","smile-wink"]}
				/>
			</blockquote>
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
	.custom-search {
		max-width: 500px;
		width: auto;
		min-width: 200px;
		margin: auto;
	}
	.label {
		margin: auto;
	}
	.panel-block {
		margin: auto;
		height: auto;
		font-size: 14px;
		font-weight: bolder;
	}
	blockquote {
		text-align: center;
		background: rgb(72, 64, 203);
		background: linear-gradient(
			90deg,
			rgba(72, 64, 203, 0.32816876750700286) 0%,
			rgba(0, 212, 255, 1) 100%
		);
		font-style: italic;
		font-size: medium;
		font-weight: bold;
		border: solid;
		border-width: 0;
		border-radius: 10px;
		color: rgb(6, 108, 192);
		margin:auto;
		padding:auto;
	} 
	#homeMsg{
		margin:auto;
		padding:auto;
	}
</style>
