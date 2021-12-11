<script>
	import { onMount } from 'svelte';
	let USER;
	onMount(async () => {
		USER = JSON.parse(localStorage.getItem('user'));
	});
</script>

<div id="app" class="has-background-transparent">
	<nav class="navbar is-transparent is-size-5 ">
		<div class="navbar-brand">
			<a class="navbar-item" href="/">
				<p
					style="font-family: 'Brush Script MT', cursive;"
					class="is-size-1 has-text-weight-bold has-text-link "
				>
					Market Vinci
				</p>
			</a>
		</div>

		<div class="navbar-start">
			<a class="navbar-item" href="/"> Accueil </a>
			{#if USER != null}
				<a class="navbar-item" href="/myAnnonce"> Mes articles </a>
				<a class="navbar-item" href="/profile"> Profil </a>
				{#if USER.administrateur}
					<a class="navbar-item" href="/ban"> Bannir </a>
				{/if}
			{/if}
			<div class="navbar-item has-dropdown is-hoverable">
				<div class="navbar-dropdown is-boxed" />
			</div>
		</div>
		<div class="navbar-end">
			{#if USER == null}
				<a class="navbar-item" href="/login"> Connexion </a>

				<a class="navbar-item" href="/register"> Inscription </a>
			{/if}
			{#if USER != null}
				<a class="navbar-item" href="/logout"> Deconnexion </a>
			{/if}
		</div>
	</nav>
</div>

<style>
	.navbar {
		background-color: transparent;
		z-index: 2;
		padding: 15px 0;
		margin-top: auto;
		margin-bottom: auto;
	}
	.navbar-item {
		height: 25px;
		width: auto;
	}
	#app {
		padding-top: 12px;
		border-bottom: solid;
	}
	a {
		font-family: 'Nunito', sans-serif;
		font-size: 24px;
	}
</style>
