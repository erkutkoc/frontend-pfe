<script>
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	import AnnonceServices from '../services/annonceServices';
	import { Shadow } from 'svelte-loading-spinners';

	let shown = false;
	let USER;
	let fetchAddDataContainer;

	export function showModal() {
		shown = true;
	}
	export function hideModal() {
		shown = false;
	}
	let categories = [];
	onMount(async () => {
		USER = JSON.parse(sessionStorage.getItem('user'));
		const res = await AnnonceServices.findAllCategorie();
		categories = res;
		fetchAddDataContainer = new FormData();
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

		isLoading = true;
		await AnnonceServices.uploadAnnonce(fetchAddDataContainer, USER.token)
			.then((rep) => {
				isLoading = false;
				goto('/'+rep.data);
			})
	}
	let genres = [
		{ id: 1, genre: `Bien`, value: 'B' },
		{ id: 2, genre: `Service`, value: 'S' }
	];
	const handleMedia = async (e) => {
		let files = e.target.files;
		if(files.length >= 10 ){
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

{#if isLoading}
	<div id="loader">
		<Shadow size="100" color="#2c9b89" unit="px" duration="1s" />
	</div>
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
					<label class="label">Titre</label>
					<div class="control">
						<input class="input" name="title" type="text" placeholder="Entrez un titre" required />
					</div>
				</div>
				<div class="field">
					<label class="label">Prix</label>
					<div class="control">
						<input
							class="input"
							type="number"
							min="0"
							name="price"
							placeholder="Entrez un prix"
							required
						/>
					</div>
				</div>
				<div class="field">
					<label class="label">Genre</label>
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
				<label class="label">Catégorie </label>
				<div class="select">
					<select name="categorie" bind:value={selectedCat} required>
						{#each categories as categorie}
							<option value={categorie}>
								{categorie.nom}
							</option>
						{/each}
					</select>
				</div>

				<div class="field">
					<label class="label">Etat</label>
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
					<label class="label"> Description</label>
					<div class="control">
						<textarea class="textarea" name="description" placeholder="Textarea" required />
					</div>
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

<style>
	#loader {
		margin: 0;
		position: absolute;
		top: 50%;
		left: 50%;
		margin-right: -50%;
		transform: translate(-50%, -50%);
		z-index: 100;
	}
</style>
