<script>
	import Navbar from '../../components/Navbar.svelte';
	import '../../styles/tailwind-output.css';
	import {onMount} from 'svelte';
	import Pusher from 'pusher-js';

	onMount(() => {
        Pusher.logToConsole = true;
        const pusher = new Pusher('93dc2573318267ee5994', {
            cluster: 'eu'
        });
        
		const channel = pusher.subscribe('chat');
        channel.bind('message', data => {
            messages = [...messages, data];
        });
    })


	let emailSearched = '';
	let selectedDiscussion = null;

	let discussions = [
		{intender:"Xavier", lastMessage:"lmqjsdlfjqsmdlfjqsldj"}, 
		{intender:"Linet", lastMessage:"qsdmfljqmsldjfmlqsjd"}
	];
	let filteredDiscussions = [];

	let messages = [];
	filteredDiscussions = discussions

	//j'imagine qu'il faudra ajouter au moins une table en db dont on récupère les données ici
	//on met un champ dernier message direct dans la conversation ?

	//sert pour la recherche d'une discussion
	function handleInput(e) {
		emailSearched = e.target.value;
        filteredDiscussions = discussions.filter((d) => d.intender.toUpperCase().startsWith(emailSearched.toUpperCase()));
	}

	//probablement plus opti de charger les messages de la conv ici
	//je sais pas si c'est mieux de les trier par date en back ou en front
	const handleClickDiscussion = (discussion) => {
		selectedDiscussion = discussion;
	};

    //requête post
    const handleSubmit = (discussion) => {
		console.log('dans le submit');

		/*
		await fetch('http://localhost:8000/api/messages', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                username,
                message
            })
        });
        message = '';
		*/

	};

</script>

<main>
	<Navbar />
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
						<div class="card">
							<footer class="card-footer">
								
								<div 
									class="card-footer-item column is-two-fifths pointer cursor-pointer"
									on:click={(e) => handleClickDiscussion({discussion})}
								>
									<p>{discussion.intender}</p>
								</div>

								<div class="card-footer-item">
									<p>{discussion.lastMessage}</p>
								</div>
					
							</footer>
						</div>
					{/each}
					{/if}
				{:else}
					<button
						on:click={(e) => (selectedDiscussion = null)}
						class="relative justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
						>Retour
					</button>

					<!--{#each messages as message}
                        <div class="card">
                            <footer class="card-footer">  
                                <div class="card-footer-item">
                                    <p>{message.texte}</p>
                                </div>
                            </footer>
                        </div>
                    {/each}-->

					<div class="card">
						<footer class="card-footer">
							<div class="card-footer-item">
								<p>Message</p>
							</div>
						</footer>
					</div>
                    <form on:submit|preventDefault={handleSubmit} class="mt-8 space-y-6" action="#" method="POST">
                        <input type="hidden" name="remember" value="true" />
                        <div class="rounded-md shadow-sm -space-y-px">
                            <div>
                                <label for="message" class="sr-only">Ecrivez votre message</label>
                                <input
                                    id="message"
                                    name="message"
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
                                >
                                    Envoyer
                                </button>
                            </div>
                    </form>
				{/if}
			</div>
		</div>
	</div>
</main>
