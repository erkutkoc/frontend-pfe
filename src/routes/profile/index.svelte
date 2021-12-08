<script>
    import Navbar from "../../components/Navbar.svelte";

    let email = "";
    let password = "";
    let campus = "";

    //fetch data from back
    console.log("fetch data");
    const fetchProfile = (async () => {
        const response = await fetch('https://pfe-backend1.herokuapp.com/members/1');
  
        console.log(response);
        return await response.json()
    })()

    const dataProcessing = ((profileData) => {
        console.log(profileData);
        email = profileData.email;
        password = profileData.motDePasse;
        campus = profileData.campus;
    })

    //change data in db
    function onSubmit (e){
    }

</script>


<main>
    <Navbar />
    {#await fetchProfile}
        <p>...Chargement</p>
    {:then data}
        {dataProcessing(data)}
    {:catch error}
        <p>Un problème s'est produit</p>
    {/await}


    <div class="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div class="max-w-md w-full space-y-8">
          <div>
            <form on:submit|preventDefault={onSubmit} class="mt-8 space-y-6" action="#" method="POST">
                <div class="rounded-md shadow-sm -space-y-px">
                <div>
                    <label for="email-address" class="sr-only">Adresse email:</label>
                    <input id="email-address" name="email" type="email" value={email} required class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm">
                </div>
                <div>
                    <label for="password" class="sr-only">Mot de passe: </label>
                    <input id="password" name="password" type="password" value={password} required class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm">
                </div>
                <div>
                    <label for="campus" class="sr-only">Campus: </label>
                    <select name="campus" id="campus">
                        <option value="">Woluwe</option>
                        <option value="">Ixelles</option>
                        <option value="">Louvain-La-Neuve</option>
                    </select>
                </div>
                </div>

                <div>
                    <button type="submit" class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                    <span class="absolute left-0 inset-y-0 flex items-center pl-3">
                        <!-- Heroicon name: solid/lock-closed -->
                        <svg class="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path fill-rule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clip-rule="evenodd" />
                        </svg>
                    </span>
                    Modifier
                    </button>
                </div>
            </form>
          </div>    
        </div>
    </div>
</main>