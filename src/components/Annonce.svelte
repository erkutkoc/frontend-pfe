<script>
	import AnnonceServices from '../services/annonceServices.js';
	import { annonces, filteredAnnonces } from '../utils/stores.js';
	import { onMount } from 'svelte';

	export let annonce;

	let homePage = true;
	let admin = false;
	let USER;

	onMount(async () => {
		USER = JSON.parse(sessionStorage.getItem('user'));
		if (USER) {
			admin = USER.administrateur;
		}
	});

	const fetchUpdate = async (state) => {
		let toSend = {
			Id: annonce.id,
			Titre: annonce.titre,
			Description: annonce.description,
			Prix: annonce.prix,
			Etat: state
		};
		if (admin) {
			AnnonceServices.updateAnnonce(toSend, USER.token, admin);
			let index = $annonces.findIndex((element) => element.id == annonce.id);
			$annonces[index].etat = state;
			$filteredAnnonces = $filteredAnnonces.filter((e) => e.id != annonce.id);
		} else {
			AnnonceServices.updateAnnonce(toSend, USER.token);
			let index = $annonces.findIndex((element) => element.id == annonce.id);
			$annonces[index].etat = state;
			$filteredAnnonces = $filteredAnnonces.filter((e) => e.id != annonce.id);
		}
	};
	function onChangeState(updatedAnnonce) {
		if (updatedAnnonce) fetchUpdate(updatedAnnonce.target[0].value);
	}
</script>
<!-- Home screen -->
<div class="column card is-one-third">
	<div class="card-image">
		<figure class="image is-5by3">
			{#if annonce.urlPhoto[0]}
				<img
					src="https://backend-staging-pfe.herokuapp.com/medias/{annonce.urlPhoto[0]}"
					alt="annonce"
				/>
			{:else}
				<img src="/noimage.png" alt="pas d'image png" class="bg-gray-100 rounded-lg" />
			{/if}
		</figure>
	</div>
	<div class="card-content">
		<h4 class="title is-4">{annonce.titre}</h4>
		{#if annonce.prix}
			<h5 class="title is-5">{annonce.prix}</h5>
		{:else}
			<h5 class="title is-5 is-italic has-text-primary">Objet à donner</h5>
		{/if}
		<!--Annonce State-->
		{#if annonce.etat === 'E'}
			<span style="color:hsl(217, 71%, 53%)"> <b>En attente</b></span>
		{:else if annonce.etat === 'V'}
			<span class=" has-text-primary-dark"><b>Validée</b></span>
		{:else if annonce.etat === 'T'}
			<span class="" style="hsl(0, 0%, 29%)"> <b>Vendus</b></span>
		{:else if annonce.etat === 'R'}
			<span style="color:#F98A0C"> <b>Réservée</b></span>
		{:else if annonce.etat === 'A'}
			<span class="has-text-danger-dark"> <b>Supprimer</b></span>
		{/if}

		{#if admin && homePage}
			Supprimer
			<div id="icon">
				<form on:submit|preventDefault={onChangeState} method="POST">
					<button type="submit" id={annonce.id} value="A">
						<a class="has-text-danger-dark" id={annonce.id} value="A"
							><i class="fas fa-times-circle" />
						</a>
					</button>
					<span class="has-text-danger-dark"> Supprimer</span>
				</form>
			</div>
		{/if}

		{#if !homePage}
			{#if annonce.etat != 'T' && annonce.etat != 'A'}
				Changer l'état
			{/if}
			{#if annonce.etat === 'E' && admin}
				<div id="icon">
					<form on:submit|preventDefault={onChangeState} method="POST">
						<button type="submit" id={annonce.id} value="V">
							<a style="color:hsl(171, 100%, 29%)" type="submit" id={annonce.id} value="V">
								<i class="fas fa-check-circle" />
							</a>
						</button>
						<!-- <span>Annuler la réservation</span> -->
					</form>
				</div>
			{/if}
			{#if annonce.etat === 'V'}
				<div id="icon">
					<form on:submit|preventDefault={onChangeState} method="POST">
						<button type="submit" id={annonce.id} value="R">
							<a style="color:#F98A0C" type="submit" id={annonce.id} value="R">
								<i class="fas fa-minus-circle" /></a
							>
						</button>
						<!-- <span style="color:#F98A0C">En résérvé</span> -->
					</form>
				</div>
				<div id="icon">
					<form on:submit|preventDefault={onChangeState} method="POST">
						<button type="submit" id={annonce.id} value="T">
							<a type="submit" id={annonce.id} value="T"> <i class="fas fa-times-circle" /></a>
						</button>
						<!-- <span style="hsl(0, 0%, 29%)">En vendu</span> -->
					</form>
				</div>
			{/if}
			{#if annonce.etat === 'R'}
				<div id="icon">
					<form on:submit|preventDefault={onChangeState} method="POST">
						<button type="submit" id={annonce.id} value="T">
							<a type="submit" id={annonce.id} value="T"><i class="fas fa-times-circle" /></a>
						</button>
						<!-- <span class="" style="hsl(0, 0%, 29%)"> En vendu</span> -->
					</form>
				</div>
				<div id="icon">
					<form on:submit|preventDefault={onChangeState} method="POST">
						<button type="submit" id={annonce.id} value="V">
							<a style="color:hsl(171, 100%, 29%)" type="submit" id={annonce.id} value="V"
								><i class="fas fa-check-circle" />
							</a>
						</button>
						<!-- <span class=" has-text-primary-dark">Annuler la réservation</span> -->
					</form>
				</div>
			{/if}

			{#if annonce.etat !== 'T' && annonce.etat !== 'A'}
				<div id="icon">
					<form on:submit|preventDefault={onChangeState} method="POST">
						<button type="submit" id={annonce.id} value="A">
							<a class="has-text-danger-dark" type="submit" id={annonce.id} value="A"
								><i class="fas fa-times-circle" />
							</a>
						</button>
						<!-- <span class="has-text-danger-dark"> Supprimer</span> -->
					</form>
				</div>
			{/if}
		{/if}
		<!--Annonce State fin-->
		<a class="button is-primary is-rounded is-pulled-right" id={annonce.id} href={'/' + annonce.id}
			>Voir les détails</a
		>
	</div>
</div>
