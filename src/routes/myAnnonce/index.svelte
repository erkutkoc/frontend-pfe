<script>
		let USER;
	onMount(async () => {
		USER = JSON.parse(localStorage.getItem('user'));
	});
	import '../../styles/tailwind-output.css';
	import Navbar from '../../components/Navbar.svelte';
	import 'bulma/css/bulma.css';
	import Modal from '../../components/Modal.svelte';
	import AnnonceServices from '../../services/annonceServices.js';
	import { onMount } from 'svelte';
	import AnnonceList from '../../components/AnnonceList.svelte';
	let annoncesData = [];
	
	onMount(async () => {
		const res = await AnnonceServices.findAllAnnonceByEmail();
		annoncesData = res;
	});
	let currentToogle = 'default';
	let modal;
	let showStateDropdown = false;
	let filteredData = [];

	function handleFilter(filter) {
		if (currentToogle === 'E') {
			filteredData = annoncesData.filter((e) => e.etat == filter);
		}
		else if (currentToogle === 'V') {
			filteredData = annoncesData.filter((e) => e.etat == filter);
		}
		else if (currentToogle === 'T') {
			filteredData = annoncesData.filter((e) => e.etat == filter);
		}
		else if (currentToogle === 'R') {
			filteredData = annoncesData.filter((e) => e.etat == filter);
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
						<span>Articles</span>
					</a>
				</li>
				<li class={currentToogle === 'E' ? 'is-active' : ''}>
					<!-- svelte-ignore a11y-missing-attribute -->
					<a on:click={() => (currentToogle = 'E')}>
						<span class="icon is-small has-text-danger-dark"><i class="fas fa-pause-circle" /></span
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
						<span>Validée</span>
					</a>
				</li>
				<li class={currentToogle === 'R' ? 'is-active' : ''}>
					<!-- svelte-ignore a11y-missing-attribute -->
					<a on:click={() => (currentToogle = 'R')}>
						<span class="icon is-small" style="color:#F98A0C"
							><i class="fas fa-minus-circle" /></span
						>
						<span>Réservée</span>
					</a>
				</li>
				<li class={currentToogle === 'T' ? 'is-active' : ''}>
					<!-- svelte-ignore a11y-missing-attribute -->
					<a on:click={() => (currentToogle = 'T')}>
						<span class="icon is-small"><i class="fas fa-times-circle" /></span>
						<span>Vendus</span>
					</a>
				</li>
				<button class="button is-primary has-text-weight-bold is-outlined is-rounded is-medium" on:click={() => modal.showModal()}>Ajouter un article</button>
			</ul>
		</div>
	</div>
	<br>
	{#if currentToogle === 'default'}
		<AnnonceList annoncesData={annoncesData} showStateDropdown={showStateDropdown} />
	{:else }
		{#await handleFilter(currentToogle)}
			<p>Chargement des annonces...</p>
		{:then}
			<AnnonceList annoncesData={filteredData} showStateDropdown={showStateDropdown} />
		{/await}
	{/if}

</main>
{/if}
<style>
	img {
		border-radius: 8px;
		max-width: 45%;
		height: auto;
	}
	figure {
		text-align: center;
	}
</style>
