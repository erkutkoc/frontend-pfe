<script>
	import { onMount } from 'svelte';
	import Navbar from '../../components/Navbar.svelte';
	import UserServices from '../../services/userServices.js';
	import AnnonceServices from '../../services/annonceServices.js';
	import ErrorPage from '../../components/ErrorPage.svelte';
	import { Snackbar } from 'svelte-materialify';

	let snackbar = false;
	let notifMsg, colorNotif;

	let USER;
	onMount(async () => {
		USER = JSON.parse(sessionStorage.getItem('user'));
	});

	$: campus = [];

	function onSubmit(e) {
		const formData = new FormData(e.target);
		const data = [];

		// @ts-ignore
		for (let field of formData) {
			const [key, value] = field;
			data[key] = value;
		}
		if (data) fetchRegister(data);
	}
	const fetchRegister = async (data) => {
		let toSend = {
			email: data.email,
			motDePasse: data.password,
			campus_id: Number.parseInt(data.campus)
		};
		try {
			await UserServices.register(toSend).then((resp) => {
				notifMsg = resp.data;
				colorNotif = '#5bc0de'; //info, blue
				snackbar = true;
			});
		} catch (error) {
			notifMsg = error;
			colorNotif = 'red';
			snackbar = true;
		}
	};
	onMount(async () => {
		const allCampus = await AnnonceServices.getAllCampus();
		campus = allCampus.data;
	});
</script>

<main>
	<Navbar />
	<Snackbar
		top
		center
		rounded
		bind:active={snackbar}
		timeout={3000}
		style="background-color:{colorNotif}"
	>
		{notifMsg}
	</Snackbar>

	{#if !USER}
		<div
			class="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8"
			id="registerform"
		>
			<div class="max-w-md w-full space-y-8">
				<div>
					<h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">Inscription</h2>
				</div>
				<form on:submit|preventDefault={onSubmit} class="mt-8 space-y-6" action="#" method="POST">
					<input type="hidden" name="remember" value="true" />
					<div class="rounded-md shadow-sm -space-y-px">
						<div>
							<label for="email-address" class="sr-only">Email address</label>
							<input
								id="email-address"
								name="email"
								type="email"
								autocomplete="email"
								required
								class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
								placeholder="Adresse mail vinci"
								pattern="^[aA-zZ]+\.[aA-zZ]+@(student.)?vinci\.be$"
							/>
						</div>
						<div>
							<label for="password" class="sr-only">Mot de passe</label>
							<input
								id="password"
								name="password"
								type="password"
								autocomplete="current-password"
								required
								class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
								placeholder="Mot de passe"
							/>
						</div>
						<div>
							<label for="campus" class="sr-only">Campus</label>
							<select
								name="campus"
								class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
								style="background-color:rgb(232, 240, 254);"
							>
								<option value="">Choisissez votre campus</option>
								{#each campus as c}
									<option value={c.id}>{c.ville}</option>
								{/each}
							</select>
						</div>
					</div>
					<div>
						<button
							type="submit"
							class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
							style="color:white;"
						>
							<span class="absolute left-0 inset-y-0 flex items-center pl-3">
								<!-- Heroicon name: solid/lock-closed -->
								<svg
									class="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
									xmlns="http://www.w3.org/2000/svg"
									viewBox="0 0 20 20"
									fill="currentColor"
									aria-hidden="true"
								>
									<path
										fill-rule="evenodd"
										d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
										clip-rule="evenodd"
									/>
								</svg>
							</span>
							S'inscrire
						</button>
						<a
							class="has-text-warning-dark"
							href="/login"
							style="text-decoration: underline;font-style: italic;"
							>Vous avez un compte ?
						</a>
					</div>
				</form>
			</div>
		</div>
	{:else}
		<ErrorPage message="Vous êtes déjà connecté! Vous ne pouvez pas vous enregistrer !" link="/" />
	{/if}
</main>

<style>
	#registerform {
		margin-top: 200px;
		z-index: 100;
	}
</style>
