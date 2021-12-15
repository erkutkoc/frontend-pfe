<script>
	import Navbar from '../../components/Navbar.svelte';
	import { onMount } from 'svelte';
	import Pusher from 'pusher-js';
	import DiscussionServices from '../../services/discussionServices.js';
	import UserServices from '../../services/userServices';
	import { Snackbar } from 'svelte-materialify';
	import LoadingAnimation from '../../components/LoadingAnimation.svelte';
	//import Design from '/design.svelte';

	let emailSearched = '';
	let selectedDiscussion = null;
	let token;

	let discussions = [];
	let filteredDiscussions = [];
	let messages = [];
	let message = '';
	let newDiscussionEmail = '';
	let id;
	let otherName = ''
	let loading = false;
	let snackbar = false;
	let errorNotification;

	let USER;
	onMount(() => {
		USER = JSON.parse(sessionStorage.getItem('user'));
		token = USER.token;
		id = USER.id;
		fetchDiscussions(token);
		
		Pusher.logToConsole = true;

		var pusher = new Pusher('93dc2573318267ee5994', {
		cluster: 'eu'
    	});

		var channel = pusher.subscribe('chat');
		channel.bind('message', function(data) {
			console.log(data)
			let msg = {id: data.Id, discussion_id: data.discussion_id, envoyeur_id: data.Envoyeur_id, texte: data.Texte, date_envoi: data.Date_envoi}
			messages = [...messages, msg];
		});
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
		await DiscussionServices.postMessage(token, message, discussionId).then((data) => {});
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
	<script src="https://js.pusher.com/7.0.3/pusher.min.js"></script>
	<Snackbar top center rounded bind:active={snackbar} timeout={1000} style="background-color:red">
		{errorNotification}
	</Snackbar>
	<Navbar />

	<section class="main-content columns is-fullheight">
		<aside class="column is-2 is-narrow-mobile is-fullheight section is-hidden-mobile">
			<p class="menu-label is-hidden-touch">Discussion</p>
			<ul class="menu-list">
				{#each filteredDiscussions as discussion}
					<li>
						<a href="#" class="has-text-info has-background-success-light" on:click={(e) => handleClickDiscussion({ discussion })}>
							{discussion.dest}
						</a>
					</li>
				{/each}
			</ul>
		</aside>
		<!-- Code css/html inspirée par : https://codepen.io/christylaguardia/pen/mxPmbg?editors=0010 
			Modifié et adapter à notre design-->
		<div class="container column is-10">
			<div class="section">
				<section class="hero" style="background-color: rgba(32,156,238, 0.15);">
					<div class="hero-body">
						<div class="card" style="heigth: 100%; width: 100%">
							<div class="card-content" style="; opacity : 0.7">
								<div class="content">
									<!--Message-->
									{#each messages as message}
										{#if message.envoyeur_id != id} 
											<div style="heigth: 100%; width: 100%">
												<p style="padding: .26em; text-align:left; overflow-wrap: normal">
													<span class="tag is-medium is-success">{message.texte}</span><br /><span
														id="otherName">{selectedDiscussion.dest}</span
													>
												</p>
											</div>
										{:else}
											<div style="heigth: 100%, width: 100%">
												<p style="padding:.25em; text-align:right; overflow-wrap: normal">
													<span class="tag is-medium is-info">{message.texte}</span><br /><span
														id="name">Moi</span
													>
												</p>
											</div>
										{/if}
									{/each}
									<!--Fin message-->
								</div>
							</div>
						</div>
					</div>

					<div class="hero-foot">
						<footer class="section is-small">
							<form on:submit|preventDefault={handleSubmit} action="#" method="POST">
								<div class="field has-addons">
									<div class="control is-expanded">
										<input class="input" name="userInput" type="text" placeholder="Votre message" bind:value={message} />
									</div>
									<div class="control">
										<button class="button is-info"> Envoyer </button>
									</div>
								</div>
							</form>
						</footer>
					</div>
				</section>
			</div>
		</div>
	</section>

</main>
