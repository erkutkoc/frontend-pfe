<script>
	import { Tabs, Tab, TabList, TabPanel } from 'svelte-tabs';
	export let adresses;
</script>

<div style="width: 100%">
	<Tabs>
		<br /><br /><br />
		<p class="font-medium text-gray-900" id="labelCarte">Adresse(s) de retrait :</p>
		<TabList>
			{#each adresses as adresse}
				<Tab>{adresse.ville}</Tab>
			{/each}
		</TabList>
		{#each adresses as adresse}
			<TabPanel>
				<iframe
					id="map"
					title="map"
					SameSite="Strict"
					width="450"
					height="450"
					frameborder="0"
					scrolling="yes"
					marginheight="0"
					marginwidth="0"
					src="https://maps.google.com/maps?width=300&amp;height=300&amp;hl=en&amp;q={adresse.rue} {adresse.numero} {adresse.ville} {adresse.code_postal} {adresse.ville} {adresse.pays} &amp;t=p&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
				/>
			</TabPanel>
		{/each}
	</Tabs>
</div>

<style>
	#labelCarte {
		text-align: center;
	}
	#map {
		margin-left: auto;
		margin-right: auto;
	}
</style>
