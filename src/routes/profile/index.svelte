<script>
    import Navbar from "../../components/Navbar.svelte";
    import '../../styles/tailwind.css';

    let email = "";
    let password = "";
    let campus = "";

    let length = document.cookie.search("token") + "token=".length
    //let length
    
    //fetch data from back
    console.log("fetch data");
    const fetchProfile = (async () => {
        const response = await fetch('https://pfe-backend1.herokuapp.com/Members/GetMembre',{
            headers: {"Content-Type" :"application/json", Authorization: document.cookie.slice(length) },
            method:'GET',
        });
        return await response.json()
    })()

    const dataProcessing = ((profileData) => {
        console.log(profileData);
        email = profileData.email;
        campus = profileData.campus;
    })

    //change data in db
    function onSubmit (e){
    
        const formData = new FormData(e.target);
            const data = [];

            // @ts-ignore
            for (let field of formData) {
                const [key, value] = field;
                data[key] = value;
            }
            if (data) putProfile(data);
    }
    const putProfile = async (data) => {
        let toSend = {
            email: email,
            motDePasse: data.password,
            campus_id: Number.parseInt(data.campus)
        };
        console.log("toSend");
        console.log(toSend);

        const response = fetch('https://pfe-backend1.herokuapp.com/Members/UpdateMembre',{
            headers: {"Content-Type" :"application/json", Authorization: document.cookie.slice(length) },
            method:'PUT',
            body : JSON.stringify(toSend)
        });
        console.log(response);
        return response;
        
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
				<h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900"><h2>Voici vos données personnelles:</h2></h2>
			</div>
			<form on:submit|preventDefault={onSubmit} class="mt-8 space-y-6" action="#" method="POST">
				<input type="hidden" name="remember" value="true" />
				<div class="rounded-md shadow-sm -space-y-px">
					<div>
						<label for="email-address" class="sr-only">Email address</label>
						<input
							id="email-address"
							name="email"
							type="email"
							autocomplete="email"
							class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
							placeholder="Email address"
                            value={email}
                            readonly
						/>
					</div>
					<div>
						<label for="password" class="sr-only">Password</label>
						<input
							id="password"
							name="password"
							type="password"
							autocomplete="current-password"
							class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
							placeholder="Modifier votre mot de passe"
						/>
					</div>
					<div>
						<label for="campus" class="sr-only">Campus</label>
						<select name="campus" id="campus" class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm">
                            <option value="1">Woluwe</option>
                            <option value="2">Ixelles</option>
                            <option value="3">Louvain-La-Neuve</option>
                        </select>
					</div>
				</div>

				<div>
					<button
						type="submit"
						class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
					>
						Modifier
					</button>
				</div>
			</form>
		</div>
	</div>
</main>