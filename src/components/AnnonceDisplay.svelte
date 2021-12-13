<script>
	import { onMount } from 'svelte';
	import AnnonceServices from '../services/annonceServices.js';
	import { usersAnnonces, usersFilteredAnnonces } from '../utils/stores.js';

	export let annonces;
	export let currentToogle;
	let admin;
	let USER;
	// fetch user token high level on mount
	onMount(async () => {
		USER = JSON.parse(sessionStorage.getItem('user'));
		if (USER) {
			admin = USER.administrateur;
		}
		// console.log(USER.id)
	});
	//update state by annonce
	const fetchUpdate = async (state, annonce) => {
		console.log(state);
		console.log(annonce);

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
	};
	//click event to change state
	function onChangeState(event, annonce) {
		if (annonce) fetchUpdate(event.target[0].value, annonce);
	}
</script>

<div class="container column is-fullhd">
	<div class="section">
		<div class="columns is-desktop is-multiline ">
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
							<h5 class="title is-5">{annonce.prix}</h5>
						{:else}
							<h5 class="title is-5 is-italic has-text-primary">Objet à donner</h5>
						{/if}
						<!--AnnonceState début-->
						{#if currentToogle == 'default'}
							{#if annonce.etat === 'E'}
								<span style="color:hsl(217, 71%, 53%) ; font-weight:bold">Annonce en attente </span>
								<a><i
										class="icon is-small fas fa-pause-circle"
										style="color:hsl(217, 71%, 53%)"
									/></a
								>
							{/if}
							{#if annonce.etat === 'V'}
								<span class=" has-text-primary-dark "> <b>Annonce validée </b></span>
								<a><i class="icon is-small has-text-primary-dark fas fa-check-circle" /></a>
							{/if}
							{#if annonce.etat === 'T'}
								<span class="" style="hsl(0, 0%, 29%)"> <b>Vendu</b></span>
								<a><i class="icon is-small fas fa-times-circle" style="hsl(0, 0%, 29%)" /></a>
							{/if}
							{#if annonce.etat === 'R'}
								<span style="color:#F98A0C ">  <b>Annonce réservée</b> </span>
								<a><i class="icon is-small fas fa-minus-circle" style="color:#F98A0C" /></a>
							{/if}
							{#if annonce.etat === 'A'}
								<span class="has-text-danger-dark" >
									<b>Annonce supprimée</b>
								</span>
								<a><i class="fas fa-times-circle icon is-small has-text-danger-dark" /></a>
							{/if}
						{/if}
						{#if annonce.etat === 'E' && admin}
							<div id="icon">
								<form on:submit|preventDefault={(e) => onChangeState(e, annonce)} method="POST">
									<button type="submit" id={annonce.id} value="V">
										En validée <a
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
										<span style="color:#F98A0C">Changer l'état en réservée </span><a
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
										<a type="submit" id={annonce.id} value="T"><i class="fas fa-times-circle" /></a>
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
