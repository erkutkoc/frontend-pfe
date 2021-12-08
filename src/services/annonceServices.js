import axios from "axios";

const baseUrl = "https://pfe-backend1.herokuapp.com";


export const findAllAnnonce = async () => {
		try {
			const response = await axios.get('https://pfe-backend1.herokuapp.com/annonces');
			return response.data;
		} catch (e) {
			console.error('Error fetching data');
		}
}
export const findAllAnnonceByEmail = async () => {
    const token = document.cookie.split("=")[1];
    console.log(token)
    try {
        const response = await axios.get('https://pfe-backend1.herokuapp.com/annonces/email', {
            headers: {
                'Authorization': token,
                'Content-Type':'application/json'
              }
        });
        return response.data;
    } catch (e) {
        console.error('Error fetching data');
    }
}

const AnnonceServices = {
    findAllAnnonce
}
export default AnnonceServices;