<script>
	import Navbar from '../../components/Navbar.svelte';
	import AnnonceServices from '../../services/annonceServices';
	import UserServices from '../../services/userServices';
	import { onMount } from 'svelte';
	import { is_empty } from 'svelte/internal';
	import { page } from '$app/stores';
	import ErrorPage from '../../components/ErrorPage.svelte';
	import MapsAnnonce from '../../components/MapsAnnonce.svelte';
	import Caroussel from '../../components/Caroussel.svelte';
	import LoadingAnimation from '../../components/LoadingAnimation.svelte';
	import { Snackbar, Button, Icon } from 'svelte-materialify';
	import { goto } from '$app/navigation';
	import { mdiPen } from '@mdi/js';
	import EditAnnonce from '../../components/EditAnnonce.svelte';

	const idAnnonce = $page.params.id;
	let annonce;
	let currentUser = ' ';
	let annonceCategorie;
	let vendeur;
	let snackbar = false;
	let notifMsg;
	let colorNotif;

	$: console.log(vendeur);
	$: console.log(currentUser);
	let component;
	let props;
	const showEditAnnonce = () => {
		component = EditAnnonce;
		props = {
			shown: true,
			currentAnnonce: annonce,
			vendeur_email: vendeur.email,
			categorie_nom: annonceCategorie,
			currentUser: currentUser
		};
	};
	onMount(async () => {
		currentUser = JSON.parse(sessionStorage.getItem('user'));
		if (!currentUser) return;
		try {
			let fetchAnnonce = await AnnonceServices.findAnnonceById(idAnnonce, currentUser.token);
			annonce = fetchAnnonce.data;
		} catch (error) {
			notifMsg = error;
			colorNotif = 'red';
			snackbar = true;
			setTimeout(() => {
				goto('/');
			}, 4500);
			return;
		}
		//Case where categorie is deleted == null
		if (annonce.categorie_id) {
			let fetchCategories = await AnnonceServices.findAllCategorie();
			annonceCategorie = fetchCategories.filter((c) => c.id == annonce.categorie_id)[0].nom;
		} else {
			annonceCategorie = '/';
		}

		let fetchVendeur = await UserServices.getUserById(annonce.vendeur_id, currentUser.token);
		vendeur = fetchVendeur.data;
	});
</script>

<Navbar />
<Snackbar
	top
	center
	rounded
	bind:active={snackbar}
	timeout={4000}
	style="background-color:{colorNotif}"
>
	{notifMsg}
</Snackbar>

{#if currentUser}
	{#if !annonce || !annonceCategorie || !vendeur}
		<LoadingAnimation />
	{:else}
		<div>
			<div
				class="max-w-2xl mx-auto py-24 px-4 grid items-center grid-cols-1 gap-y-16 gap-x-8 sm:px-6 sm:py-32 lg:max-w-7xl lg:px-8 lg:grid-cols-2"
			>
				<div>
					<div class="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
						{annonce.titre}
						{#if currentUser.id == vendeur.id}
							<Button
								fab
								size="small"
								class="blue darken-2 white-text"
								on:click={showEditAnnonce}
								style="float: right;"
							>
								<Icon path={mdiPen} />
							</Button>
						{/if}
					</div>
					{#if currentUser.id == vendeur.id}
						<svelte:component this={component} {...props} />
					{/if}
					<p class="mt-4 text-gray-500">
						{#if annonce.etat == 'E'}
							<b><i id="attente">En attente</i></b>
						{:else if annonce.etat == 'V'}
							<b><i id="validee"> Validé</i></b>
						{:else if annonce.etat == 'R'}
							<b><i id="reservee">Réservé</i></b>
						{:else if annonce.etat == 'T'}
							<b><i id="vendu">Vendu</i></b>
						{/if}
					</p>
					<h2 class="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl" id="prix">
						{#if !annonce.prix || annonce.prix == 0}
							Gratuit
						{:else}
							{annonce.prix} €
						{/if}
					</h2>
					<dl class="mt-16 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 sm:gap-y-16 lg:gap-x-8">
						<div class="border-t border-gray-200 pt-4">
							<dt class="font-medium text-gray-900">Description</dt>
							<dd class="mt-2 text-sm text-gray-500">{annonce.description}</dd>
						</div>
						<div class="border-t border-gray-200 pt-4">
							<dt class="font-medium text-gray-900">Genre</dt>
							<dd class="mt-2 text-sm text-gray-500">
								{#if annonce.genre == 'S'}
									Service
								{:else}
									Bien
								{/if}
							</dd>
						</div>
						<div class="border-t border-gray-200 pt-4">
							<dt class="font-medium text-gray-900">Vendeur</dt>
							<dd class="mt-2 text-sm text-gray-500">{vendeur.email}</dd>
						</div>
						<div class="border-t border-gray-200 pt-4">
							<dt class="font-medium text-gray-900">Categorie</dt>
							<dd class="mt-2 text-sm text-gray-500">{annonceCategorie}</dd>
						</div>
					</dl>
					<MapsAnnonce adresses={annonce.adresses} />
				</div>
				{#if !is_empty(annonce.urlPhoto)}
					<Caroussel {annonce} />
				{:else}
					<div class="card-image">
						<figure class="image is-5by3">
							<img src="/noimage.png" alt="imgs de l'annonce" class="bg-gray-100 rounded-lg" />
						</figure>
					</div>
				{/if}
			</div>
		</div>
	{/if}
{:else}
	<ErrorPage message="Vous devez etre connecté pour avoir acces a cette page" />
{/if}

<style>
	#prix {
		color: darkcyan;
		text-align: end;
	}
	#attente {
		color: red;
		font-size: large;
	}
	#validee {
		color: green;
		font-size: large;
	}
	#reservee {
		color: darkorange;
		font-size: large;
	}
	#vendu {
		color: black;
		font-size: large;
		font-size: large;
	}
	.card-image {
		margin-bottom: 500px;
	}
</style>
