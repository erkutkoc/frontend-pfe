<script>
	import Navbar from '../../components/Navbar.svelte';
	import { onMount } from 'svelte';
	import Pusher from 'pusher-js';
	import DiscussionServices from '../../services/discussionServices.js';
	import UserServices from '../../services/userServices';
	import { Snackbar } from 'svelte-materialify';
	import LoadingAnimation from '../../components/LoadingAnimation.svelte';

	let emailSearched = '';
	let selectedDiscussion = null;
	let token;

	let discussions = [];
	let filteredDiscussions = [];
	let messages = [];
	let message = '';
	let newDiscussionEmail = '';
	let id;
	let loading = false;
	let snackbar = false;
	let errorNotification;

	let USER;
	onMount(() => {
		USER = JSON.parse(sessionStorage.getItem('user'));
		token = USER.token;
		id = USER.id;
		fetchDiscussions(token);
		/*
		Pusher.logToConsole = true;

		var pusher = new Pusher('93dc2573318267ee5994', {
		cluster: 'eu'
    	});

		var channel = pusher.subscribe('chat');
		channel.bind('message', function(data) {
		alert(JSON.stringify(data));
		});*/
	});

	const fetchMessages = async (token, discussionId) => {
		await DiscussionServices.getMessagesByDiscussion(token, discussionId).then((discussion) => {
			messages = discussion;
		});
	};

	const fetchDiscussions = async (token) => {
		let memberId = USER.id;
		await DiscussionServices.getDiscussions(token, memberId)
			.then((data) => {
				let idToFetch;
				data.map(async (d) => {
					if (d.membre1_id == id) idToFetch = d.membre2_id;
					else idToFetch = d.membre1_id;

					let emailDest;
					await UserServices.getUserById(idToFetch, token).then((member) => {
						emailDest = member.data.email;
					});
					discussions = [...discussions, { id: d.id, dest: emailDest }];
					filteredDiscussions = [...filteredDiscussions, { id: d.id, dest: emailDest }];
				});
			})
			.catch((error) => {
				console.log(error);
				errorNotification = "Cette discussion n'existe pas";
				snackbar = true;
			});
	};

	const postMessage = async (token, message, discussionId) => {
		await DiscussionServices.postMessage(token, message, discussionId).then((data) => {
			console.log(data);
		});
	};

	const postDiscussion = async (member) => {
		if (
			newDiscussionEmail.length > 0 &&
			newDiscussionEmail.localeCompare(USER.email) &&
			!discussions.find((d) => d.dest.localeCompare(newDiscussionEmail) == 0)
		) {
			await UserServices.getUserByEmail(newDiscussionEmail, token)
				.then(async (memberId) => {
					await DiscussionServices.postDiscussion(token, memberId.data, id)
						.then((data) => {
							let newDiscussion = { id: data.data.id, dest: newDiscussionEmail };
							discussions = [...discussions, newDiscussion];
							filteredDiscussions = [...filteredDiscussions, newDiscussion];
							loading = false;
						})
						.catch((error) => {
							console.log(error);
							errorNotification = 'Vous ne faites pas partie de cette discussion';
							snackbar = true;
						});
				})
				.catch((error) => {
					console.log('Bad email');
					loading = false;
					errorNotification = "L'email ne correspond à personne";
					snackbar = true;
				});
		} else {
			errorNotification = 'Il y a déjà une conversation avec cette personne';
			snackbar = true;
			loading = false;
		}
	};

	function handleInput(e) {
		emailSearched = e.target.value;
		filteredDiscussions = discussions.filter((d) =>
			d.dest.toUpperCase().startsWith(emailSearched.toUpperCase())
		);
	}

	const handleClickDiscussion = (discussion) => {
		console.log(discussion);
		selectedDiscussion = discussion.discussion;
		fetchMessages(token, selectedDiscussion.id);
	};

	const handleClickPost = () => {
		postDiscussion(newDiscussionEmail);
		loading = true;
	};

	const handleSubmit = () => {
		if (message.length > 0) postMessage(token, message, selectedDiscussion.id);
		message = '';
	};
