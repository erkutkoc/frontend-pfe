<script>
	import AnnonceServices  from '../services/annonceServices.js';
	import { selectedCategorie } from '../utils/filterProperties.js';
	import { onMount } from 'svelte';
	let data = [];
	onMount(async () => {
		const res = await AnnonceServices.findAllAnnonce();
		data = res;
	});
</script>

{#if $selectedCategorie.id === undefined}
	<!--Annonce-->
	<div class="columns is-desktop is-multiline ">
		{#each data as annonce (annonce.id)}
			<div class="column card is-one-third">
				<div class="card-image">
					<figure>
						<img src="https://bulma.io/images/placeholders/1280x960.png" alt="Placeholder image" />
					</figure>
				</div>
				<div class="card-content">
					<h4 class="title is-4">{annonce.titre}</h4>
					{#if annonce.prix != null}
						<h5 class="title is-5">{annonce.prix}</h5>
					{:else}
						<h5 class="title is-5 is-italic has-text-primary">Objet à donner</h5>
					{/if}
					<a
						class="button is-primary is-rounded is-pulled-right"
						id={annonce.id}
						href={'/' + annonce.id}>Voir les détails</a
					>
				</div>
			</div>
		{/each}
	</div>

	<br />
{:else}
	<!--Annonce-->
	<div class="columns is-desktop is-multiline ">

			{#each data as annonce (annonce.id)}
				{#if annonce.categorie_id === $selectedCategorie.id}
					<div class="column card is-one-third">
						<div class="card-image">
							<figure>
								<img
									src="https://bulma.io/images/placeholders/1280x960.png"
									alt="Placeholder image"
								/>
							</figure>
						</div>
						<div class="card-content">
							<h4 class="title is-4">{annonce.titre}</h4>
							{#if annonce.prix != null}
								<h5 class="title is-5">{annonce.prix}</h5>
							{:else}
								<h5 class="title is-5 is-italic has-text-primary">Objet à donner</h5>
							{/if}
							<a
								class="button is-primary is-rounded is-pulled-right"
								id={annonce.id}
								href={'/' + annonce.id}>Voir les détails</a
							>
						</div>
					</div>
				{/if}
			{/each}
	</div>

	<br />
{/if}
