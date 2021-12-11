<script>
import { onMount } from "svelte";

    import Navbar from "../../components/Navbar.svelte";
    import '../../styles/tailwind.css';
    import AnnonceServices from '../../services/annonceServices.js';

    let campus = []
    let campusUser = 1
    let email = ""
    let token

    let USER;
	onMount(async () => {
        const allCampus = await AnnonceServices.getAllCampus();
		campus = allCampus.data;
		USER = JSON.parse(localStorage.getItem('user'))
        email = USER.email
        campusUser = USER.campus_Id
        token = USER.token;
	});
    
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
            email: USER.email,
            motDePasse: data.password,
            campus_id: Number.parseInt(data.campus)
        };
        console.log("toSend");
        console.log(toSend);

        const response = fetch('https://pfe-backend1.herokuapp.com/Members/UpdateMembre',{
            headers: {"Content-Type" :"application/json", 
                Authorization: token
            },
            method:'PUT',
            body : JSON.stringify(toSend)
        });
        console.log(response);
        return response;
        
    }
</script>


<main>
    <Navbar />
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
                            {#each campus as c}
                                {#if c.id == campusUser}
                                    <option value={c.id} selected>{c.ville}</option>
                                {:else}
                                    <option value={c.id}>{c.ville}</option>
                                {/if}
                            {/each}
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