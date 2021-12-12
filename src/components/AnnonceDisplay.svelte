<script>
	import AnnonceState from './AnnonceState.svelte';
	import { onMount } from 'svelte';

	let admin = false;
	onMount(async () => {
		const USER = JSON.parse(sessionStorage.getItem('user'));
		if (USER == null) return;
		admin = USER.administrateur;
	});
	export let annonces;
</script>

<div class="container column is-fullhd">
	<div class="section">
		<div class="columns is-desktop is-multiline ">
			{#each annonces as annonce (annonce.id)}
				<div class="card column is-one-third">
					<div class="card-image">
						<figure class="image is-5by3">
							<img src="https://bulma.io/images/placeholders/128x128.png" alt="annonce image" />
						</figure>
					</div>

					<div class="card-content">
						<h4 class="title is-4">{annonce.titre}</h4>

						{#if annonce.prix != null}
							<h5 class="title is-5">{annonce.prix}</h5>
						{:else}
							<h5 class="title is-5 is-italic has-text-primary">Objet à donner</h5>
						{/if}

						Etat actuel

						{#if annonce.etat === 'E'}
							<a>
								<i class="icon is-small fas fa-pause-circle" style="color:hsl(217, 71%, 53%)" /></a
							>
							<span style="color:hsl(217, 71%, 53%)"> En attente</span>
						{:else if annonce.etat === 'V'}
							<a><i class="icon is-small has-text-primary-dark fas fa-check-circle" /></a>
							<span class=" has-text-primary-dark"> Validée</span>
						{:else if annonce.etat === 'T'}
							<a><i class="icon is-small fas fa-times-circle" style="hsl(0, 0%, 29%)" /></a>
							<span class="" style="hsl(0, 0%, 29%)"> Vendus</span>
						{:else if annonce.etat === 'R'}
							<a><i class="icon is-small fas fa-minus-circle" style="color:#F98A0C" /></a>

							<span style="color:#F98A0C"> Réservée</span>
						{:else if annonce.etat === 'A'}
							<a><i class="fas fa-times-circle icon is-small has-text-danger-dark" /></a>
							<span class="has-text-danger-dark"> Supprimer</span>
						{/if}
						<AnnonceState {annonce} homePage={false} />
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

<style>
	span {
		display: none;
		font-weight: bold;
	}
	a:hover + span {
		display: block;
	}
	#currentState {
		font-weight: bold;
	}
</style>
