import axios from "axios";
import { onMount } from 'svelte';

const baseUrl = "https://pfe-backend1.herokuapp.com";


export const findAllAnnonce = async () => {
		try {
			const response = await axios.get('https://pfe-backend1.herokuapp.com/annonces');
			return response.data;
		} catch (e) {
			console.error('Error fetching data');
		}
}

const AnnonceServices = {
    findAllAnnonce
}
export default AnnonceServices;