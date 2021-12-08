<script>

</script>
<div id="app" class="has-background-primary">
	<nav class="navbar is-primary is-size-5 ">
		<div class="navbar-brand">
			<a class="navbar-item" href="/">
        <p style ="font-family: 'Brush Script MT', cursive;" class="is-size-1 has-text-weight-bold has-text-success-light">Market Vinci</p>
			</a>
			<div class="navbar-burger" data-target="navbarExampleTransparentExample">
				<span />
				<span />
				<span />
			</div>
		</div>

		<div class="navbar-menu">
			<div class="navbar-start">
				<a class="navbar-item" href="/myAnnonce"> Mes articles </a>
				<a class="navbar-item" href="/persons"> Persons </a>
				<div class="navbar-item has-dropdown is-hoverable">
					<div class="navbar-dropdown is-boxed">
					</div>
				</div>
				<a class="navbar-item" href="/login"> Connexion </a>
				<a class="navbar-item" href="/register"> Inscription </a>
				<a class="navbar-item" href="/logout"> Deconnexion </a>
			</div>
		</div>
	</nav>
</div>

<style>
	.navbar {
		background-color: transparent;
		z-index: 2;
		padding: 20px 0;
    margin-top: auto;
    margin-bottom: auto;
	}
	.navbar-item {
		height: 25px;
		width: auto;
	}
	#app {
		font-family: 'Avenir', Helvetica, Arial, sans-serif;
		padding-top: 20px;
	}
  a{
    font-family: 'Comic Sans MS';
    font-size:24px;
  }
</style>
