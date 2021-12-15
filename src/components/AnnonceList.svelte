<script>
	import Annonce from './Annonce.svelte';

	export let annonces;
</script>

<div class="container column is-10">
	<div class="section">
		<!--Annonce-->
		<div class="columns is-desktop is-multiline ">
			{#each annonces as annonce (annonce.id)}
				<Annonce {annonce} />		
			{/each}
		</div>
	</div>
</div>
