<script>
	import Navbar from '../../components/Navbar.svelte';
	import AnnonceServices from '../../services/annonceServices';
	import { onMount } from 'svelte';
	import ErrorPage from '../../components/ErrorPage.svelte';
	import LoadingAnimation from '../../components/LoadingAnimation.svelte';
	import { Snackbar, Button } from 'svelte-materialify';
	import { goto } from '$app/navigation';
	import { currentAnnonce } from '../../utils/stores';

	let snackbar = false;
	let notifMsg, colorNotif;
	let currentUser, allCampus;
	let oldCat = $currentAnnonce.categorie_nom;
	let selectedGenre, selectedCat;
	let selectedCampus = [];
	let allCategories = [];
	let isLoading = false;
	let dataContainer;

	onMount(async () => {
		currentUser = JSON.parse(sessionStorage.getItem('user'));
		if (!currentUser) return;

		const fetchAllCampus = await AnnonceServices.getAllCampus();
		allCampus = fetchAllCampus.data;
		selectedCampus.push(Number.parseInt(currentUser.adresse.id));

		//Case where categorie is deleted == null
		let fetchCategories = await AnnonceServices.findAllCategorie();
		allCategories = fetchCategories;
	});
	let genres = [
		{ id: 1, genre: `Bien`, value: 'B' },
		{ id: 2, genre: `Service`, value: 'S' }
	];
	const onCheckCampus = (event) => {
		dataContainer = new FormData();
		let idCampusSelected = event.target.value;
		if (event.target.checked) {
			if (!selectedCampus.includes(idCampusSelected))
				selectedCampus.push(Number.parseInt(idCampusSelected));
		} else {
			selectedCampus = selectedCampus.filter((campusId) => campusId != idCampusSelected);
		}
	};

	function onSubmit(e) {
		const formData = new FormData(e.target);
		const data = [];
		// @ts-ignore
		for (let field of formData) {
			const [key, value] = field;
			data[key] = value;
		}
		updateAnnonce(data);
	}
	async function updateAnnonce(data) {
		// console.log(data);
		dataContainer.append('Id', $currentAnnonce.id);
		dataContainer.append('Titre', data.title);
		dataContainer.append('Description', data.description);
		dataContainer.append('Prix', Number.parseFloat(data.price));
		// dataContainer.append('Genre', selectedGenre.value);
		dataContainer.append('Categorie_id', selectedCat.id); // marchepas
		dataContainer.append('adressesToAdd', selectedCampus);

		isLoading = true;
		try {
			await AnnonceServices.updateAnnonce(dataContainer, currentUser.token).then((resp) => {
				notifMsg = resp.data;
				colorNotif = '#5bc0de'; //info, blue
				snackbar = true;
				isLoading = false;
				setTimeout(() => {
					goto('/' + $currentAnnonce.id);
				}, 2500);
			});
		} catch (error) {
			notifMsg = error;
			colorNotif = 'red';
			snackbar = true;
		}
	}
</script>

<Navbar />
<Snackbar
	top
	center
	rounded
	bind:active={snackbar}
	timeout={2000}
	style="background-color:{colorNotif}"
>
	{notifMsg}
</Snackbar>

{#if currentUser}
	{#if !allCampus || !currentUser}
		<LoadingAnimation />
	{:else}
		<form on:submit|preventDefault={onSubmit} method="POST">
			<div style="margin-left: 30%;margin-right: 30%;">
				<h2
					class="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl"
					style="text-align: center; margin-top: 5%;text-decoration: underline;"
				>
					Modification de l'annonce
				</h2>
				<div
					class="max-w-2xl mx-auto py-24 px-4 grid items-center grid-cols-1 gap-y-16 gap-x-8 sm:px-6 sm:py-32 lg:max-w-7xl lg:px-8 lg:grid-cols-1"
				>
					<div>
                        <dt class="font-medium text-gray-900">Titre</dt>
						<h2 class="text-3xl  tracking-tight text-gray-900 sm:text-4xl">
							<input
								class="input is-normal"
								type="text"
								name="title"
								value={$currentAnnonce.titre}
								required
							/>
						</h2>
                        <dt class="font-medium text-gray-900">Prix</dt>
						<h2 class="text-3xl  tracking-tight text-gray-900 sm:text-4xl" >
							<input
								class="input is-normal"
								type="number"
								min="0"
								name="price"
								value={$currentAnnonce.prix}
								required
							/>
						</h2>
						<dl
							class="mt-16 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 sm:gap-y-16 lg:gap-x-8"
						>
							<div class="border-t border-gray-200 pt-4">
								<dt class="font-medium text-gray-900">Description</dt>
								<dd class="mt-2 text-sm text-gray-500">
									<input
										class="input is-normal"
										type="text"
										name="description"
										value={$currentAnnonce.description}
										required
									/>
								</dd>
							</div>
							<div class="border-t border-gray-200 pt-4">
								<dt class="font-medium text-gray-900">Genre</dt>
								<div class="select">
									<select name="genre" bind:value={selectedGenre} required>
										{#each genres as element}
											{#if $currentAnnonce.genre == element.value}
												<option name="genre" value={element} selected>
													{element.genre}
												</option>
											{:else}
												<option name="genre" value={element}>
													{element.genre}
												</option>
											{/if}
										{/each}
									</select>
								</div>
							</div>
							<div class="border-t border-gray-200 pt-4">
								<dt class="font-medium text-gray-900">Vendeur</dt>
								<dd class="mt-2 text-sm text-gray-500">{$currentAnnonce.vendeur_email}</dd>
							</div>
							<div class="border-t border-gray-200 pt-4">
								<dt class="font-medium text-gray-900">Categorie</dt>
								<div class="select">
									<select name="categorie" bind:value={selectedCat} required>
										{#each allCategories as categorie}
											{#if oldCat != '/'}
												{#if oldCat == categorie.nom}
													<option value={categorie} selected>
														{categorie.nom}
													</option>
												{:else}
													<option value={categorie}>
														{categorie.nom}
													</option>
												{/if}
											{:else}
												<option value={categorie}>
													{categorie.nom}
												</option>
											{/if}
										{/each}
									</select>
								</div>
							</div>
							<div class="border-t border-gray-200 pt-4">
								<dt class="font-medium text-gray-900">Adresse</dt>
								<dd class="mt-2 text-sm text-gray-500" />
								{#each allCampus as campus}
									<div class="control">
										<label for="adresses">Campus {campus.ville}</label>
										{#if currentUser.adresse.ville == campus.ville}
											<label class="checkbox">
												<input
													type="checkbox"
													value={campus.id}
													name="adresses"
													on:change={onCheckCampus}
													disabled
													checked
												/>
											</label>
										{:else}
											<label class="checkbox">
												<input
													type="checkbox"
													value={campus.id}
													on:change={onCheckCampus}
													name="adresses"
												/>
											</label>
										{/if}
									</div>
								{/each}
							</div>
							<Button size="default" type="submit" class="blue white-text">Mettre a jour</Button>
						</dl>
					</div>
				</div>
			</div>
		</form>
	{/if}
{:else}
	<ErrorPage message="Vous devez etre connecté pour avoir acces a cette page" />
{/if}
