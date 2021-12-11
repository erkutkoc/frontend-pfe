<script>
    export let id;
    export let email;
    export let token

    const ban = (duree) => {
        console.log("button " + duree + " id " + id)
        banUser(duree)
    }

    const banUser = async (duree) => {
/*
        const response = fetch('https://pfe-backend1.herokuapp.com/Members/Ban/2/1',{
            headers: {"Content-Type" :"application/json", 
                Authorization: token },
            method:'PUT',
            body : JSON.stringify(toSend)
        });
        console.log(response);
        return response;*/
    }

</script>

<main>
    <div class="card">
        <footer class="card-footer">
            
            <div class="card-footer-item column is-three-fifths">
                <p>{email}</p>
            </div>
            <div class="card-footer-item">
                <button on:click={() => ban(1)} class="has-background-danger-dark relative justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Bannir 1 jour</button>
            </div>
            <div class="card-footer-item">
                <button on:click={() => ban(2)} class="has-background-grey-darker relative justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Bannir 1 mois </button>
            </div>
            <div class="card-footer-item">
                <button on:click={() => ban(3)} class="has-background-black relative justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Bannir définitivement</button>
            </div>

        </footer>
    </div>
</main>