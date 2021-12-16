<script>
    import { onMount } from "svelte";
    import { Shadow } from 'svelte-loading-spinners';
	import storage from '../../utils/storage';

    import Navbar from "../../components/Navbar.svelte";
    import AnnonceServices from '../../services/annonceServices.js';
    import UserServices from '../../services/userServices.js';
	import { Snackbar } from 'svelte-materialify';

    let campus = []
    let campusUser = 1
    let email = ""
    let token
    let loading = false
	let snackbar = false
	let errorNotification

    let USER;
	onMount(async () => {
        const allCampus = await AnnonceServices.getAllCampus();
		campus = allCampus.data;
		USER = JSON.parse(sessionStorage.getItem('user'))
        email = USER.email
        campusUser = USER.campus_Id
        token = USER.token;
	});
    
    function onSubmit (e){
    
        //loading = true
        const formData = new FormData(e.target);
            const data = [];

            // @ts-ignore
            for (let field of formData) {
                const [key, value] = field;
                data[key] = value;
            }
            if (data) putProfile(token, data)
    }
    
    const putProfile = async (token, data) => {
		await UserServices.updateProfile(token, email, data.password, Number.parseInt(data.campus)).then((data) => {
			let user = data.data
			user.motDePasse = ''
			USER.campus_Id = user.campus_Id
			storage('user', USER);
			USER = JSON.parse(sessionStorage.getItem('user'))
			//loading = false
			errorNotification = "Vos données ont bien été modifiées"
			snackbar = true
		})
	}

</script>


<main>
    <Navbar />
	<Snackbar top center rounded bind:active={snackbar} timeout={3000} style="background-color:green">
		{errorNotification}
	</Snackbar>
    <div class="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
		<div class="max-w-md w-full space-y-8">
			<div>
				<h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">Modifiez vos données personnelles:</h2>
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
					<select name="campus" id="campus" style="background-color:rgb(232, 240, 254);" class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm">
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
						style="color:white"
					>
                        {#if loading}
                            <span class="absolute left-0 inset-y-0 flex items-center pl-3">
                                <!-- Heroicon name: solid/lock-closed -->
                                <span class="absolute left-0 inset-y-0 flex items-center pl-3">
                                    <Shadow size="15" color="#2c9b89" unit="px" duration="1s" />
                                </span>
                            </span>
                        {/if}
                        
						Modifier
					</button>
				</div>
			</form>
		</div>
	</div>
</main>