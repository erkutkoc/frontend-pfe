<script>
	export let annonce;
</script>
<div class="column card is-one-third">
	<div class="card-image">
		<figure>
			<img src="https://bulma.io/images/placeholders/1280x960.png" alt="Placeholder image"/>
		</figure>
	</div>
	<div class="card-content">
		<h4 class="title is-4">{annonce.titre}</h4>
		{#if annonce.prix != null}
			<h5 class="title is-5">{annonce.prix}</h5>
		{:else}
			<h5 class="title is-5 is-italic has-text-primary">Objet à donner</h5>
		{/if}
		<a class="button is-primary is-rounded is-pulled-right" id={annonce.id} href={'/' + annonce.id}>Voir les détails</a>
	</div>
</div>
