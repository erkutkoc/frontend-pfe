<script>
	import AnnonceState from './AnnonceState.svelte';

	import { onMount } from 'svelte';
	let admin;
	onMount(async () => {
		const USER = JSON.parse(localStorage.getItem('user'));
		if (USER == null) return;
		admin = USER.administrateur;
	});
	export let annoncesData;
</script>

{#each annoncesData as annonce (annonce.id)}
	<div class="container is-fluid">
		<div class="columns  is-centered">
			<div class="card column is-four-fifths">
				<div class="card-image">
					<AnnonceState {annonce} {admin} />
					<figure>
						<img src="https://bulma.io/images/placeholders/1280x960.png" alt="Placeholder image" />
					</figure>
				</div>
				<div class="card-content">
					<footer class="card-footer">
						<div class="card-footer-item">
							<p>{annonce.titre}</p>
						</div>
					</footer>
					<div class="card">
						<footer class="card-footer">
							<div class="card-footer-item">
								{#if annonce.prix != null}
									<p>{annonce.prix} €</p>
								{:else}
									<p>Objet à donner / Objet donner</p>
								{/if}
							</div>

							<div class="card-footer-item">
								{#if annonce.etat === 'E'}
									<span class="icon is-small" style="color:hsl(217, 71%, 53%)"
										><i class="fas fa-pause-circle" /></span
									>
									<span> En attente</span>
								{:else if annonce.etat === 'V'}
									<span class="icon is-small has-text-primary-dark"
										><i class="fas fa-check-circle" /></span
									>
									<span> Validée</span>
								{:else if annonce.etat === 'T'}
									<span class="icon is-small"><i class="fas fa-times-circle" /></span>
									<span> Vendus</span>
								{:else if annonce.etat === 'R'}
									<span class="icon is-small" style="color:#F98A0C"
										><i class="fas fa-minus-circle" /></span
									>
									<span> Réservée</span>
								{:else if annonce.etat === 'A'}
									<span class="icon is-small has-text-danger-dark"
										><i class="fas fa-times-circle" /></span
									>
									<span> Supprimer</span>
								{/if}
							</div>
						</footer>
					</div>
				</div>
			</div>
		</div>
	</div>
{/each}

<style>
	img {
		border-radius: 8px;
		max-width: 35%;
		height: auto;
		text-align: center;
		display: block;
		margin-left: 30%;
		margin-right: auto;
	}
	figure {
		text-align: center;
	}
</style>
