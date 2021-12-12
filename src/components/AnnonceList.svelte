<script>
	import Annonce from './Annonce.svelte';
	export let data;
</script>

<div class="container column is-10">
	<div class="section">
		<!--Annonce-->
		<div class="columns is-desktop is-multiline ">
			{#each data as annonce (annonce.id)}
				<Annonce {annonce} />
			{/each}
		</div>
	</div>
</div>
