<script>
	let shown = false;

	export function showModal() {
		shown = true;
	}
	export function hideModal() {
		shown = false;
	}
</script>

<div class={shown ? 'modal is-active' : 'modal'}>
	<div class="modal-background " />
	<div class="modal-card ">
		<header class="modal-card-head has-background-primary">
			<p class="modal-card-title has-text-centered has-text-white has-text-weight-bold">Ajouter un article</p>
			<button class="delete" on:click={hideModal} aria-label="close" />
		</header>
		<section class="modal-card-body">
			<div class="field">
				<label class="label">Titre</label>
				<div class="control">
					<input class="input" type="text" placeholder="Entrez un titre" />
				</div>
			</div>
			<div class="field">
				<label class="label">Prix</label>
				<div class="control">
					<input class="input" type="number" placeholder="Entrez un prix" />
				</div>
			</div>
			<label class="label">Genre</label>
			<div class="control">
				<input class="input" type="text" placeholder="Entrez un genre" />
			</div>
			<label class="label">Categorie</label>
			<div class="control">
				<input class="input" type="text" placeholder="Entrez un catégorie" />
			</div>

			<div class="field">
				<label class="label">Etat</label>
				<div class="control">
					<input class="input" type="text" placeholder="En attente" value="En attente" readonly />
				</div>
                <p class="help is-success has-text-weight-bold">La vente est mise "En attente" afin d'être valider</p>
			</div>

			<div class="field">
				<label class="label"> Description</label>
				<div class="control">
					<textarea class="textarea" placeholder="Textarea" />
				</div>
			</div>

			<div class="field is-grouped is-centered">
				<div
					style=" margin-left: auto; margin-right: auto;">
					<div class="control " style="display: inline;">
						<button class="button is-primary">Submit</button>
					</div>
					<div class="control" style="display: inline;">
						<button class="button is-link is-light">Cancel</button>
					</div>
				</div>
			</div>
		</section>
	</div>
</div>
