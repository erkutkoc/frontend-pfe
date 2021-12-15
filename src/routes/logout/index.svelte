<script>
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	import { isLoadingMyAnnonce } from '../../utils/stores.js';

	onMount(async () => {
		$isLoadingMyAnnonce = true;
		sessionStorage.removeItem('user');
		goto('/login');
	});
</script>
