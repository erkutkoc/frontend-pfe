<script>
	export let shown = false;
	export let currentAnnonce;
	export let vendeur_email;
	export let categorie_nom;
	export let currentUser;

	import AnnonceServices from '../services/annonceServices';
	import { onMount } from 'svelte';
	import { Snackbar } from 'svelte-materialify';
	import LoadingAnimation from './LoadingAnimation.svelte';
	import { goto } from '$app/navigation';

	let snackbar = false;
	let colorNotif;
	let notifMsg;
	let dataContainer;
	let genres = [
		{ id: 1, genre: `Bien`, value: 'B' },
		{ id: 2, genre: `Service`, value: 'S' }
	];
	let allCampus;
	let selectedCampus = [];
	let allCategories = [];
	let highCategories = [];
	let subCategories = [];
	onMount(async () => {
		const fetchAllCampus = await AnnonceServices.getAllCampus();
		allCampus = fetchAllCampus.data;
		selectedCampus.push(Number.parseInt(currentUser.adresse.id));
		dataContainer = new FormData();

		//Case where categorie is deleted == null
		let fetchCategories = await AnnonceServices.findAllCategorie();
		allCategories = fetchCategories;
		highCategories = allCategories.filter((e) => e.sur_categorie_id == null);
		subCategories = allCategories.filter((e) => e.sur_categorie_id != null);
	});
	const onCheckCampus = (event) => {
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
		let toSend = {
			Id: currentAnnonce.id,
			Titre: data.title,
			Description: data.description,
			Prix: Number.parseFloat(data.price),
			Etat: currentAnnonce.etat,
			Categorie_id: Number.parseInt(document.getElementById('categorie').value),
			Vendeur_id: Number.parseInt(currentAnnonce.vendeur_id),
			Genre: document.getElementById('genre').value,
			adressesToAdd: selectedCampus.toString()
		};

		try {
			await AnnonceServices.updateAnnonce(toSend, currentUser.token).then((resp) => {
				notifMsg = "L'annonce a été modifiée avec succès";
				colorNotif = '#5bc0de'; //info, blue
				snackbar = true;
				setTimeout(() => {
					goto('/' + currentAnnonce.id);
				}, 3500);
			});
		} catch (error) {
			notifMsg = error;
			colorNotif = 'red';
			snackbar = true;
		}
	}
</script>

<Snackbar
	top
	center
	rounded
	bind:active={snackbar}
	timeout={3000}
	style="background-color:{colorNotif}"
>
	{notifMsg}
</Snackbar>

{#if !allCampus || !allCategories}
	<LoadingAnimation />
{:else}
	<div class={shown ? 'modal is-active' : 'modal'}>
		<div class="modal-background " />
		<div class="modal-card ">
			<header class="modal-card-head has-background-primary">
				<p class="modal-card-title has-text-centered has-text-white has-text-weight-bold">
					Modification de l'annonce
				</p>
				<button class="delete" on:click={() => (shown = false)} aria-label="close" />
			</header>
			<section class="modal-card-body">
				<form method="POST" on:submit|preventDefault={onSubmit}>
					<div class="field">
						<p class="label">Titre</p>
						<div class="control">
							<input class="input" name="title" type="text" value={currentAnnonce.titre} required />
						</div>
					</div>
					<div class="field">
						<p class="label">Prix</p>
						<div class="control">
							<input
								class="input is-normal"
								type="number"
								step="0.01"
								min="0"
								name="price"
								value={currentAnnonce.prix}
								required
							/>
						</div>
					</div>

					<div class="field">
						<p class="label">Description</p>
						<div class="control">
							<textarea
								class="textarea"
								name="description"
								value={currentAnnonce.description}
								required
							/>
						</div>
					</div>
					<div class="field">
						<p class="label">Genre</p>
						<div class="select">
							<select id="genre" name="genre" required>
								{#each genres as element}
									{#if currentAnnonce.genre == element.value}
										<option name="genre" value={element.value} selected>
											{element.genre}
										</option>
									{:else}
										<option name="genre" value={element.value}>
											{element.genre}
										</option>
									{/if}
								{/each}
							</select>
						</div>
					</div>
					<div class="field">
						<p class="label">Categorie</p>
						<div class="select">
							<select id="categorie" name="categorie" required>
								{#each allCategories as cat}
									{#if categorie_nom != '/'}
										{#if categorie_nom == cat.nom}
											<option value={cat.id} selected>
												{cat.nom}
											</option>
										{:else}
											<option value={cat.id}>
												{cat.nom}
											</option>
										{/if}
									{:else}
										<option value={cat.id}>
											{cat.nom}
										</option>
									{/if}
								{/each}
							</select>
						</div>
					</div>
					<div class="border-t border-gray-200 pt-4">
						<dt class="font-medium text-gray-900">Vendeur</dt>
						<dd class="mt-2 text-sm text-gray-500">{vendeur_email}</dd>
					</div>
					<div class="field">
						<p class="label">Adresses</p>
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
											style="border: solid ;border-color: gray;border-width: 0.3px;"
										/>
									</label>
								{/if}
							</div>
						{/each}
					</div>

					<div class="field is-grouped is-centered">
						<div style=" margin-left: auto; margin-right: auto;">
							<div class="control " style="display: inline;">
								<button class="button is-primary" type="submit">Modifier</button>
							</div>
							<div class="control" style="display: inline;">
								<button class="button is-link is-light" on:click={() => (shown = false)}
									>Annuler</button
								>
							</div>
						</div>
					</div>
				</form>
			</section>
		</div>
	</div>
{/if}
