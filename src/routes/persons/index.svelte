<script>
    const fetchPersons = (async () => {
              const response = await fetch('http://localhost:3001/api/persons');
            //   const response = await fetch('http://426d-2a02-a03f-6603-9b00-8024-bd43-3fce-b86.ngrok.io/personnes');
  
              console.log(response);
          return await response.json()
          })()
  </script>
  
  <main>
    <div style="text-align: center">
        {#await fetchPersons}
    
            <p>...waiting</p>
        {:then data}
            {#each data as person }
                <p>{person.name} - {person.number}</p>
            {/each }
        {:catch error}
            <p>An error occured!</p>
        {/await}
    </div>
    </main>
  