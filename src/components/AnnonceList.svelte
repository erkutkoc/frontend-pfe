<script>
	export let annoncesData;
	export let showStateDropdown;
</script>
{#each annoncesData as annonce  (annonce.id)}
	<div class="container is-fluid">
		<div class="columns  is-centered">
			<div class="card column is-four-fifths">
				<div class="card-image">
					<div class="is-pulled-right">
						<div class={showStateDropdown ? 'dropdown is-active' : 'dropdown'}>
							<div class="dropdown-trigger">
								<button
									class="button"
									aria-haspopup="true"
									aria-controls="dropdown-menu"
									on:click={() => (showStateDropdown = !showStateDropdown)}
								>
									<span>Dropdown button</span>
									<span class="icon is-small">
										<i class="fas fa-angle-down" aria-hidden="true" />
									</span>
								</button>
							</div>
							<div class="dropdown-menu" id="dropdown-menu" role="menu">
								<div class="dropdown-content">
									<a href="#" class="dropdown-item"> En attente </a>
									<hr class="dropdown-divider" />
									<a href="#" class="dropdown-item "> Validée </a>
									<a href="#" class="dropdown-item"> Réservée </a>
									<a href="#" class="dropdown-item"> Vendu </a>
								</div>
							</div>
						</div>
					</div>
					<figure>
						<img src="https://bulma.io/images/placeholders/1280x960.png" alt="Placeholder image" />
					</figure>
				</div>
				<div class="card-content">
					<div class="content">
						<p>{annonce.titre}</p>
						{#if annonce.prix != null}
							<p>{annonce.prix} €</p>
						{:else}
							<p>Objet à donner / Objet donner</p>
						{/if}
					</div>
					<div>
						{#if annonce.etat === 'E'}
							<span class="icon is-small has-text-danger-dark"
								><i class="fas fa-pause-circle" /></span
							>
							<span>En attente</span>
						{:else if annonce.etat === 'V'}
							<span class="icon is-small has-text-primary-dark"
								><i class="fas fa-check-circle" /></span
							>
							<span>Validée</span>
						{:else if annonce.etat === 'T'}
							<span class="icon is-small"><i class="fas fa-times-circle" /></span>
							<span>Vendus</span>
						{:else if annonce.etat === 'R'}
							<span class="icon is-small" style="color:#F98A0C"
								><i class="fas fa-minus-circle" /></span
							>
							<span>Réservée</span>
						{/if}
					</div>
				</div>
			</div>
		</div>
	</div>
{/each}

<style>
	img {
		border-radius: 8px;
		max-width: 45%;
		height: auto;
		text-align: center;
	}
	figure {
		text-align: center;
	}
</style>
