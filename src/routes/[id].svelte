<script>
	import '../styles/tailwind-output.css';
	import AnnonceServices from '../services/annonceServices';
	import UserServices from '../services/userServices';
	import Navbar from '../components/Navbar.svelte';
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import ErrorPage from '../components/ErrorPage.svelte';
	import { Shadow } from 'svelte-loading-spinners';
	import { Splide, SplideSlide } from '@splidejs/svelte-splide';
	// import '@splidejs/splide/dist/css/splide.min.css';
	// import '@splidejs/splide/dist/css/themes/splide-skyblue.min.css';
  import '@splidejs/splide/dist/css/themes/splide-sea-green.min.css';
	// import '@splidejs/splide/dist/css/splide-core.min.css';

	const idAnnonce = $page.params.id;
	$: console.log(annonce);
	let annonce;
	let currentUser = ' ';
	let annonceCategorie;
	let vendeur;
	const videoTypes = [
		'ogm',
		'wmv',
		'mpg',
		'webm',
		'ogv',
		'mov',
		'asx',
		'mpeg',
		'mp4',
		'm4v',
		'avi'
	];
	// const imgTypes = ['tiff','pjp',	'jfif','bmp','gif',	'svg','png',	'xbm','dib',	'jxl','jpeg','svgz','jpg',	'webp','ico','tif','pjpeg','avif' ];

	onMount(async () => {
		currentUser = JSON.parse(localStorage.getItem('user'));
		let fetchAnnonce = await AnnonceServices.findAnnonceById(idAnnonce, currentUser.token);
		annonce = fetchAnnonce.data;

		let fetchCategories = await AnnonceServices.findAllCategorie();
		annonceCategorie = fetchCategories.filter((c) => c.id == annonce.categorie_id)[0];

		let fetchVendeur = await UserServices.getUserById(annonce.vendeur_id, currentUser.token);
		vendeur = fetchVendeur.data;
	});
</script>

<Navbar />

{#if currentUser}
	{#if !annonce || !annonceCategorie || !vendeur}
		<div id="loader">
			<Shadow size="100" color="#2c9b89" unit="px" duration="1s" />
		</div>
	{:else}
		<div class="bg-white">
			<div
				class="max-w-2xl mx-auto py-24 px-4 grid items-center grid-cols-1 gap-y-16 gap-x-8 sm:px-6 sm:py-32 lg:max-w-7xl lg:px-8 lg:grid-cols-2"
			>
				<div>
					<h2 class="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
						{annonce.titre}
					</h2>
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
							<dd class="mt-2 text-sm text-gray-500">{annonceCategorie.nom}</dd>
						</div>
					</dl>
					<div style="width: 100%">
						<br />
						<p class="font-medium text-gray-900" id="labelCarte">Carte :</p>
						<iframe
							id="map"
							title="map"
							SameSite="Strict"
							width="400"
							height="400"
							frameborder="0"
							scrolling="yes"
							marginheight="0"
							marginwidth="0"
							src="https://maps.google.com/maps?width=300&amp;height=300&amp;hl=en&amp;q={vendeur.adresse} &amp;t=p&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
						/>
					</div>
				</div>
				<Splide
					options={{
						rewind : true,
            autoplay : true,
            pauseOnHover : true,
            arrows :'slider',
						width: 450,
						gap: '1rem',
						type: 'slide', // slide or loop or fade -> animations 
            focus : 'center',
					}}
          hasSliderWrapper
				>
					{#each annonce.urlPhoto as photo}
						<SplideSlide>
							{#if videoTypes.includes(photo.split('.')[1])}
								<!-- svelte-ignore a11y-media-has-caption -->
								<video controls src="https://pfe-backend1.herokuapp.com/medias/{photo}" />
							{:else}
								<img
									src="https://pfe-backend1.herokuapp.com/medias/{photo}"
									alt="imgs de l'annonce"
									class="bg-gray-100 rounded-lg"
								/>
							{/if}
						</SplideSlide>
					{/each}
				</Splide>
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
	}
	#validee {
		color: green;
	}
	#reservee {
		color: orange;
	}
	#vendu {
		color: black;
	}
	#loader {
		margin: 0;
		position: absolute;
		top: 50%;
		left: 50%;
		margin-right: -50%;
		transform: translate(-50%, -50%);
	}
	#labelCarte {
		text-align: center;
	}
	#map {
		margin-left: auto;
		margin-right: auto;
	}
</style>
