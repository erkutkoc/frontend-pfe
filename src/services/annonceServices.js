import axios from "axios";

const baseUrl = "https://pfe-backend1.herokuapp.com";

export const findAllAnnonce = async () => {
    try {
        const response = await axios.get(baseUrl + '/annonces');
        return response.data;
    } catch (e) {
        console.error('Error fetching data');
    }
}
const addAnnonce = async (data) => {
    const token = document.cookie.split("=")[1];
    try {
        var config = {
            method: 'post',
            url: baseUrl + '/annonces?Content-Type=application/json',
            headers: {
                'Authorization': token,
                'Content-Type': 'application/json'
            },
            data: data
        };
        return axios(config)
        .then(function (response) {
          console.log(JSON.stringify(response.data));
        })
        .catch(function (error) {
          console.log(error);
        });
    } catch (e) {
        console.error(e);
    }
}
const findAllCategorie = async () => {
    try {
        const response = await axios.get(baseUrl + '/categories');
        return response.data;
    } catch (e) {
        console.error('Error fetching data');
    }
}
const findAllAnnonceByEmail = async () => {
    const token = document.cookie.split("=")[1];
    try {
        const response = await axios.get(baseUrl + '/annonces/email', {
            headers: {
                'Authorization': token,
                'Content-Type': 'application/json'
            }
        });
        return response.data;
    } catch (e) {
        console.error('Error fetching data');
    }
}
const findAnnonceById = (id) => {
    let token = document.cookie.split("=")[1];
    return axios
        .get(baseUrl + "/annonces/" + id, {
            headers: {
                'Authorization': token,
                'Content-Type': 'application/json'
            }
        });
}

const AnnonceServices = {
    findAllAnnonce,
    findAllAnnonceByEmail,
    findAnnonceById,
    addAnnonce,
    findAllCategorie
}
export default AnnonceServices;