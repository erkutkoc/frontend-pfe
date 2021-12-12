<script>
	export let annonce;
	export let admin;
	import AnnonceServices from '../services/annonceServices.js';
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	let USER;
	onMount(async () => {
        USER = JSON.parse(localStorage.getItem("user"));
    })
	function onChangeState(updatedAnnonce) {
		if (updatedAnnonce) fetchUpdate(updatedAnnonce.target[0].value);
	}

	const fetchUpdate = async (state) => {
		let toSend = {
			Id : annonce.id,
			Titre: annonce.titre,
			Description: annonce.description,
			Prix: annonce.prix,
			Etat: state
		};
		
		let updated = AnnonceServices.updateAnnonce(toSend, USER.token).then(goto('/myAnnonce'));
		let up = updated;
	};
</script>

<div id="state">
	{#if annonce.etat === 'E' && admin}
		<div>
			<form on:submit|preventDefault={onChangeState} method="POST">
				<button
					class="button has-text-weight-bold"
					style="background:hsl(171, 100%, 29%); color:white"
					type="submit"
					id={annonce.id}
					value="V"
					>Changer l'état en Validée
				</button>
			</form>
		</div>
	{:else if annonce.etat === 'E'}
		<div>
			<form on:submit|preventDefault={onChangeState} method="POST">
				<button
					class="button has-text-weight-bold"
					style="background:hsl(171, 100%, 29%); color:white"
					type="submit"
					id={annonce.id}
					value="V"
					disabled
					>En attente de validation
				</button>
			</form>
		</div>
	{/if}
	{#if annonce.etat === 'V'}
		<div>
			<form on:submit|preventDefault={onChangeState} method="POST">
				<button
					class="button has-text-weight-bold"
					style="background:#F98A0C; color:white"
					type="submit"
					id={annonce.id}
					value="R">Changer l'état en Réservée</button
				>
			</form>
		</div>
		<div>
			<form on:submit|preventDefault={onChangeState} method="POST">
				<button
					class="button has-text-weight-bold"
					style="background:#404040; color:white"
					type="submit"
					id={annonce.id}
					value="T">Changer l'état en Vendu</button
				>
			</form>
		</div>
	{/if}
	{#if annonce.etat === 'R'}
		<div>
			<form on:submit|preventDefault={onChangeState} method="POST">
				<button
					class="button has-text-weight-bold"
					style="background:#404040; color:white"
					type="submit"
					id={annonce.id}
					value="T">Changer l'état en Vendu</button
				>
			</form>
		</div>
	{/if}
	{#if annonce.etat !== 'T' && annonce.etat !== 'A'}
		<div>
			<form on:submit|preventDefault={onChangeState} method="POST">
				<button
					class="button is-danger has-text-weight-bold"
					type="submit"
					id={annonce.id}
					value="A"
					>Supprimer l'annonce
				</button>
			</form>
		</div>
	{/if}
</div>

<style>
	#state {
		float: right;
		display: inline-block;
	}
	button {
		padding: 15px 32px;
		width: 100%;
	}
</style>
