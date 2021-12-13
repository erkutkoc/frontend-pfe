<script>
	import ErrorPage from '../../components/ErrorPage.svelte';
	import 'bulma/css/bulma.css';
	import AnnonceServices from '../../services/annonceServices.js';
	import { onMount } from 'svelte';
	let USER;
	let annonces = [];
	let admin;
	onMount(async () => {
		USER = JSON.parse(sessionStorage.getItem('user'));
		if (USER == null) return;
		const res = await AnnonceServices.findAllAnnonce();
		annonces = res;
		annonces = annonces.filter((annonce) => annonce.etat === 'E');
		admin = USER.administrateur;
	});
	function handleDelete(annonce) {
		let id = annonce.target[0].id;
	}
	function handleValidate(annonce) {
		let id = annonce.target[0].id;
	}
</script>

<main>
	<br />
	{#if admin}
		<div class="container">
			<div class="container is-fluid">
				{#each annonces as annonce (annonce.id)}
					<div class="columns  is-centered">
						<div class="card column is-four-fifths card-shadow has-background-white-bis">
							<div class="card-content">
								<span class="tag  is-medium" style="float:left">
									<a href={'/' + annonce.id} id="numero">Annonce n°{annonce.id}</a></span
								>
								<div style="float:right">
									<form
										on:submit|preventDefault={handleDelete}
										method="DELETE"
										style="display:inline-block"
									>
										<span class="tag is-danger is-medium">
											Supprimer l'annonce
											<button class="delete" type="submit" id={annonce.id} />
										</span>
									</form>
									<form
										on:submit|preventDefault={handleValidate}
										method="DELETE"
										style="display:inline-block"
									>
										<span class="tag is-primary is-medium">
											Valider l'annonce
											<button class="delete" type="submit" id={annonce.id} />
										</span>
									</form>
								</div>

								<span class="tag is-medium" style="float:right">
									<a href={'/' + annonce.id}>Voir les détails de l'annonce</a>
								</span>
							</div>
							<div class="card-content">
								<p class="title has-text-centered ">{annonce.titre}</p>
								<div class="content">
									<p class="has-text-centered">{annonce.description}</p>
								</div>
								<div class="content">
									<div class="has-text-right" style="display:inline-block; float:right">
										<span>{annonce.prix} €</span>
									</div>
									<div class="has-text-left" style="display:inline-block; float:left">
										{#if annonce.etat === 'E'}
											<span class="icon is-small" style="color:hsl(217, 71%, 53%)"
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
					</div>
					<br />
				{/each}
			</div>
		</div>{:else}
		<ErrorPage message={'Accès refusé'} />
	{/if}
</main>

<style>
	.tag {
		font-weight: bold;
	}
	a {
		margin: auto;
		height: auto;
		width: auto;
		font-weight: bold;
		color: hsl(171, 100%, 41%);
	}
</style>
