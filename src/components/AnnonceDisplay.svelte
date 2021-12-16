<script>
	import { onMount } from 'svelte';
	import AnnonceServices from '../services/annonceServices.js';
	import { usersAnnonces, usersFilteredAnnonces, isLoadingMyAnnonce } from '../utils/stores.js';
	import LoadingAnimation from './LoadingAnimation.svelte';
	import CurrentState from './CurrentState.svelte';
	import { Snackbar } from 'svelte-materialify';
	import { FontAwesomeIcon } from 'fontawesome-svelte';
	const baseUrl =
    import.meta.env.VITE_BASE_URL
	export let annonces;
	export let currentToogle;

	let admin, USER, notifMsg, colorNotif;
	let snackbar = false;

	onMount(async () => {
		USER = JSON.parse(sessionStorage.getItem('user'));
		if (USER) {
			admin = USER.administrateur;
		}
	});
	const createObjectToSend = (state, annonce) => {
		return admin
			? {
					Id: annonce.id,
					Titre: annonce.titre,
					Description: annonce.description,
					Prix: annonce.prix,
					Etat: state,
					Vendeur_id: USER.id,
					Genre: annonce.genre
			  }
			: {
					Id: annonce.id,
					Titre: annonce.titre,
					Description: annonce.description,
					Prix: annonce.prix,
					Etat: state,
					Vendeur_id: USER.id,
					addressesToAdd: annonce.addressesToAdd,
					Genre: annonce.genre,
					Categorie_id: annonce.categorie_id
			  };
	};
	const fetchUpdate = async (state, annonce) => {
		console.log(admin)
		console.log(annonce.etat)
			let toSend = createObjectToSend(state, annonce);
			if (admin && annonce.etat == 'E') {
				AnnonceServices.updateAnnonce(toSend, USER.token, admin);
				let index = $usersAnnonces.findIndex((element) => element.id == annonce.id);
				$usersAnnonces[index].etat = state;
				$usersFilteredAnnonces = $usersFilteredAnnonces.filter((e) => e.id != annonce.id);
			} else {
				AnnonceServices.updateAnnonce(toSend, USER.token, false);
				let index = $usersAnnonces.findIndex((element) => element.id == annonce.id);
				$usersAnnonces[index].etat = state;
				$usersFilteredAnnonces = $usersFilteredAnnonces.filter((e) => e.id != annonce.id);
			}
			notifMsg = "L'état de l'annonce a été mis à jour !";
			colorNotif = '#5bc0de';
			snackbar = true;

	};
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
											src="{baseUrl}/medias/{annonce.urlPhoto[0]}"
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
								<a
									class="button is-small"
									id={annonce.id}
									href={'/' + annonce.id}>Voir les détails</a
								>
								<!--AnnonceState début-->
								{#if currentToogle == 'default'}
									<CurrentState {annonce} />
								{/if}
								{#if annonce.etat === 'E' && admin}
									<div id="icon">
										<form on:submit|preventDefault={(e) => onChangeState(e, annonce)} method="POST">
											<button type="submit" id={annonce.id} value="V">
												<span>Valider l'annonce</span>
												<a
													style="color:hsl(171, 100%, 29%)"
													type="submit"
													id={annonce.id}
													value="V"
												>
													<FontAwesomeIcon icon="check-circle" />
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
													<FontAwesomeIcon icon="minus-circle" /></a
												>
											</button>
										</form>
									</div>
									<div id="icon">
										<form on:submit|preventDefault={(e) => onChangeState(e, annonce)} method="POST">
											<button type="submit" id={annonce.id} value="T">
												<span style="hsl(0, 0%, 29%)">Changer l'état en vendu </span>
												<a type="submit" id={annonce.id} value="T"
													><FontAwesomeIcon icon="times-circle" /></a
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
													value="T"><FontAwesomeIcon icon="times-circle" /></a
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
													><FontAwesomeIcon icon="check-circle" />
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
													><FontAwesomeIcon icon="times-circle" />
												</a>
											</button>
										</form>
									</div>
								{/if}

								<!--AnnonceState fin-->
								
							</div>
						</div>
					{/each}
				</div>
			</div>
		</div>
	{:else}
		<div id="center"><p>Vous n'avez pas d'annonce !</p></div>
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
	button {
		border: solid;
		border-width: 0.3px;
		border-radius: 5px;
		border-color: blueviolet;
		background-color: rgba(138, 43, 226, 0.2);
	}
	.button{
		border: solid;
		border-width: 0.3px;
		border-radius: 5px;
		border-color: blueviolet;
		background-color: rgba(138, 43, 226, 0.2);
		float:right;
		color:rgb(1, 83, 104);
		font-weight: bold;
	}
	span {
		margin: 5px;
	}
</style>
