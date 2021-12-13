<script>
	import Navbar from '../../components/Navbar.svelte';
	import AdminAnnonceManagement from '../../components/AdminAnnonceManagement.svelte';
	import ErrorPage from '../../components/ErrorPage.svelte';
	import UsersManagement from '../../components/AdminUsersManagement.svelte';
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
						<span class="icon"><i class="fas fa-th-list"></i></span> Annonces
					</a>
				</li>
				<li>
					<a
						href="#"
						class={currentToogle == 'utilisateurs' ? 'has-text-info has-background-success-light' : ''}
						on:click|preventDefault={() => setToogle('utilisateurs')}
					>
						<span class="icon"><i class="fas fa-users-cog"></i></span> Utilisateurs
					</a>
				</li>
			</ul>
		</aside>

		{#if currentToogle == 'annonces' || currentToogle == 'default'}
			<AdminAnnonceManagement />
		{/if}
		{#if currentToogle == 'utilisateurs'}
			<UsersManagement />{/if}

	</section>
</div>

<style>
	#app {
		min-height: 100%;
		height: 100%;
	}
</style>
