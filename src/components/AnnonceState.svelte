<script>
	export let annonce;
	let admin = false;
	import CurrentState from './CurrentState.svelte';
	import AnnonceServices from '../services/annonceServices.js';
	import { annonces, filteredAnnonces } from '../utils/stores.js';
	import { onMount } from 'svelte';
	let USER;
	export let homePage;
	onMount(async () => {
		USER = JSON.parse(sessionStorage.getItem('user'));
		admin = USER.administrateur;
	});
	function onChangeState(updatedAnnonce) {
		if (updatedAnnonce) fetchUpdate(updatedAnnonce.target[0].value);
	}
	const fetchUpdate = async (state) => {
		let toSend = {
			Id: annonce.id,
			Titre: annonce.titre,
			Description: annonce.description,
			Prix: annonce.prix,
			Etat: state
		};
		if (admin) {
			console.log(annonce.id);
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
</script>

<CurrentState {annonce} />

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
					<a style="color:hsl(171, 100%, 29%)" type="submit" id={annonce.id} value="V"
						><i class="fas fa-check-circle" />
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
					<a style="color:#F98A0C" type="submit" id={annonce.id} value="R"
						><i class="fas fa-minus-circle" /></a
					>
				</button>
				<!-- <span style="color:#F98A0C">En résérvé</span> -->
			</form>
		</div>
		<div id="icon">
			<form on:submit|preventDefault={onChangeState} method="POST">
				<button type="submit" id={annonce.id} value="T">
					<a type="submit" id={annonce.id} value="T"><i class="fas fa-times-circle" /></a>
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

<style>
	#icon {
		display: inline-block;
	}
	span {
		display: none;
		font-weight: bold;
	}
	a:hover + span {
		display: block;
	}
</style>
