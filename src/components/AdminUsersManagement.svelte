<script>
	import Member from './MemberLine.svelte';
	import { onMount } from 'svelte';
	import LoadingAnimation from './LoadingAnimation.svelte';
	import UserServices from '../services/userServices.js';

	let membersArray = [];
	let bannedMembers = [];
	let filteredMembers = [];
	let baseMembers = [];
	let token, USER;
	let emailSearched = '';
	let filtered = false;
	let banned = false;
	let isLoadingAnnonces = true;

	onMount(() => {
		USER = JSON.parse(sessionStorage.getItem('user'));
		token = USER.token;
		fetchMembers(token)
	});


	const fetchMembers = async (token) => {
		await UserServices.getAllUsers(token).then((members) => {
			baseMembers = membersArray = members.data
				.filter((m) => new Date(m.banni).valueOf() < Date.now())
				.filter((m) => m.id != USER.id)
				.sort((a, b) => a.email.localeCompare(b.email));
			bannedMembers = members.data
				.filter((m) => new Date(m.banni).valueOf() > Date.now())
				.sort((a, b) => a.email.localeCompare(b.email));
			isLoadingAnnonces = false;
		})
		.catch((err) => {
			setTimeout(()=> {isLoadingAnnonces = false;}, 3000);
		})
	}

	function handleInput(e) {
		emailSearched = e.target.value;
		filteredMembers = baseMembers.filter((m) => m.email.toLowerCase().startsWith(emailSearched.toLowerCase()));
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

{#if !isLoadingAnnonces}
	{#if baseMembers.length != 0}
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
							<input type="button" name="seeBan" on:click={handleCheck} />
							<b style="color:white">Voir les bannis</b>
						</label>
						<p class="subtitle" />
						<div class="content">
							<table>
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
	{:else}
		<div id="center"><p>Aucun utilisateur à gérer !</p></div>
	{/if}
{:else}
	<LoadingAnimation />
{/if}

<style>
	#center {
		text-align: center;
		font-size: xx-large;
		font-style: italic;
		font-weight: bolder;
		position: absolute;
		margin: auto;
		top: 50%;
		bottom: 0;
		left: 0;
		right: 0;
	}
</style>
