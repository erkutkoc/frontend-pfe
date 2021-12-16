<script>
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	import AnnonceServices from '../services/annonceServices';
	import LoadingAnimation from './LoadingAnimation.svelte';
	import { Snackbar } from 'svelte-materialify';
	let shown = false;
	let USER;
	let fetchAddDataContainer;
	let highCategories = [];
	let subCategories = [];
	let snackbar = false;
	let notifMsg, colorNotif;
	$: allCampus = [];

	export function showModal() {
		shown = true;
	}
	export function hideModal() {
		shown = false;
	}
	let selectedCampus = [];

	let categories = [];
	onMount(async () => {
		USER = JSON.parse(sessionStorage.getItem('user'));
		const res = await AnnonceServices.findAllCategorie();
		categories = res;
		fetchAddDataContainer = new FormData();

		const fetchAllCampus = await AnnonceServices.getAllCampus();
		allCampus = fetchAllCampus.data;
		selectedCampus.push(Number.parseInt(USER.adresse.id));
		highCategories = categories.filter((e) => e.sur_categorie_id == null);
		subCategories = categories.filter((e) => e.sur_categorie_id != null);
	});
	function onSubmit(e) {
		const formData = new FormData(e.target);
		const data = [];
		// @ts-ignore
		for (let field of formData) {
			const [key, value] = field;
			data[key] = value;
		}
		fetchAddAnnonce(data);
	}
	const onCheckCampus = (event) => {
		let idCampusSelected = event.target.value;
		if (event.target.checked) {
			if (!selectedCampus.includes(idCampusSelected))
				selectedCampus.push(Number.parseInt(idCampusSelected));
		} else {
			selectedCampus = selectedCampus.filter((campusId) => campusId != idCampusSelected);
		}
	};
	let selectedCat;
	let selected;
	let isLoading = false;

	async function fetchAddAnnonce(data) {
		fetchAddDataContainer.append('Titre', data.title);
		fetchAddDataContainer.append('Description', data.description);
		fetchAddDataContainer.append('Prix', Number.parseFloat(data.price));
		fetchAddDataContainer.append('Etat', 'E');
		fetchAddDataContainer.append('Genre', selected.value);
		fetchAddDataContainer.append('Vendeur_id', USER.id);
		fetchAddDataContainer.append('Categorie_id', selectedCat.id);
		fetchAddDataContainer.append('adressesToAdd', selectedCampus);
		isLoading = true;
		try {
			await AnnonceServices.uploadAnnonce(fetchAddDataContainer, USER.token).then((rep) => {
			isLoading = false;
			goto('/' + rep.data);
		});
		} catch (error) {
			console.log(error);
			notifMsg = "L'annonce n'a pas été ajouter !";
			colorNotif = 'red';
			snackbar = true;
		}

	}
	let genres = [
		{ id: 1, genre: `Bien`, value: 'B' },
		{ id: 2, genre: `Service`, value: 'S' }
	];
	const handleMedia = async (e) => {
		let files = e.target.files;
		if (files.length >= 10) {
			alert(`La limite d'upload est de 10.`);
			return;
		}
		const formData = new FormData();

		for (let index = 0; index < files.length; index++) {
			if (files[index].name) {
				formData.append('ImageFile', files[index]);
			}
		}
		fetchAddDataContainer = formData;
	};
</script>
<Snackbar
	top
	center
	rounded
	bind:active={snackbar}
	timeout={5000}
	style="background-color:{colorNotif}"
>
	{notifMsg}
</Snackbar>
{#if isLoading}
	<LoadingAnimation />
{/if}
<div class={shown ? 'modal is-active' : 'modal'}>
	<div class="modal-background " />
	<div class="modal-card ">
		<header class="modal-card-head has-background-primary">
			<p class="modal-card-title has-text-centered has-text-white has-text-weight-bold">
				Ajouter un article
			</p>
			<button class="delete" on:click={hideModal} aria-label="close" />
		</header>
		<section class="modal-card-body">
			<form on:submit|preventDefault={onSubmit} method="POST">
				<div class="field">
					<p class="label">Titre</p>
					<div class="control">
						<input class="input" name="title" type="text" placeholder="Entrez un titre" required />
					</div>
				</div>
				<div class="field">
					<p class="label">Prix</p>
					<div class="control">
						<input
							class="input"
							type="number"
							step="0.01"
							min="0"
							name="price"
							placeholder="Entrez un prix"
							required
						/>
					</div>
				</div>
				<div class="field">
					<p class="label">Genre</p>
					<div class="select">
						<select name="genre" bind:value={selected} required>
							{#each genres as element}
								<option value={element}>
									{element.genre}
								</option>
							{/each}
						</select>
					</div>
				</div>
				<p class="label">Catégorie</p>
				<div class="select">
					<select name="categorie" bind:value={selectedCat} required>
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

				<div class="field">
					<p class="label">Etat</p>
					<div class="control">
						<input
							class="input"
							type="text"
							placeholder="En attente"
							name="state"
							value="En attente"
							readonly
						/>
					</div>
					<p class="help is-success has-text-weight-bold">
						La vente est mise "En attente" afin d'être validee
					</p>
				</div>

				<div class="field">
					<p class="label">Description</p>
					<div class="control">
						<textarea
							class="textarea"
							name="description"
							placeholder="Inserez une description..."
							required
						/>
					</div>
				</div>

				<div class="field">
					<p class="label">Adresses</p>
					{#each allCampus as campus}
						<div class="control">
							<label for="adresses">Campus {campus.ville}</label>
							{#if USER.adresse.ville == campus.ville}
								<label class="checkbox">
									<input
										type="checkbox"
										value={campus.id}
										on:change={onCheckCampus}
										name="adresses"
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
				<div class="field is-grouped is-centered ">
					<div
						class="file is-normal is-boxed has-name is-success"
						style="display: inline; margin-right: auto; margin-left: auto;"
					>
						<label class="file-label">
							<input
								on:change={handleMedia}
								class="file-input"
								type="file"
								name="resume"
								accept="image/* , video/*"
								multiple
							/>
							<span class="file-cta" style="">
								<span class="file-icon">
									<i class="fas fa-upload" />
								</span>
								<span class="file-label"> Ajouter vos photos/videos </span>
							</span>
						</label>
					</div>
				</div>

				<div class="field is-grouped is-centered">
					<div style=" margin-left: auto; margin-right: auto;">
						<div class="control " style="display: inline;">
							<button class="button is-primary" type="submit">Créer</button>
						</div>
						<div class="control" style="display: inline;">
							<button class="button is-link is-light" on:click={hideModal}>Annuler</button>
						</div>
					</div>
				</div>
			</form>
		</section>
	</div>
</div>
