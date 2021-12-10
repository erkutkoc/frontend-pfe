<script>
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	import AnnonceServices from '../services/annonceServices';
	
	let shown = false;
	let USER;

	export function showModal() {
		shown = true;
	}
	export function hideModal() {
		shown = false;
	}
	onMount(async () => {
        USER = JSON.parse(localStorage.getItem("user"));
    })
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
	let selected;
	const fetchAddAnnonce = async (data) => {
		console.log('genre : ' + selected.value);

		let toSend = {
			Titre: data.title,
			Description: data.description,
			Prix: Number.parseFloat(data.price),
			Etat: 'E',
			Genre: selected.value,
			Vendeur_id: USER.id,
			Categorie_id: 1
		};
		console.log(toSend);
		AnnonceServices.addAnnonce(toSend,USER.token).then(goto('/myAnnonce'));
	};
	let genres = [
		{ id: 1, genre: `Bien`, value: 'B' },
		{ id: 2, genre: `Service`, value: 'S' }
	];
</script>

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
			<form on:submit|preventDefault={onSubmit}>
				<div class="field">
					<label class="label">Titre</label>
					<div class="control">
						<input class="input" name="title" type="text" placeholder="Entrez un titre" />
					</div>
				</div>
				<div class="field">
					<label class="label">Prix</label>
					<div class="control">
						<input
							class="input"
							type="number"
							step="0.01"
							name="price"
							placeholder="Entrez un prix"
						/>
					</div>
				</div>
				<div class="field">
					<label class="label">Genre</label>
					<div class="select">
						<select bind:value={selected}>
							{#each genres as genre}
								<option value={genre}>
									{genre.genre}
								</option>
							{/each}
						</select>
					</div>
				</div>
				<label class="label">Categorie</label>
				<div class="control">
					<input class="input" type="text" name="categorie" placeholder="Entrez un catégorie" />
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
						La vente est mise "En attente" afin d'être valider
					</p>
				</div>

				<div class="field">
					<label class="label"> Description</label>
					<div class="control">
						<textarea class="textarea" name="description" placeholder="Textarea" />
					</div>
				</div>

				<div class="field is-grouped is-centered ">
					<div
						class="file is-normal is-boxed has-name is-success"
						style="display: inline; margin-right: auto; margin-left: auto;"
					>
						<label class="file-label">
							<input class="file-input" type="file" name="resume" accept="image/*" />
							<span class="file-cta">
								<span class="file-icon">
									<i class="fas fa-upload" />
								</span>
								<span class="file-label"> Ajouter vos photos </span>
							</span>
							<span class="file-name has-text-centered"> tabouret.png </span>
						</label>
					</div>
					<div
						class="file is-normal is-boxed has-name is-info"
						style="display: inline; margin-right: auto; margin-left: auto;"
					>
						<label class="file-label">
							<input class="file-input" type="file" name="resume" accept="video/*" />
							<span class="file-cta">
								<span class="file-icon">
									<i class="fas fa-upload" />
								</span>
								<span class="file-label"> Ajouter une vidéo </span>
							</span>
							<span class="file-name has-text-centered"> mavideo.mp4 </span>
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
