<script>
	export let id;
	export let email;
	export let token;
	export let banned;
	export let banDate;
	export let admin;

	import UserServices from '../services/userServices.js';
	import '../styles/tailwind-output.css';
    import colors from 'svelte-materialify/src/utils/colors';
	//import 'bootstrap/dist/css/bootstrap.min.css';

	let banDateY;
	let banDateM;
	let banDateD;

	if (banDate != null) {
		banDateY = banDate.substring(0, 4);
		banDateM = banDate.substring(5, 7);
		banDateD = banDate.substring(8, 10);
	}

	let bandDateFormat = banDateD + '/' + banDateM + '/' + banDateY;

	const ban = (e, duration) => {
		if (duration == 0) e.target.innerText = 'OK';
		else{ if(duration == 1) e.target.innerText = 'Banni pour 1 jour'; else if(duration == -1) e.target.innerText = 'Banni définitivement';}
		banUser(token, id, duration);
	};

	const banUser = async (token, id, duration) => {
		await UserServices.banUser(token, id, duration).then((data) => {});
	};

	const makeAdmin = (e) => {
		e.target.innerText = 'ADMIN';
		adminUser(token, id);
	};

	const adminUser = async (token, id) => {
		await UserServices.adminUser(token, id).then((data) => {
			console.log(data);
		});
	};
</script>

<tr>
	<td style="">{email}</td>
	<td style="">
		<div class="is-pulled-right">
            {#if !admin}
			{#if banned}
				<button class="button deep-purple accent-3" disabled> Banni jusqu'au {bandDateFormat}</button>
				<button on:click={(e) => ban(e, 0)} class="button blue darken-1">Supprimer le ban </button>
			{:else}
				<button on:click={(e) => ban(e, 1)} class="button red darken-1">Bannir 1 jour </button>

				<button on:click={(e) => ban(e, 30)} class="button red darken-3">Bannir 1 mois </button>

				<button on:click={(e) => ban(e, -1)} class="button red darken-4">Bannir définitivement </button>

				{#if admin}
					<button on:click={(e) => makeAdmin(e)} class="button blue darken-2" disabled>Déjà Admin </button>
				{:else}
					<button on:click={(e) => makeAdmin(e)} class="button green lighten-2">Rendre administrateur </button>
				{/if}
			{/if}{:else}<p class="red-text darken-1">Modification non autorisée !</p>{/if}
		</div></td
	>
</tr>

<style>
	button {
		width: 200px;
        color:white;
	}
</style>
