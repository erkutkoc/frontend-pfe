<script>
	import { onMount } from 'svelte';
	import annonceServices from '../services/annonceServices';
	import categorieService from '../services/categorieService';
	let USER;
	let categories = [];
	let highCategories = [];
	let subCategories = [];
	let admin;
	let isSubCategorie = false;
	let isCategorie = false;
	let searchInput;
	let categorieInput;
	let subCategorieInput;
	let isManagement = false;
	let isCreateCat = false;
	let isCreateSubCat = false;
	let inputCategorieName;
	let inputSubCategorieName;
	let selectedCat = null;
	let updateId;
	let showUpdateInput = false;
	let categorieNameValue = null;
	let selectedAddSubmitSubCat = null;
	let displayAll = false;
	onMount(async () => {
		USER = JSON.parse(sessionStorage.getItem('user'));
		if (USER == null) return;
		admin = USER.administrateur;
		if (admin) {
			const res = await annonceServices.findAllCategorie();
			categories = res;
			categories = categories.filter((e) => e.suprimee != true);
			highCategories = categories.filter((e) => e.sur_categorie_id == null);
			subCategories = categories.filter((e) => e.sur_categorie_id != null);
		}
	});
	const resetFilter = () => {
		highCategories = categories.filter((e) => e.sur_categorie_id == null);
		subCategories = categories.filter((e) => e.sur_categorie_id != null);
		isCategorie = false;
		isSubCategorie = false;
		categorieInput = '';
		subCategorieInput = '';
	};
	function handleInput(e) {
		searchInput = e.target.value;
		if (e.target.id == 'categorie') {
			isCategorie = true;
			$: highCategories = highCategories.filter((c) => c.nom.startsWith(searchInput));
		}
		if (e.target.id == 'sous-categorie') {
			isSubCategorie = true;
			$: subCategories = subCategories.filter((c) => c.nom.startsWith(searchInput));
		}
	}
	function handleShow(e) {
		if (e.target.value == 'management') {
			isManagement = !isManagement;
		}
		if (e.target.value == 'createCat') {
			isCreateCat = !isCreateCat;
		}
		if (e.target.value == 'createSubCat') {
			isCreateSubCat = !isCreateSubCat;
		}
	}
	async function handleDelete(e) {
		categorieService.deleteCategorie(USER.token, e.target.id).then(function (result) {
			return result;
		});

		let deleteList = [];
		deleteList = categories.filter((c) => c.id == e.target.id || c.sur_categorie_id == e.target.id);
		deleteList.forEach((element) => {
			categories = categories.filter((e) => e.id != element.id);
		});
		highCategories = categories.filter((e) => e.sur_categorie_id == null);
		subCategories = categories.filter((e) => e.sur_categorie_id != null);
	}
	async function submitCategorie(e) {
		let toSend = {
			Nom: inputCategorieName
		};

		let data = await categorieService.addSubCategorie(toSend, USER.token).then(function (result) {
			return result.data;
		});
		categories.push(data);
		highCategories = categories.filter((e) => e.sur_categorie_id == null);
		subCategories = categories.filter((e) => e.sur_categorie_id != null);
	}
	async function submitSubCategorie(e) {
		let toSend = {
			Nom: inputSubCategorieName,
			Sur_categorie_id: selectedAddSubmitSubCat.id
		};

		let data = await categorieService.addSubCategorie(toSend, USER.token).then(function (result) {
			return result.data;
		});
		categories[categories.length] = data;
		highCategories = categories.filter((e) => e.sur_categorie_id == null);
		subCategories = categories.filter((e) => e.sur_categorie_id != null);
	}
	async function submitUpdate(e, categorie) {
		let toSend = checkUpdateValue(categorie);
		checkUpdateValue(categorie, toSend);
		let resp = await categorieService
			.updateCategorie(toSend, USER.token, admin, categorie.id)
			.then(function (result) {
				return result.data;
			});
		let index = categories.findIndex((e) => e.id == resp.id);
		categories[index] = resp;
		highCategories = categories.filter((e) => e.sur_categorie_id == null);
		subCategories = categories.filter((e) => e.sur_categorie_id != null);
		showUpdateInput = false;
		selectedCat = null;
		categorieNameValue = null;
	}

	const checkUpdateValue = (categorie) => {
		let toSend;
		if (selectedCat && categorieNameValue) {
			toSend = {
				Nom: categorieNameValue,
				Sur_categorie_id: selectedCat.id
			};
		} else if (selectedCat && !categorieNameValue) {
			toSend = {
				Nom: categorie.nom,
				Sur_categorie_id: selectedCat.id
			};
		} else if (!selectedCat && categorieNameValue) {
			toSend = {
				Nom: categorieNameValue,
				Sur_categorie_id: categorie.sur_categorie_id
			};
		} else if (!categorieNameValue) {
			toSend = {
				Nom: categorie.nom,
				Sur_categorie_id: categorie.sur_categorie_id
			};
		}
		return toSend;
	};
</script>

