import axios from "axios";

const baseUrl = "https://backend-staging-pfe.herokuapp.com";

const findAllAnnonce = async() => {
    try {
        const response = await axios.get(baseUrl + '/annonces');
        return response.data;
    } catch (e) {
        console.error('Error fetching data');
    }
}
const findAllByCampus = async(name) => {
    if (name != null) {
        try {
            const response = await axios.get(baseUrl + '/annonces/campus/' + name);
            console.log(response.data)
            return response.data;
        } catch (e) {
            console.error('Error fetching data');
        }
    }
}
const findAllCategorie = async() => {
    try {
        const response = await axios.get(baseUrl + '/categories');
        return response.data;
    } catch (e) {
        console.error('Error fetching data');
    }
}
const findAllAnnonceByEmail = async(user) => {
    try {
        console.log(user)
        const response = await axios.get(baseUrl + '/annonces/email', {
            headers: {
                'Authorization': user.token,
                'Content-Type': 'application/json'
            }
        });
        return response.data;
    } catch (e) {
        console.error('Error fetching data');
    }
}
const findAnnonceById = async(id, token) => {
    return axios
        .get(baseUrl + "/annonces/" + id, {
            headers: {
                'Authorization': token,
                'Content-Type': 'application/json'
            }
        });
}
const getAllCampus = async() => {
    return axios
        .get(baseUrl + "/adresses/", {
            headers: {
                'Content-Type': 'application/json'
            }
        });
}
const uploadAnnonce = async(data, token) => {
    console.log('in upload annonce')
    return axios
        .post(baseUrl + "/annonces", data, {
            headers: {
                'Authorization': token,
                'Content-Type': 'application/json'
            }
        })
}

const AnnonceServices = {
    findAllAnnonce,
    findAllAnnonceByEmail,
    findAnnonceById,
    findAllCategorie,
    getAllCampus,
    uploadAnnonce,
    findAllByCampus
}
export default AnnonceServices;