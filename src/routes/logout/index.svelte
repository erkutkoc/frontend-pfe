<script>
    import { goto } from '$app/navigation';
    import { onMount } from 'svelte';
    
    onMount(async () => {
        localStorage.removeItem("user")
        goto("/login"); 
    })
   
</script>