<div class="container column is-10">
	<button
		class="button is-primary is-outlined"
		id="displayAll"
		on:click={() => {
			if (!displayAll) {
				isCreateCat = true;
				isCreateSubCat = true;
				isManagement = true;
				displayAll = true;
			} else {
				isCreateCat = false;
				isCreateSubCat = false;
				isManagement = false;
				displayAll = false;
			}
		}}
		style="float:right"
		>{#if !displayAll}Afficher tout{:else}Fermer tout{/if}</button
	>

	<div class="section">
		<div class="card">
			<header class="card-header">
				<p class="card-header-title">Ajouter une catégorie</p>
				<button class="card-header-icon" value="createCat" id="create" on:click={handleShow}>
					<i class="fas fa-angle-down" />
				</button>
			</header>
			{#if isCreateCat}
				<div class="card-content">
					<form on:submit|preventDefault={submitCategorie}>
						<div class="field">
							<label class="label">Nom de la catégorie</label>
							<div class="control">
								<input
									class="input"
									type="text"
									bind:value={inputCategorieName}
									id="nomCategorie"
									placeholder="Entrez le nom de la catégorie"
								/>
							</div>
						</div>
						<button class="button is-primary is-fullwidth" type="submit">Ajouter</button>
					</form>
				</div>
			{/if}
		</div>
		<div class="card">
			<header class="card-header">
				<p class="card-header-title">Ajouter une sous-catégorie</p>
				<button class="card-header-icon" value="createSubCat" id="create" on:click={handleShow}>
					<i class="fas fa-angle-down" />
				</button>
			</header>
			{#if isCreateSubCat}
				<div class="card-content">
					<form on:submit|preventDefault={submitSubCategorie}>
						<div class="field">
							<label class="label">Nom de la sous-catégorie</label>
							<div class="control">
								<input
									class="input"
									type="text"
									bind:value={inputSubCategorieName}
									placeholder="Entrez le nom de la sous catégorie"
								/>
							</div>
						</div>
						<div class="select field">
							<select class="" bind:value={selectedAddSubmitSubCat}>
								{#each highCategories as hCategorie}
									<option value={hCategorie}>
										{hCategorie.nom}
									</option>
								{/each}
							</select>
						</div>
						<button class="button is-primary is-fullwidth">Ajouter</button>
					</form>
				</div>
			{/if}
		</div>
		<div class="card">
			<header class="card-header">
				<p class="card-header-title">Gérer les catégories</p>
				<button class="card-header-icon" value="management" id="management" on:click={handleShow}>
					<i class="fas fa-angle-down" />
				</button>
			</header>
			{#if isManagement}
				<div class="card-content">
					<div class="field">
						<div class={isCategorie ? 'control is-loading' : 'control'}>
							<input
								class="input"
								type="text"
								id="categorie"
								placeholder="Rechercher une catégorie"
								bind:value={categorieInput}
								on:input={handleInput}
							/>
						</div>
						<div class={isSubCategorie ? 'control is-loading' : 'control'}>
							<input
								class="input"
								type="text"
								id="sous-categorie"
								placeholder="Rechercher une sous catégorie"
								bind:value={subCategorieInput}
								on:input={handleInput}
							/>
						</div>
						<button class="button  is-primary is-fullwidth" on:click={resetFilter}>Reset</button>
					</div>
					{#each highCategories as hCategorie}
						<p class="subtitle" />
						<div class="content">
							<table>
								<thead>
									<tr>
										{#if showUpdateInput && updateId == hCategorie.id}
											<td
												><input
													class="input is-primary"
													type="text"
													placeholder={hCategorie.nom}
													bind:value={categorieNameValue}
													required
												/></td
											>
											<th>
												<button
													id={hCategorie.id}
													on:click={() => {
														showUpdateInput = false;
														updateId = hCategorie.id;
													}}
													class="button is-danger is-focused is-pulled-right is-small"
													style="width: 100px">Annuler</button
												>
												<button
													id={hCategorie.id}
													on:click={(e) => submitUpdate(e, hCategorie)}
													class="button is-info is-focused is-pulled-right is-small"
													style="width: 100px">Valider</button
												>
											</th>
										{:else if showUpdateInput == false}
											<th>{hCategorie.nom}</th>
											<th>
												<button
													id={hCategorie.id}
													on:click={handleDelete}
													class="button is-danger is-focused is-pulled-right is-small"
													style="width: 100px">Supprimer</button
												>
												<button
													id={hCategorie.id}
													on:click={() => {
														showUpdateInput = true;
														updateId = hCategorie.id;
													}}
													class="button is-info is-focused is-pulled-right is-small"
													style="width: 100px">Mettre à jour</button
												>
											</th>
										{/if}
									</tr>
								</thead>
								<tbody>
									{#each subCategories as sCategorie}
										{#if hCategorie.id == sCategorie.sur_categorie_id}
											<tr>
												{#if showUpdateInput && updateId == sCategorie.id}
													<td
														><input
															class="input is-primary"
															type="text"
															placeholder={sCategorie.nom}
															bind:value={categorieNameValue}
														/>
													</td><td>
														<div class="field select">
															<select bind:value={selectedCat}>
																{#each highCategories as cat}
																	<option value={cat}>
																		{cat.nom}
																	</option>
																{/each}
															</select>
														</div></td
													>
													<td>
														<button
															id={sCategorie.id}
															on:click={() => {
																showUpdateInput = false;
																updateId = sCategorie.id;
															}}
															class="button is-danger is-focused is-pulled-right is-small"
															style="width: 100px">Annuler</button
														>
														<button
															id={sCategorie.id}
															on:click={(e) => submitUpdate(e, sCategorie)}
															class="button is-info is-focused is-pulled-right is-small"
															style="width: 100px">Valider</button
														></td
													>
												{:else if showUpdateInput == false}
													<td>{sCategorie.nom}</td>
													<td>
														<button
															id={sCategorie.id}
															on:click={handleDelete}
															class="button is-danger is-focused is-pulled-right is-small"
															style="width: 100px">Supprimer</button
														>
														<button
															id={sCategorie.id}
															on:click={() => {
																showUpdateInput = true;
																updateId = sCategorie.id;
															}}
															class="button is-info is-focused is-pulled-right is-small"
															style="width: 100px">Mettre à jour</button
														>
													</td>
												{/if}
											</tr>
										{/if}
									{/each}
								</tbody>
							</table>
						</div>
					{/each}
				</div>
			{/if}
		</div>
	</div>
</div>
