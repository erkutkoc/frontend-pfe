<script>
    import { goto } from '$app/navigation';
    import { onMount } from 'svelte';
    import Navbar from '../../components/Navbar.svelte'
    
    onMount(async () => {
        sessionStorage.removeItem("user")
        goto("/login"); 
    })
   
</script>

<Navbar/>