<script>
	export let annonce;
	import AnnonceState from './AnnonceState.svelte';
	function handleDelete(annonce) {
		let id = annonce.target[0].value;
		console.log('delete' + id);
	}
	function handleValidate(annonce) {
		let id = annonce.target[0].value;
		console.log('validate' + id);
	}
</script>

<!--
<div style="float:right">
	<form on:submit|preventDefault={handleValidate} method="PUT" style="display:inline-block">
		<button type="submit" value={annonce.id} style="color:green"><i class="fas fa-check" /></button>
	
	</form>
	<form on:submit|preventDefault={handleDelete} method="PUT" style="display:inline-block">
		<button type="submit" value={annonce.id} style="color:green"><i class="fas fa-check" /></button>
	
	</form>

</div>
-->
<div class="column card is-one-third">
	<div class="card-image">
		<figure class="image is-5by3">
			<img src="https://bulma.io/images/placeholders/1280x960.png" alt="Placeholder image" />
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
			<a> <i class="icon is-small fas fa-pause-circle" style="color:hsl(217, 71%, 53%)" /></a>
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
