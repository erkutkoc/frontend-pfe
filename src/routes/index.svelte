<script>
	import '../styles/tailwind.css';
	import Navbar from '../components/Navbar.svelte';
    import Home from '../components/Home.svelte';
	import 'bulma/css/bulma.css';
	import { Container } from 'postcss';
</script>

<Navbar />
<Home/>

<div class="container">
	<nav class="pagination is-rounded" role="navigation" aria-label="pagination">
		<a class="pagination-previous">Previous</a>
		<a class="pagination-next">Next page</a>
		<ul class="pagination-list">
			<li><a class="pagination-link" aria-label="Goto page 1">1</a></li>
		</ul>
	</nav>
</div>
