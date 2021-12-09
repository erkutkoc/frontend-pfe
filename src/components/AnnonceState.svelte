<script>
	export let annonce;
	function onChange(e) {
		console.log(e.target.value);
		console.log(e.target.id);
	}
</script>

<div id="state">
	{#if annonce.etat === 'E'}
		<div>
			<button
				on:click={onChange}
				class="button has-text-weight-bold"
				style="background:hsl(171, 100%, 29%); color:white"
				type="submit"
				id={annonce.id}
				value="Validée"
				>Changer l'état en Validée
			</button>
		</div>
	{/if}
	{#if annonce.etat === 'V'}
		<div>
			<button
				on:click={onChange}
				class="button has-text-weight-bold"
				style="background:#F98A0C; color:white"
				type="submit"
				id={annonce.id}
				value="Réservée">Changer l'état en Réservée</button
			>
		</div>
		<div>
			<button
				on:click={onChange}
				class="button has-text-weight-bold"
				style="background:#404040; color:white"
				type="submit"
				id={annonce.id}
				value="Vendu">Changer l'état en Vendu</button
			>
		</div>
	{/if}
	{#if annonce.etat === 'R'}
		<div>
			<button
				on:click={onChange}
				class="button has-text-weight-bold"
				style="background:#404040; color:white"
				type="submit"
				id={annonce.id}
				value="Vendu">Changer l'état en Vendu</button
			>
		</div>
	{/if}
</div>

<style>
	#state {
		float: right;
		display: inline-block;
	}
	button{
		padding: 15px 32px;
		width:100%
	}
</style>
