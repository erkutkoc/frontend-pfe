<script>
	import Navbar from '../../components/Navbar.svelte';
	import ErrorPage from '../../components/ErrorPage.svelte';
	import Modal from '../../components/Modal.svelte';
	import AnnonceServices from '../../services/annonceServices';
	import { onMount } from 'svelte';
	import AnnonceDisplay from '../../components/AnnonceDisplay.svelte';
	import { usersAnnonces, usersFilteredAnnonces, isLoadingMyAnnonce } from './../../utils/stores.js';
	let loaded = false;
	let USER;
	onMount(async () => {
		USER = JSON.parse(sessionStorage.getItem('user'));
		if (USER == null) return;
		const res = await AnnonceServices.findAllAnnonceByEmail(USER).then((rep) => {
			$isLoadingMyAnnonce = false;
			return rep;
		});
		$usersAnnonces = res;
		loaded = true;
	});

	let currentToogle = 'default';
	let modal;

	function handleFilter(filter) {
		if (currentToogle === 'E') {
			$usersFilteredAnnonces = $usersAnnonces.filter((e) => e.etat == filter);
		} else if (currentToogle === 'V') {
			$usersFilteredAnnonces = $usersAnnonces.filter((e) => e.etat == filter);
		} else if (currentToogle === 'T') {
			$usersFilteredAnnonces = $usersAnnonces.filter((e) => e.etat == filter);
		} else if (currentToogle === 'R') {
			$usersFilteredAnnonces = $usersAnnonces.filter((e) => e.etat == filter);
		} else if (currentToogle === 'A') {
			$usersFilteredAnnonces = $usersAnnonces.filter((e) => e.etat == filter);
		}
	}
</script>

<Navbar />
{#if USER != null}
	<Modal bind:this={modal} />
	<main>
		<div class="container">
			<div class="tabs is-centered is-boxed is-medium">
				<ul>
					<li class={currentToogle === 'default' ? 'is-active' : ''}>
						<!-- svelte-ignore a11y-missing-attribute -->
						<a on:click={() => (currentToogle = 'default')}>
							<span class="icon is-small has-text-grey-lighter"><i class="fas fa-circle" /></span>
							<span>Annonces</span>
						</a>
					</li>
					<li class={currentToogle === 'E' ? 'is-active' : ''}>
						<!-- svelte-ignore a11y-missing-attribute -->
						<a on:click={() => (currentToogle = 'E')}>
							<span class="icon is-small" style="color : hsl(217, 71%, 53%)"
								><i class="fas fa-pause-circle" /></span
							>
							<span>En attente</span>
						</a>
					</li>
					<li class={currentToogle === 'V' ? 'is-active' : ''}>
						<!-- svelte-ignore a11y-missing-attribute -->
						<a on:click={() => (currentToogle = 'V')}>
							<span class="icon is-small has-text-primary-dark"
								><i class="fas fa-check-circle" /></span
							>
							<span>Validés</span>
						</a>
					</li>
					<li class={currentToogle === 'R' ? 'is-active' : ''}>
						<!-- svelte-ignore a11y-missing-attribute -->
						<a on:click={() => (currentToogle = 'R')}>
							<span class="icon is-small" style="color:#F98A0C"
								><i class="fas fa-minus-circle" /></span
							>
							<span>Réservés</span>
						</a>
					</li>
					<li class={currentToogle === 'T' ? 'is-active' : ''}>
						<!-- svelte-ignore a11y-missing-attribute -->
						<a on:click={() => (currentToogle = 'T')}>
							<span class="icon is-small"><i class="fas fa-times-circle" /></span>
							<span>Vendus</span>
						</a>
					</li>
					<li class={currentToogle === 'A' ? 'is-active' : ''}>
						<!-- svelte-ignore a11y-missing-attribute -->
						<a on:click={() => (currentToogle = 'A')}>
							<span class="icon is-small has-text-danger-dark"
								><i class="fas fa-times-circle" /></span
							>
							<span>Supprimés</span>
						</a>
					</li>
					<button
						class="button is-info has-text-weight-bold  is-rounded "
						on:click={() => modal.showModal()}>Ajouter un article</button
					>
				</ul>
			</div>
		</div>
		<br />
		{#if currentToogle === 'default'}
			<AnnonceDisplay annonces={$usersAnnonces}  {currentToogle}/>
		{:else}
			{#await handleFilter(currentToogle)}
				<p>Chargement des annonces...</p>
			{:then}
				<AnnonceDisplay annonces={$usersFilteredAnnonces} {currentToogle}/>
			{/await}
		{/if}
	</main>
{:else if loaded}
	<ErrorPage
		message="Connectez vous pour accéder à vos annonces !"
		link="/login"
		linkValue="Se connecter"
	/>
{/if}
