<script>
	import AnnonceState from './AnnonceState.svelte';

	import { onMount } from 'svelte';
	let admin;
	onMount(async () => {
		const USER = JSON.parse(sessionStorage.getItem('user'));
		if (USER == null) return;
		admin = USER.administrateur;
	});
	export let annoncesData;
</script>

<div class="container column is-fullhd">
	<div class="section">
		<div class="columns is-desktop is-multiline ">
			{#each annoncesData as annonce (annonce.id)}
				<div class="card column is-one-third">
					<div class="card-image">
						<figure class="image is-5by3">
							<img src={"https://backend-staging-pfe.herokuapp.com/medias/"+annonce.urlPhoto[0]} alt="annonce image" />
						</figure>
					</div>
					<div class="card-content">
						<h4 class="title is-4">{annonce.titre}</h4>
						{#if annonce.prix != null}
							<h5 class="title is-5">{annonce.prix}</h5>
						{:else}
							<h5 class="title is-5 is-italic has-text-primary">Objet à donner</h5>
						{/if}
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
						<a class="button is-primary is-rounded is-pulled-right" id={annonce.id} href={'/' + annonce.id}
							>Voir les détails</a
						>
					</div>
				
					
					
				</div>
			{/each}
		</div>
	</div>
</div>

<style>

</style>
