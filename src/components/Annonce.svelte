<script>
	export let annonce;
	import AnnonceState from './AnnonceState.svelte';
</script>
<!-- Home screen -->
<div class="column card is-one-third">
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
		Etat actuel :

		<AnnonceState {annonce} homePage={true} />
		<a class="button is-primary is-rounded is-pulled-right" id={annonce.id} href={'/' + annonce.id}
			>Voir les détails</a
		>
	</div>
</div>

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
