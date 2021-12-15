<script>
	import Member from '../../components/MemberLine.svelte';
	import Navbar from '../../components/Navbar.svelte';
	import { onMount } from 'svelte';
	import UserServices from '../../services/userServices.js';

	let membersArray = []
    let bannedMembers = []
    let filteredMembers = []
    //sert de base pour les tris de string
    let baseMembers = []

	let token;
	let emailSearched = ''
	let filtered = false
    let banned = false;

	let USER;
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
		})
	}

	function handleInput(e) {
		emailSearched = e.target.value;
		filteredMembers = baseMembers.filter((m) => m.email.startsWith(emailSearched));
		filtered = true;
	}

	function handleCheck(e) {
		if (e.target.checked) {
            baseMembers = bannedMembers
            banned = true
        }
		else {
            baseMembers = membersArray
            banned = false
        }
        filteredMembers = baseMembers
        if (emailSearched != "") filteredMembers = baseMembers.filter((m) => m.email.toUpperCase().startsWith(emailSearched.toUpperCase()));
	}
</script>

<main>
	<Navbar />
	<div class="min-h-full  max-w-max flex items-center justify-center py-12 px-15 sm:px-6 lg:px-8">
		<div class="max-w-max w-full space-y-8">
			<div>
				<h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
					Voici l'ensemble des utilisateurs:
				</h2>
			</div>
			<div class="rounded-md shadow-sm -space-y-px">
				<div class="max-w-sm">
					<label for="email-address" class="sr-only">Email address</label>
					<input
						name="email"
						on:input={handleInput}
						placeholder="Rechercher un email"
						class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
					/>
					<div>
						<input type="checkbox" name="seeBan" on:change={handleCheck} />
						<span>Cliquez pour voir les bannis</span>
					</div>
				</div>
			</div>
			<div>
				{#if filteredMembers.length != 0}
					{#each filteredMembers as member}
						<Member email={member.email} id={member.id} token={token} banned={banned} banDate={member.banni ? member.banni.substring(0, 10) : null} admin={member.administrateur} />
					{/each}
				{:else if filtered}
					<p class="has-text-centered">Désolé personne ne correspond à votre recherche</p>
				{:else}
					{#each membersArray as member}
						<Member email={member.email} id={member.id} token={token} banned={banned} banDate={member.banni} admin={member.administrateur} />
					{/each}
				{/if}
			</div>
		</div>
	</div>
</main>
