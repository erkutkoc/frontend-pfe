<script>
	import AnnonceServices from '../services/annonceServices.js';
	import { annonces, filteredAnnonces } from '../utils/stores.js';
	import { onMount } from 'svelte';
	import { Snackbar } from 'svelte-materialify';
	import CurrentState from './CurrentState.svelte';
	import { FontAwesomeIcon } from 'fontawesome-svelte';
	export let annonce;

	let admin = false;
	let USER;
	let notifMsg, colorNotif;
	let snackbar = false;
	onMount(async () => {
		USER = JSON.parse(sessionStorage.getItem('user'));
		if (USER) {
			admin = USER.administrateur;
		}
	});

	const fetchUpdate = async (state) => {
		try {
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
				notifMsg = "L'état de l'annonce a été mis à jour !";
				colorNotif = '#5bc0de';
				snackbar = true;
				console.log(snackbar);
			} else {
				AnnonceServices.updateAnnonce(toSend, USER.token);
				let index = $annonces.findIndex((element) => element.id == annonce.id);
				$annonces[index].etat = state;
				$filteredAnnonces = $filteredAnnonces.filter((e) => e.id != annonce.id);
				notifMsg = "L'état de l'annonce a été mis à jour !";
				colorNotif = '#5bc0de';
				snackbar = true;
				console.log(snackbar);
			}
		} catch (error) {
			notifMsg = "L'état de l'annonce n'a pas été mis à jour !";
			colorNotif = 'red';
			snackbar = true;
		}
	};
	function onChangeState(updatedAnnonce) {
		if (updatedAnnonce) fetchUpdate(updatedAnnonce.target[0].value);
	}
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
			<h5 class="title is-5">{annonce.prix} €</h5>
		{:else}
			<h5 class="title is-5 is-italic has-text-primary">Objet à donner</h5>
		{/if}
		<!--Annonce CurrentState-->
		<CurrentState {annonce} />

		{#if admin}
			<div id="icon">
				<form on:submit|preventDefault={onChangeState} method="POST">
					<button type="submit" id={annonce.id} value="A">
						<span class="has-text-danger-dark"> Supprimer </span>
						<a class="has-text-danger-dark" id={annonce.id} value="A"
							><FontAwesomeIcon icon="times-circle" /></a
						>
					</button>
				</form>
			</div>
		{/if}

		<!--Annonce CurrentState fin-->
		<a class="button is-primary is-rounded is-pulled-right" id={annonce.id} href={'/' + annonce.id}
			>Voir les détails</a
		>
	</div>
</div>

<style>
	button {
		border: solid;
		border-width: 0.3px;
		border-radius: 5px;
		border-color: blueviolet;
		background-color: rgba(138, 43, 226, 0.2);
	}
	span {
		margin: 5px;
	}
</style>
