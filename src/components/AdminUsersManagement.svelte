<script>
	import Member from './MemberLine.svelte';
	import { onMount } from 'svelte';

	let membersArray = [];
	let bannedMembers = [];
	let filteredMembers = [];
	//sert de base pour les tris de string
	let baseMembers = [];

	let token;
	let emailSearched = '';
	let filtered = false;
	let banned = false;

	let USER;
	onMount(() => {
		USER = JSON.parse(sessionStorage.getItem('user'));
		token = USER.token;
	});

	$: {
		let promise = fetchMembers();
		promise
			.then((result) => {
				baseMembers = membersArray = result
					.filter((m) => new Date(m.banni).valueOf() < Date.now())
					.filter((m) => m.id != USER.id)
					.sort((a, b) => a.email.localeCompare(b.email));
				bannedMembers = result
					.filter((m) => new Date(m.banni).valueOf() > Date.now())
					.sort((a, b) => a.email.localeCompare(b.email));
			})
			.catch((err) => console.log(err));
	}

	async function fetchMembers() {
		if (token == undefined) return [];
		const response = await fetch('https://pfe-backend1.herokuapp.com/Members', {
			headers: { 'Content-Type': 'application/json', Authorization: token },
			method: 'GET'
		});
		const resp = await response.json();

		if (response.ok) {
			return resp;
		} else {
			throw new Error(text);
		}
	}

	function handleInput(e) {
		emailSearched = e.target.value;
		filteredMembers = baseMembers.filter((m) => m.email.startsWith(emailSearched));
		filtered = true;
	}

	function handleCheck(e) {
		if (e.target.name == 'seeBan' && banned == false) {
			baseMembers = bannedMembers;
			banned = true;
		} else {
			baseMembers = membersArray;
			banned = false;
		}
		filteredMembers = baseMembers;
		if (emailSearched != '')
			filteredMembers = baseMembers.filter((m) => m.email.startsWith(emailSearched));
	}
</script>

<div class="container column is-10">
	<div class="section">
		<div class="card">
			<div class="max-w-sm">
				<label for="email-address" class="sr-only">Email address</label>
			</div>
			<div class="card-content">
				<div class="field">
					<input
						name="email"
						on:input={handleInput}
						placeholder="Rechercher un email"
						class="input"
					/>
				</div>
				<label class="button blue darken-1">
					<input
						type="button"
					
						name="seeBan"
						on:click={handleCheck}
					/>
					<b style="color:white">Voir les bannis</b>
				</label>
				<p class="subtitle" />
				<div class="content">
					<table>
						<tr>
							<th>Company</th>
							<th />
						</tr>
						{#if filteredMembers.length != 0}
							{#each filteredMembers as member}
								<Member
									email={member.email}
									id={member.id}
									{token}
									{banned}
									banDate={member.banni ? member.banni.substring(0, 10) : null}
									admin={member.administrateur}
								/>
							{/each}
						{:else if filtered}
							<p class="has-text-centered">Désolé personne ne correspond à votre recherche</p>
						{:else}
							{#each membersArray as member}
								<Member
									email={member.email}
									id={member.id}
									{token}
									{banned}
									banDate={member.banni}
									admin={member.administrateur}
								/>
							{/each}
						{/if}
					</table>
				</div>
			</div>
		</div>
	</div>
</div>

<style>
</style>
