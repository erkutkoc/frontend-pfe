<script>
	import Navbar from '../../components/Navbar.svelte';
</script>

<Navbar />

<section class="main-content columns is-fullheight">
	<aside class="column is-2 is-narrow-mobile is-fullheight section is-hidden-mobile">
		<p class="menu-label is-hidden-touch">Discussion</p>
		<ul class="menu-list">
			<!--Ton foreach avec les users  -->
			<li>
				<a href="#" class="has-text-info has-background-success-light"> Utilisateur </a>
			</li>
			<li>
				<a href="#" class="has-text-info has-background-success-light"> Utilisateur </a>
			</li>
			<li>
				<a href="#" class="has-text-info has-background-success-light"> Utilisateur </a>
			</li>
			<li>
				<a href="#" class="has-text-info has-background-success-light"> Utilisateur </a>
			</li>
			<li>
				<a href="#" class="has-text-info has-background-success-light"> Utilisateur </a>
			</li>
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
								<div style="heigth: 100%; width: 100%">
									<p style="padding: .26em; text-align:left; overflow-wrap: normal">
										<span class="tag is-medium is-success">Message Reçu</span><br /><span
											id="otherName">Prénom</span
										>
									</p>
								</div>
								<div style="heigth: 100%, width: 100%">
									<p style="padding:.25em; text-align:right; overflow-wrap: normal">
										<span class="tag is-medium is-info">Message Envoyé</span><br /><span
											id="name">Prénom</span
										>
									</p>
								</div>
								<div style="heigth: 100%; width: 100%">
									<p style="padding: .25em; text-align: left; overflow-wrap: normal">
										<span class="tag is-medium is-success">Message Reçu </span><br /><span
											id="otherName">Prénom</span
										>
									</p>
								</div>
                                
								<div style="heigth: 100%, width: 100%">
									<p style="padding:.25em; text-align:right; overflow-wrap: normal">
                                       
										<span class="tag is-medium is-info">Message Envoyé</span><br /><span
											id="name">Prénom</span
										>
									</p>
								</div>
                                <div style="heigth: 100%, width: 100%">
									<p style="padding:.25em; text-align:right; overflow-wrap: normal">
                                       
										<span class="tag is-medium is-info">Message Envoyé</span><br /><span
											id="name">Prénom</span
										>
									</p>
								</div>
								<!--Fin message-->
							</div>
						</div>
					</div>
				</div>

				<div class="hero-foot">
					<footer class="section is-small">
						<form>
							<div class="field has-addons">
								<div class="control is-expanded">
									<input class="input" name="userInput" type="text" placeholder="Votre message" />
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

<style>
    #name{
        color:hsl(204, 86%, 53%);
        font-weight: bold;
        font-size: xx-small;
        font-style: italic;
    }
    #otherName{
        color: hsl(171, 100%, 41%);
        font-weight: bold;
        font-size: xx-small;
        font-style: italic;
    }
</style>
