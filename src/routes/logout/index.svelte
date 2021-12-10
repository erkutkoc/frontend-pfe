<script>
    import { goto } from '$app/navigation';
    import { userData } from '../../services/usersProperties.js';
    import { onMount } from 'svelte';
    
    onMount(async () => {
        document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
        userData.set(null);
        sessionStorage.removeItem("userData")
        goto("/login"); 
    })
   
</script>