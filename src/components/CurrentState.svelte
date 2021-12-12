<script>
    export let annonce;
</script>
{#if annonce.etat === 'E'}
	<a> <i class="icon is-small fas fa-pause-circle" style="color:hsl(217, 71%, 53%)" /></a>
	<span style="color:hsl(217, 71%, 53%)"> En attente</span>
{:else if annonce.etat === 'V'}
	<a><i class="icon is-small has-text-primary-dark fas fa-check-circle" /></a>
	<span class=" has-text-primary-dark"> Validée</span>
{:else if annonce.etat === 'T'}
	<a><i class="icon is-small fas fa-times-circle" style="hsl(0, 0%, 29%)" /></a>
	<span class="" style="hsl(0, 0%, 29%)"> Vendus</span>
{:else if annonce.etat === 'R'}
	<a><i class="icon is-small fas fa-minus-circle" style="color:#F98A0C" /></a>

	<span style="color:#F98A0C"> Réservée</span>
{:else if annonce.etat === 'A'}
	<a><i class="fas fa-times-circle icon is-small has-text-danger-dark" /></a>
	<span class="has-text-danger-dark"> Supprimer</span>
{/if}