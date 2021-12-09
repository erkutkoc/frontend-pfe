<script>
	export let annonce;
	function onChange(e){
		console.log(e.target.value);
		console.log(e.target.id);
	}
</script>
<div class="is-pulled-right">
	{#if annonce.etat === "E"}
	<button on:click={onChange} class="button has-text-weight-bold" style="background:hsl(171, 100%, 29%); color:white" type="submit" id={annonce.id} value="Validée" >Changer l'état en Validée </button>
	{/if}
	{#if annonce.etat === "V"}
	<button on:click={onChange} class="button has-text-weight-bold" style="background:#F98A0C; color:white" type="submit" id={annonce.id} value="Réservée">Changer l'état en Réservée</button>
	{/if}
	{#if annonce.etat === "R"}
	<button on:click={onChange} class="button has-text-weight-bold"  style="background:#404040; color:white" type="submit" id={annonce.id} value="Vendu">Changer l'état en Vendu</button>
	{/if}
</div>


