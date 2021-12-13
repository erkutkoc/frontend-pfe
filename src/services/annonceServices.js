import axios from "axios";
import "dotenv";

// const baseUrl = "https://backend-staging-pfe.herokuapp.com"
const baseUrl = process.env['VITE_BASE_URL']

const findAllAnnonce = async() => {
    try {
        const response = await axios.get(baseUrl + '/annonces');
        return response.data;
    } catch (e) {
        console.error('Error fetching data');
    }
}
const findAllByCampus = async(name) => {
    if (name) {
        try {
            const response = await axios.get(baseUrl + '/annonces/campus/' + name);
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
    console.log(baseUrl)
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
const updateAnnonce = async(data, token, admin) => {
    if (admin) {
        return axios
            .put(baseUrl + "/annonces/admin", data, {
                headers: {
                    'Authorization': token,
                    'Content-Type': 'application/json'
                }
            })
    } else {
        return axios
            .put(baseUrl + "/annonces", data, {
                headers: {
                    'Authorization': token,
                    'Content-Type': 'application/json'
                }
            })
    }
}
const uploadAnnonce = async(data, token) => {
    return axios
        .post(baseUrl + "/annonces", data, {
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
    findAllCategorie,
    getAllCampus,
    findAllByCampus,
    updateAnnonce,
    uploadAnnonce,

}
export default AnnonceServices;