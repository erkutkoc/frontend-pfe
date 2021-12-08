<script>
	import '../../styles/tailwind.css';
	import Navbar from '../../components/Navbar.svelte';
	import 'bulma/css/bulma.css';
	import Modal from '../../components/Modal.svelte';
	
	let currentToogle = 'default';
	let modal;
	let showStateDropdown = false;
</script>

<Navbar />
<Modal bind:this={modal}/>
<main>
	<div class="container">
		<div class="tabs is-centered is-boxed is-medium">
			<ul>
				<li class={currentToogle === 'default' ? 'is-active' : ''}>
					<a on:click={() => (currentToogle = 'default')}>
						<span>Mes Articles</span>
					</a>
				</li>
				<li class={currentToogle === 'sold' ? 'is-active' : ''}>
					<a on:click={() => (currentToogle = 'sold')}>
						<span>Vendus</span>
					</a>
				</li>
				<button
					class="button is-primary has-text-weight-bold is-outlined is-rounded is-medium"
					on:click={()=> modal.showModal()}>Ajouter un article</button
				>
			</ul>
		</div>
	</div>
	<br />

	{#if currentToogle === 'default'}
		<div class="container is-fluid">
			<div class="columns  is-centered">
				<div class="card column is-four-fifths">
					<div class="card-image">
						<div class="is-pulled-right">
							<div class={showStateDropdown  ? 'dropdown is-active' : 'dropdown'} >
								<div class="dropdown-trigger">
									<button class="button" aria-haspopup="true" aria-controls="dropdown-menu" on:click={()=> showStateDropdown=!showStateDropdown}>
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
							<img
								src="https://bulma.io/images/placeholders/1280x960.png"
								alt="Placeholder image"
							/>
						</figure>
					</div>
					<div class="card-content">
						<div class="media">
							<div class="media-content">
								<p class="title is-4">Erkut KOC</p>
								<p class="subtitle is-6">erkut.koc@student.vinci.be</p>
							</div>
						</div>

						<div class="content">
							Manteau en très bonne état, de couleur bleu taille M !
							<br />
							<time datetime="2016-1-1">11:09 PM - 1 Jan 2022</time>
						</div>
					</div>
				</div>
			</div>
		</div>
	{:else}
		<div class="container is-fluid" />
	{/if}

</main>

<style>
	img {
		border-radius: 8px;
		max-width: 45%;
		height: auto;
	}
	figure {
		text-align: center;
	}
</style>
