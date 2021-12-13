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
							<img src="https://backend-staging-pfe.herokuapp.com/medias/photoUrl[0]" alt="annonce image" />
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
