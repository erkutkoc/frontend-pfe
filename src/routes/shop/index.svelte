<script>
	import '../../styles/tailwind.css';
	import Navbar from '../../components/Navbar.svelte';
	import 'bulma/css/bulma.css';
	import { Container } from 'postcss';
</script>

<Navbar />
<div class="container ">
<div class="columns is-desktop">
	<div class="column ">
		<div class="select is-primary ">
			<select>
				<option value="category">Catégorie</option>
				<option value="campus">Campus</option>
				<option value="price">Prix</option>
			</select>
		</div>
	</div>
</div><br>
</div>
<!--Annonce-->
<div class="container">
	<div class="columns is-desktop is-multiline ">
		<div class="column card is-one-quarter">
			<div class="card-image">
				<figure>
					<img src="https://bulma.io/images/placeholders/1280x960.png" alt="Placeholder image" />
				</figure>
			</div>
			<div class="card-content">
				<h4 class="title is-4">Titre</h4>
				<h5 class="title is-5">prix</h5>
				<a class="button is-primary is-rounded is-pulled-right" href="/myArticles"
					>Voir les détails</a
				>
			</div>
		</div>
        <div class="column card is-one-quarter">
			<div class="card-image">
				<figure>
					<img src="https://bulma.io/images/placeholders/1280x960.png" alt="Placeholder image" />
				</figure>
			</div>
			<div class="card-content">
				<h4 class="title is-4">Titre</h4>
				<h5 class="title is-5">prix</h5>
				<a class="button is-primary is-rounded is-pulled-right" href="/myArticles"
					>Voir les détails</a
				>
			</div>
		</div>
        <div class="column card is-one-quarter">
			<div class="card-image">
				<figure>
					<img src="https://bulma.io/images/placeholders/1280x960.png" alt="Placeholder image" />
				</figure>
			</div>
			<div class="card-content">
				<h4 class="title is-4">Titre</h4>
				<h5 class="title is-5">prix</h5>
				<a class="button is-primary is-rounded is-pulled-right" href="/myArticles"
					>Voir les détails</a
				>
			</div>
		</div>
        <div class="column card is-one-quarter">
			<div class="card-image">
				<figure>
					<img src="https://bulma.io/images/placeholders/1280x960.png" alt="Placeholder image" />
				</figure>
			</div>
			<div class="card-content">
				<h4 class="title is-4">Titre</h4>
				<h5 class="title is-5">prix</h5>
				<a class="button is-primary is-rounded is-pulled-right" href="/myArticles"
					>Voir les détails</a
				>
			</div>
		</div>
        <div class="column card is-one-quarter">
			<div class="card-image">
				<figure>
					<img src="https://bulma.io/images/placeholders/1280x960.png" alt="Placeholder image" />
				</figure>
			</div>
			<div class="card-content">
				<h4 class="title is-4">Titre</h4>
				<h5 class="title is-5">prix</h5>
				<a class="button is-primary is-rounded is-pulled-right" href="/myArticles"
					>Voir les détails</a
				>
			</div>
		</div>
        <div class="column card is-one-quarter">
			<div class="card-image">
				<figure>
					<img src="https://bulma.io/images/placeholders/1280x960.png" alt="Placeholder image" />
				</figure>
			</div>
			<div class="card-content">
				<h4 class="title is-4">Titre</h4>
				<h5 class="title is-5">prix</h5>
				<a class="button is-primary is-rounded is-pulled-right" href="/myArticles"
					>Voir les détails</a
				>
			</div>
		</div>
        <div class="column card is-one-quarter">
			<div class="card-image">
				<figure>
					<img src="https://bulma.io/images/placeholders/1280x960.png" alt="Placeholder image" />
				</figure>
			</div>
			<div class="card-content">
				<h4 class="title is-4">Titre</h4>
				<h5 class="title is-5">prix</h5>
				<a class="button is-primary is-rounded is-pulled-right" href="/myArticles"
					>Voir les détails</a
				>
			</div>
		</div>  
	</div>
</div>
<br>
<!--Annonce fin !-->
<div class="container">
	<nav class="pagination is-rounded" role="navigation" aria-label="pagination">
		<a class="pagination-previous">Previous</a>
		<a class="pagination-next">Next page</a>
		<ul class="pagination-list">
			<li><a class="pagination-link" aria-label="Goto page 1">1</a></li>
		</ul>
	</nav>
</div>