</script>

<main>
	<Navbar />
	<Snackbar top center rounded bind:active={snackbar} timeout={1000} style="background-color:red">
		{errorNotification}
	</Snackbar>
	<div class="min-h-full flex items-center justify-center py-12 px-15 sm:px-6 lg:px-8">
		<div class="max-w-4xl w-full space-y-8">
			<div>
				<h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">Discussions:</h2>
			</div>
			<div>
				{#if selectedDiscussion == null}
					<div class="rounded-md shadow-sm -space-y-px">
						<div class="max-w-sm">
							<label for="email-address" class="sr-only">Email address</label>
							<input
								name="email"
								on:input={handleInput}
								placeholder="Rechercher un email"
								class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
							/>
						</div>
					</div>
					{#if filteredDiscussions.length == 0}
						<p class="has-text-centered">Désolé personne ne correspond à votre recherche</p>
					{:else}
						{#each filteredDiscussions as discussion}
							<div class="card cursor-pointer">
								<footer class="card-footer">
									<div
										class="card-footer-item"
										on:click={(e) => handleClickDiscussion({ discussion })}
									>
										<p>{discussion.dest}</p>
									</div>
								</footer>
							</div>
						{/each}
					{/if}
					<form
						on:submit|preventDefault={handleClickPost}
						class="mt-8 space-y-6"
						action="#"
						method="POST"
					>
						<input
							id="newDiscussionEmail"
							name="newDiscussionEmail"
							bind:value={newDiscussionEmail}
							type="text"
							required
							class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
							placeholder="Ecrivez l'email de votre destinataire"
						/>
						<button
							type="submit"
							style="color:white"
							class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
						>
							{#if loading}
								<span class="absolute left-0 inset-y-0 flex items-center pl-3">
									<!-- Heroicon name: solid/lock-closed -->
									<span class="absolute left-0 inset-y-0 flex items-center pl-3">
										<LoadingAnimation />
									</span>
								</span>
							{/if}
							Ajouter une conversation
						</button>
					</form>
				{:else}
					<button
						on:click={(e) => {
							selectedDiscussion = null;
							messages = [];
						}}
						class="relative justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
						>Retour
					</button>

					<div>
						{#each messages as message}
							<!--<div class="card">
								<footer class="card-footer"> 
									{#if message.envoyeur_id == id} 
										<div class="card-footer-item">
											<p class="absolute left-0 inset-y-0 flex items-center pl-3 has-background-primary-light">{message.texte}</p>
										</div>
									{:else}
										<div class="card-footer-item">
											<p class="absolute right-0 inset-y-0 flex items-center pl-3 has-background-info-dark">{message.texte}</p>
										</div>
									{/if}
									
								</footer>
							</div>-->
							{#if message.envoyeur_id == id}
								<div class="card">
									<footer class="card-footer relative max-w-xs has-background-primary-light">
										<div class="card-footer-item inset-y-0 left-0">
											<p class="">{message.texte}</p>
										</div>
									</footer>
								</div>
							{:else}
								<div class="card">
									<footer class="card-footer relative max-w-xs has-background-info-dark">
										<div class="card-footer-item inset-y-0 right-0">
											<p class="">{message.texte}</p>
										</div>
									</footer>
								</div>
							{/if}
						{/each}
					</div>

					<form
						on:submit|preventDefault={handleSubmit}
						class="mt-8 space-y-6"
						action="#"
						method="POST"
					>
						<input type="hidden" name="remember" value="true" />
						<div class="rounded-md shadow-sm -space-y-px">
							<div>
								<label for="message" class="sr-only">Ecrivez votre message</label>
								<input
									id="message"
									name="message"
									bind:value={message}
									type="text"
									required
									class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
									placeholder="Ecrivez votre message"
								/>
							</div>

							<div>
								<button
									type="submit"
									class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
									style="color:white"
								>
									Envoyer
								</button>
							</div>
						</div>
					</form>
				{/if}
			</div>
		</div>
	</div>
</main>
