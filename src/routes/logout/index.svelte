<script>
    import { goto } from '$app/navigation';
    import { onMount } from 'svelte';
    import { usersAnnonces, usersFilteredAnnonces, isLoadingMyAnnonce } from '../../utils/stores.js';
    import Navbar from '../../components/Navbar.svelte'
    
    onMount(async () => {
        $isLoadingMyAnnonce = true;
        sessionStorage.removeItem("user")
        goto("/login"); 
    })
   
</script>

<Navbar/>