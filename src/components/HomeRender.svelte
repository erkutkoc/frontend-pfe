<script>
	import Annonce from './Annonce.svelte';
	import Filter from './Filter.svelte';
</script>

<section class="main-content columns is-fullheight">
	<Filter />	
	<div class="container column is-10">
		<div class="section">
			<Annonce />
		</div>
	</div>
</section>
