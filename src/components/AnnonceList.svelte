<script>
	import Annonce from './Annonce.svelte';
	export let data;

</script>
<div class="container column is-10">
	<div class="section">
		<!--Annonce-->
		<div class="columns is-desktop is-multiline ">
			{#each data as annonce (annonce.id)}
					<Annonce {annonce} />
			{/each}
		</div>
		
	</div>
</div>
<!--
{#if !selectedCategorie && selectedMinPrice == -1 && selectedMaxPrice == -1 && !selectedCampus}


{:else}
	<div class="columns is-desktop is-multiline ">
		{#each data as annonce (annonce.id)}
			{#if selectedCategorie != null && selectedMaxPrice != -1 && selectedMinPrice != -1}
				{#if annonce.categorie_id == selectedCategorie.id && annonce.prix <= selectedMaxPrice && annonce.prix >= $selectedMinPrice}
					{#if annonce.etat != 'A' && annonce.etat != 'E'}
						<Annonce {annonce} />
					{/if}
				{/if}
			{:else if selectedCategorie != null && selectedMaxPrice != -1 && selectedMinPrice == -1}
				{#if annonce.categorie_id == selectedCategorie.id && annonce.prix <= selectedMaxPrice}
					{#if annonce.etat != 'A' && annonce.etat != 'E'}
						<Annonce {annonce} />
					{/if}
				{/if}
			{:else if selectedCategorie != null && selectedMaxPrice == -1 && selectedMinPrice != -1}
				{#if annonce.categorie_id == selectedCategorie.id && annonce.prix >= selectedMinPrice}
					{#if annonce.etat != 'A' && annonce.etat != 'E'}
						<Annonce {annonce} />
					{/if}
				{/if}
			{:else if selectedMaxPrice != -1 && selectedMinPrice != -1 && selectedCategorie == null}
				{#if annonce.prix <= selectedMaxPrice && annonce.prix >= selectedMinPrice}
					{#if annonce.etat != 'A' && annonce.etat != 'E'}
						<Annonce {annonce} />
					{/if}
				{/if}
			{:else if selectedCategorie != null && selectedMaxPrice == -1 && selectedMinPrice == -1}
				{#if annonce.categorie_id == $selectedCategorie.id}
					{#if annonce.etat != 'A' && annonce.etat != 'E'}
						<Annonce {annonce} />
					{/if}
				{/if}
			{:else if selectedMinPrice != -1 && selectedCategorie == null && selectedMaxPrice == -1}
				{#if annonce.prix >= $selectedMinPrice}
					{#if annonce.etat != 'A' && annonce.etat != 'E'}
						<Annonce {annonce} />{/if}
				{/if}
			{:else if selectedMaxPrice != -1 && selectedMinPrice == -1 && selectedCategorie == null}
				{#if annonce.prix <= selectedMaxPrice}
					{#if annonce.etat != 'A' && annonce.etat != 'E'}
						<Annonce {annonce} />
					{/if}
				{/if}
			{/if}
		{/each}
	</div>
{/if}
-->