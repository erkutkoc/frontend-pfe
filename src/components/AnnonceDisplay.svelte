<script>
	import { onMount } from 'svelte';
	import AnnonceServices from '../services/annonceServices.js';
	import { usersAnnonces, usersFilteredAnnonces, isLoadingMyAnnonce } from '../utils/stores.js';
	import LoadingAnimation from './LoadingAnimation.svelte';
	import { Snackbar } from 'svelte-materialify';
	import { FontAwesomeIcon } from 'fontawesome-svelte';
	import State from './State.svelte';
	export let annonces;
	export let currentToogle;
	let admin;
	let USER;
	let notifMsg, colorNotif;
	let snackbar = false;
	// fetch user token high level on mount
	onMount(async () => {
		USER = JSON.parse(sessionStorage.getItem('user'));
		if (USER) {
			admin = USER.administrateur;
		}
		//$isLoadingMyAnnonce = !$isLoadingMyAnnonce;
	});
	//update state by annonce
	const fetchUpdate = async (state, annonce) => {
		try {
			let toSend = {
				Id: annonce.id,
				Titre: annonce.titre,
				Description: annonce.description,
				Prix: annonce.prix,
				Etat: state,
				Vendeur_id: USER.id
			};
			if (admin && state == 'E') {
				AnnonceServices.updateAnnonce(toSend, USER.token, admin);
				let index = $usersAnnonces.findIndex((element) => element.id == annonce.id);
				$usersAnnonces[index].etat = state;
				$usersFilteredAnnonces = $usersFilteredAnnonces.filter((e) => e.id != annonce.id);
			} else {
				AnnonceServices.updateAnnonce(toSend, USER.token);
				let index = $usersAnnonces.findIndex((element) => element.id == annonce.id);
				$usersAnnonces[index].etat = state;
				$usersFilteredAnnonces = $usersFilteredAnnonces.filter((e) => e.id != annonce.id);
			}
			notifMsg = "L'état de l'annonce a été mis à jour !";
			colorNotif = '#5bc0de';
			snackbar = true;
		} catch (error) {
			console.log(error);
			notifMsg = "L'état de l'annonce n'a pas été mis à jour !";
			colorNotif = 'red';
			snackbar = true;
		}
	};
	//click event to change state
	function onChangeState(event, annonce) {
		if (annonce) fetchUpdate(event.target[0].value, annonce);
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
{#if !$isLoadingMyAnnonce}
	{#if annonces.length != 0}
		<div class="container column is-fullhd">
			<div class="section">
				<div class="columns is-multiline ">
					{#each annonces as annonce (annonce.id)}
						<div class="card column is-one-third">
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
								{#if annonce.prix != null}
									<h5 class="title is-5">{annonce.prix} €</h5>
								{:else}
									<h5 class="title is-5 is-italic has-text-primary">Objet à donner</h5>
								{/if}
								<!--AnnonceState début-->
								{#if currentToogle == 'default'}

									<State {annonce} />
				
								{/if}
								{#if annonce.etat === 'E' && admin}
									<div id="icon">
										<form on:submit|preventDefault={(e) => onChangeState(e, annonce)} method="POST">
											<button type="submit" id={annonce.id} value="V">
												Valider l'annonce
												<a
													style="color:hsl(171, 100%, 29%)"
													type="submit"
													id={annonce.id}
													value="V"
												>
													<i class="fas fa-check-circle" />
												</a>
											</button>
											<!-- <span>Annuler la réservation</span> -->
										</form>
									</div>
								{/if}
								{#if annonce.etat === 'V'}
									<div id="icon">
										<form on:submit|preventDefault={(e) => onChangeState(e, annonce)} method="POST">
											<button type="submit" id={annonce.id} value="R">
												<span style="color:#F98A0C">Changer l'état en réservé </span><a
													style="color:#F98A0C"
													type="submit"
													id={annonce.id}
													value="R"
												>
													<i class="fas fa-minus-circle" /></a
												>
											</button>
										</form>
									</div>
									<div id="icon">
										<form on:submit|preventDefault={(e) => onChangeState(e, annonce)} method="POST">
											<button type="submit" id={annonce.id} value="T">
												<span style="hsl(0, 0%, 29%)">Changer l'état en vendu </span>
												<a type="submit" id={annonce.id} value="T"
													><i class="fas fa-times-circle" /></a
												>
											</button>
										</form>
									</div>
								{/if}
								{#if annonce.etat === 'R'}
									<div id="icon">
										<form on:submit|preventDefault={(e) => onChangeState(e, annonce)} method="POST">
											<button type="submit" id={annonce.id} value="T">
												<span class="" style="hsl(0, 0%, 29%)"> Changer l'état en vendu</span><a
													type="submit"
													id={annonce.id}
													value="T"><i class="fas fa-times-circle" /></a
												>
											</button>
										</form>
									</div>
									<div id="icon">
										<form on:submit|preventDefault={(e) => onChangeState(e, annonce)} method="POST">
											<button type="submit" id={annonce.id} value="V">
												<span class=" has-text-primary-dark">Annuler la réservation </span><a
													style="color:hsl(171, 100%, 29%)"
													type="submit"
													id={annonce.id}
													value="V"
													><i class="fas fa-check-circle" />
												</a>
											</button>
											<!--  -->
										</form>
									</div>
								{/if}

								{#if annonce.etat !== 'T' && annonce.etat !== 'A'}
									<div id="icon">
										<form on:submit|preventDefault={(e) => onChangeState(e, annonce)} method="POST">
											<button type="submit" id={annonce.id} value="A">
												<span class="has-text-danger-dark"> Supprimer l'annonce </span><a
													class="has-text-danger-dark"
													type="submit"
													id={annonce.id}
													value="A"
													><i class="fas fa-times-circle" />
												</a>
											</button>
										</form>
									</div>
								{/if}

								<!--AnnonceState fin-->
								<a
									class="button is-primary is-rounded is-pulled-right"
									id={annonce.id}
									href={'/' + annonce.id}>Voir les détails</a
								>
							</div>
						</div>
					{/each}
				</div>
			</div>
		</div>
	{:else}
		<div id="center"><p>Vous n'avez pas d'article !</p></div>
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
