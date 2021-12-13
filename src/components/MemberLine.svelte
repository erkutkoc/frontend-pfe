<script>

    export let id;
    export let email;
    export let token;
    export let banned;
    export let banDate;

    import UserServices from '../services/userServices.js';

    let banDateY
    let banDateM
    let banDateD

    if (banDate != null){
        banDateY = banDate.substring(0,4)
        banDateM = banDate.substring(5,7)
        banDateD = banDate.substring(8,10)
    }

    let bandDateFormat = banDateD + "/" + banDateM + "/" + banDateY

    const ban = (e, duration) => {
        if (duration == 0) e.target.innerText = "OK"
        else e.target.innerText = "BANNI"
        banUser(duration)
        //banUser(token, id, duration)
    }
/*
    const banUser = async (token, id, duration) => {
		await UserServices.banUser(token, id, duration).then((data) => {
			console.log(data)
		})
	}*/

    const banUser = async (duration) => {
        const response = fetch(`https://pfe-backend1.herokuapp.com/Members/Ban/${id}/${duration}`,{
            headers: {"Content-Type" :"application/json", 
                Authorization: token },
            method:'PUT',
        });
        return response;
    }

</script>

<main>
    <div class="card">
        <footer class="card-footer">
            
            <div class="card-footer-item column is-three-fifths">
                <p>{email}</p>
            </div>

                {#if banned}
                    <div class="card-footer-item">
                        <p>Banni jusqu'au {bandDateFormat}</p>
                    </div>

                    <div class="card-footer-item">
                        <button 
                            on:click={(e) => ban(e,0)} 
                            class="has-background-success relative justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >Supprimer le ban 
                        </button>
                    </div>
				{:else}
                    <div class="card-footer-item">
                        <button 
                            on:click={(e) => ban(e,1)} 
                            class="has-background-danger-dark relative justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >Bannir 1 jour
                        </button>
                    </div>

                    <div class="card-footer-item">
                        <button 
                            on:click={(e) => ban(e,30)} 
                            class="has-background-grey-darker relative justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >Bannir 1 mois 
                        </button>
                    </div>

                    <div class="card-footer-item">
                        <button 
                            on:click={(e) => ban(e,-1)} 
                            class="has-background-black relative justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >Bannir définitivement
                        </button>
                    </div>
				{/if}

        </footer>
    </div>
</main>