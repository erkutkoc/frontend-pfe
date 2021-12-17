<script>
	import { Shadow } from 'svelte-loading-spinners';
</script>

<div id="loader">
	<Shadow size="100" color="#2c9b89" unit="px" duration="1s" />
</div>

<style>
	#loader {
		margin: 0;
		position: absolute;
		top: 50%;
		left: 50%;
		margin-right: -50%;
		transform: translate(-50%, -50%);
		z-index: 100;
	}
</style>
