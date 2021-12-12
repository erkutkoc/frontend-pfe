<script>
	export let annonce;
	function handleDelete(annonce) {
		let id = annonce.target[0].value;
		console.log("delete"+id);
	}
	function handleValidate(annonce) {
		let id = annonce.target[0].value;
		console.log("validate"+id);
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
		<a class="button is-primary is-rounded is-pulled-right" id={annonce.id} href={'/' + annonce.id}
			>Voir les détails</a
		>
	</div>
</div>
