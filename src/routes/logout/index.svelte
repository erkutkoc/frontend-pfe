<script>
    import { goto } from '$app/navigation';
    
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
    goto("/login"); 
</script>