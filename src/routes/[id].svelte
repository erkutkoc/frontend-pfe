<script>
    import "../styles/tailwind-output.css";
    import AnnonceServices from "../services/annonceServices";
    import UserServices from "../services/userServices";
    import Navbar from "../components/Navbar.svelte";
    import { onMount } from 'svelte';
    import { page } from '$app/stores';
    import ErrorPage from "../components/ErrorPage.svelte";
    import { Shadow } from 'svelte-loading-spinners';

    $ : console.log(vendeur)
    let annonce;
    let currentUser;
    let annonceCategorie;
    let vendeur;
    const idAnnonce = $page.params.id;

    onMount(async () => {
        currentUser = JSON.parse(localStorage.getItem("user"));
        let fetchAnnonce =  await AnnonceServices.findAnnonceById(idAnnonce,currentUser.token);
        annonce = fetchAnnonce.data;

        let fetchCategories = await AnnonceServices.findAllCategorie();
        annonceCategorie = fetchCategories.filter(c => c.id == annonce.categorie_id)[0];

        let fetchVendeur = await UserServices.getUserById(annonce.vendeur_id,currentUser.token);
        vendeur = fetchVendeur.data;
    })
</script>
  <Navbar/>

{#if currentUser}
  {#if !annonce || !annonceCategorie|| !vendeur}
    <div id="loader">
      <Shadow size="100" color="#2c9b89" unit="px" duration="1s"></Shadow>
    </div>
  {:else}
  <div class="bg-white">
      <div class="max-w-2xl mx-auto py-24 px-4 grid items-center grid-cols-1 gap-y-16 gap-x-8 sm:px-6 sm:py-32 lg:max-w-7xl lg:px-8 lg:grid-cols-2">
        <div>
          <h2 class="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">{annonce.id}# {annonce.titre}</h2>
          <p class="mt-4 text-gray-500">
            {#if annonce.etat =='E' }
              <b><i id='attente'>En attente</i></b>
            {:else if annonce.etat =='V' }
              <b><i id ="validee"> Validé</i></b>
            {:else if annonce.etat =='R' }
              <b><i id ="reservee">Réservé</i></b>
            {:else if annonce.etat =='T' }
              <b><i id ="vendu">Vendu</i></b>
            {/if}
          
          </p>
          <h2 class="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl" id="prix">
            {#if !annonce.prix || annonce.prix == 0}
              Gratuit
            {:else}
              {annonce.prix} €
            {/if}
          </h2>
          <dl class="mt-16 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 sm:gap-y-16 lg:gap-x-8">
            <div class="border-t border-gray-200 pt-4">
              <dt class="font-medium text-gray-900">Description</dt>
              <dd class="mt-2 text-sm text-gray-500">{annonce.description}</dd>
            </div>
    
            <div class="border-t border-gray-200 pt-4">
              <dt class="font-medium text-gray-900">Genre</dt>
              <dd class="mt-2 text-sm text-gray-500">
                {#if annonce.genre =='S' }
                  Service
                {:else }
                  Bien
                {/if}
              </dd>
            </div>
    
            <div class="border-t border-gray-200 pt-4">
              <dt class="font-medium text-gray-900">Vendeur</dt>
              <dd class="mt-2 text-sm text-gray-500">{vendeur.email}</dd>
            </div>
    
            <div class="border-t border-gray-200 pt-4">
              <dt class="font-medium text-gray-900">Categorie</dt>
              <dd class="mt-2 text-sm text-gray-500" > {annonceCategorie.nom}</dd>
            </div>
          </dl>
            <div style="width: 100%">
              <br>
              <p class= "font-medium text-gray-900" id ="labelCarte" >Carte :</p>
              <iframe id="map" title="map"
                SameSite=Strict
                width="400"
                height="400" 
                frameborder="0" 
                scrolling="yes" 
                marginheight="0" 
                marginwidth="0" 
                src="https://maps.google.com/maps?width=300&amp;height=300&amp;hl=en&amp;q={vendeur.adresse} &amp;t=p&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed">
              </iframe>
            </div>
        </div>
        <div class="grid grid-cols-2 grid-rows-2 gap-4 sm:gap-6 lg:gap-8">
          <img src="https://tailwindui.com/img/ecommerce-images/product-feature-03-detail-01.jpg" alt="Walnut card tray with white powder coated steel divider and 3 punchout holes." class="bg-gray-100 rounded-lg">
          <img src="https://tailwindui.com/img/ecommerce-images/product-feature-03-detail-02.jpg" alt="Top down view of walnut card tray with embedded magnets and card groove." class="bg-gray-100 rounded-lg">
          <img src="https://tailwindui.com/img/ecommerce-images/product-feature-03-detail-03.jpg" alt="Side of walnut card tray with card groove and recessed card area." class="bg-gray-100 rounded-lg">
          <img src="https://tailwindui.com/img/ecommerce-images/product-feature-03-detail-04.jpg" alt="Walnut card tray filled with cards and card angled in dedicated groove." class="bg-gray-100 rounded-lg">
       
        </div>
      </div>
  </div>
  {/if}
  {:else}
  <ErrorPage message="Vous devez etre connectes pour avoir acces a cette page"/>
{/if}
<style>
  #prix{
    color: darkcyan;
    text-align: end;
  }
  #attente{
    color: red;
  }
  #validee{
    color: green;
  }
  #reservee{
    color: orange;
  }
  #vendu{
    color: black;
  }
  #loader{
    margin: 0;
    position: absolute;
    top: 50%;
    left: 50%;
    margin-right: -50%;
    transform: translate(-50%, -50%)
  }
  #labelCarte{
    text-align: center;
  }
  #map{
   margin-left: auto;
   margin-right: auto;
  }
  
</style>