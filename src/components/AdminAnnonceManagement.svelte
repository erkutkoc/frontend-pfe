<script>
	import AnnonceServices from '../services/annonceServices.js';
	import { onMount } from 'svelte';
	import { Snackbar, Button, Icon } from 'svelte-materialify';
	import LoadingAnimation from './LoadingAnimation.svelte';

	let USER;
	let annonces = [];
	let admin;
	let snackbar = false;
	let notifMsg, colorNotif;
	let isLoadingAnnonces = true;
	onMount(async () => {
		USER = JSON.parse(sessionStorage.getItem('user'));
		if (USER == null) return;
		try {
			const res = await AnnonceServices.findAllAnnonceStatusWaiting(USER.token); // ne renvoie pas ce qui est en attente
			annonces = res;
			annonces = annonces.filter((annonce) => annonce.etat === 'E');
			isLoadingAnnonces = false;
		} catch (error) {
			notifMsg = error;
			colorNotif = 'red';
			snackbar = true;
		}
		admin = USER.administrateur;
	});
	function handleUpdate(annonce, updatedState) {
		if (annonce) fetchUpdate(annonce, updatedState);
	}
	const fetchUpdate = async (annonce, updatedState) => {
		if (admin) {
			let toSend = {
				Id: annonce.id,
				Titre: annonce.titre,
				Description: annonce.description,
				Prix: annonce.prix,
				Etat: updatedState,
				Genre : annonce.genre
			};
			AnnonceServices.updateAnnonce(toSend, USER.token, admin);
			let index = annonces.findIndex((element) => element.id == annonce.id);
			annonces[index].etat = updatedState;
			annonces = annonces.filter((e) => e.id != annonce.id);
			if (updatedState == 'E') {
				notifMsg = "L'annonce à été valider !";
				colorNotif = '#5bc0de';
				snackbar = true;
			} else {
				notifMsg = "L'annonce à été supprimer !";
				colorNotif = '#5bc0de';
				snackbar = true;
			}
		}
	};
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
{#if !isLoadingAnnonces}
	{#if annonces.length != 0}
		<div class="container column is-10">
			<div class="section">
				{#each annonces as annonce (annonce.id)}
					<div class="card" style="">
						<div class="card-content">
							<span class="tag  is-medium is-info" style="float:left">
								<a href={'/' + annonce.id} id="numero" style="color:white">Annonce n°{annonce.id}</a
								></span
							>
							<div style="float:right">
								<form
									on:submit|preventDefault={handleUpdate(annonce, 'A')}
									method="PUT"
									style="display:inline-block"
								>
									<button class="is-danger button" type="submit" id={annonce.id}
										>Supprimer l'annonce
									</button>
								</form>
								<form
									on:submit|preventDefault={handleUpdate(annonce, 'V')}
									method="PUT"
									style="display:inline-block"
								>
									<button class="is-primary button" type="submit" id={annonce.id}
										>Valider l'annonce
									</button>
								</form>
							</div>

							<span
								class="tag is-large"
								style="float:right; border: solid  rgba(170, 50, 220, .6);   border-width: 0.3px "
							>
								<a href={'/' + annonce.id}>Voir les détails de l'annonce</a>
							</span>
						</div>
						<div class="card-content">
							<p class="title has-text-centered ">{annonce.titre}</p>
							<div class="content">
								<p class="has-text-centered">{annonce.description}</p>
								<p
									class="has-text-right"
									style="font-size:large;font-weight: bold;color: darkgreen;"
								>
									{annonce.prix} €
								</p>
							</div>
							<div class="content">
								<div class="has-text-right" style="display:inline-block">
									{#if annonce.etat === 'E'}
										<span class="icon is-small has-text-right" style="color:hsl(217, 71%, 53%)"
											><i class="fas fa-pause-circle" /></span
										>
										<span> En attente</span>
									{:else if annonce.etat === 'V'}
										<span class="icon is-small has-text-primary-dark"
											><i class="fas fa-check-circle" /></span
										>
										<span> Validée</span>
									{:else if annonce.etat === 'T'}
										<span class="icon is-small"><i class="fas fa-times-circle" /></span>
										<span> Vendus</span>
									{:else if annonce.etat === 'R'}
										<span class="icon is-small" style="color:#F98A0C"
											><i class="fas fa-minus-circle" /></span
										>
										<span> Réservée</span>
									{:else if annonce.etat === 'A'}
										<span class="icon is-small has-text-danger-dark"
											><i class="fas fa-times-circle" /></span
										>
										<span> Supprimer</span>
									{/if}
								</div>
							</div>
						</div>
					</div>

					<br />
				{/each}
			</div>
		</div>
	{:else}
		<div id="center"><p>Aucun annonce à valider !</p></div>
	{/if}
{:else}
	<LoadingAnimation />
{/if}
<style>
		#center {
		text-align: center;
		font-size: xx-large;
		font-style: italic;
		font-weight: bolder;
		position: absolute;
		margin: auto;
		top: 50%;
		bottom: 0;
		left: 0;
		right: 0;
	}
</style>