<script>
	import '../../styles/tailwind-output.css';
	import 'bulma/css/bulma.css';
	import Navbar from '../../components/Navbar.svelte';
	import AdminAnnonceManagement from '../../components/AdminAnnonceManagement.svelte';
	import AdminUsersManagement from '../../components/AdminUsersManagement.svelte';
	import AdminAnnonceCategorieManagement from '../../components/AdminAnnonceCategorieManagement.svelte';
	import ErrorPage from '../../components/ErrorPage.svelte';

	let currentToogle = 'default';

	function setToogle(value) {
		currentToogle = value;
	}
</script>

<Navbar />
<div id="app">
	<section class="main-content columns is-fullheight">
		<aside class="column is-2 is-narrow-mobile is-fullheight section is-hidden-mobile">
			<p class="menu-label is-hidden-touch">Gestion</p>
			<ul class="menu-list">
				<li>
					<a
						href="#"
						class={currentToogle == 'annonces' ? 'has-text-info has-background-success-light' : ''}
						on:click|preventDefault={() => setToogle('annonces')}
					>
						<span class="icon"><i class="fas fa-th-list" /></span> Annonces
					</a>
				</li>
				<li>
					<a
						href="#"
						class={currentToogle == 'utilisateurs'
							? 'has-text-info has-background-success-light'
							: ''}
						on:click|preventDefault={() => setToogle('utilisateurs')}
					>
						<span class="icon"><i class="fas fa-users-cog" /></span> Utilisateurs
					</a>
				</li>
				<li>
					<a
						href="#"
						class={currentToogle == 'categories'
							? 'has-text-info has-background-success-light'
							: ''}
						on:click|preventDefault={() => setToogle('categories')}
					>
						<span class="icon"><i class="fas fa-users-cog" /></span> Catégories
					</a>
				</li>
			</ul>
		</aside>

		{#if currentToogle == 'annonces' || currentToogle == 'default'}
			<AdminAnnonceManagement />
		{/if}
		{#if currentToogle == 'utilisateurs'}
			<AdminUsersManagement />{/if}
		{#if currentToogle == 'categories'}<AdminAnnonceCategorieManagement />{/if}
	</section>
</div>

<style>
	#app {
		min-height: 100%;
		height: 100%;
	}
</style>
