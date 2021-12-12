<script>
    import { goto } from '$app/navigation';
    import { onMount } from 'svelte';
    
    onMount(async () => {
        sessionStorage.removeItem("user")
        goto("/login"); 
    })
   
</script>