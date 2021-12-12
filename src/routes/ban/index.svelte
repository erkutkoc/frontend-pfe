<script>
	import '../../styles/tailwind-output.css';
	import Member from '../../components/MemberLine.svelte';
	import Navbar from '../../components/Navbar.svelte';
	import { onMount } from 'svelte';

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
	});

	$: {
		console.log(`token `);
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
		if (e.target.checked) {
            baseMembers = bannedMembers
            banned = true
        }
		else {
            baseMembers = membersArray
            banned = false
        }
        filteredMembers = baseMembers
        if (emailSearched != "") filteredMembers = baseMembers.filter((m) => m.email.startsWith(emailSearched));
	}
</script>

<main>
	<Navbar />
	<div class="min-h-full flex items-center justify-center py-12 px-15 sm:px-6 lg:px-8">
		<div class="max-w-4xl w-full space-y-8">
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
					<input type="checkbox" name="seeBan" on:change={handleCheck} />
					<span>Cliquez pour voir les bannis</span>
				</div>
			</div>
			<div>
				{#if filteredMembers.length != 0}
					{#each filteredMembers as member}
						<Member email={member.email} id={member.id} token={token} banned={banned} banDate={member.banni ? member.banni.substring(0, 10) : null} />
					{/each}
				{:else if filtered}
					<p class="has-text-centered">Désolé personne ne correspond à votre recherche</p>
				{:else}
					{#each membersArray as member}
						<Member email={member.email} id={member.id} token={token} banned={banned} banDate={member.banni} />
					{/each}
				{/if}
			</div>
		</div>
	</div>
</main>
