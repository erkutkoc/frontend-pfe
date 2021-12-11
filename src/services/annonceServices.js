import axios from "axios";

const baseUrl = "https://pfe-backend1.herokuapp.com"; // laisser ca comme ca ?

const findAllAnnonce = async () => {
    try {
        const response = await axios.get(baseUrl + '/annonces');
        return response.data;
    } catch (e) {
        console.error('Error fetching data');
    }
}
const addAnnonce = async (data, token) => {
    try {
        var config = {
            method: 'post',
            url: baseUrl + '/annonces',
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
const findAllByCampus = async (name) => {
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
const findAllCategorie = async () => {
    try {
        const response = await axios.get(baseUrl + '/categories');
        return response.data;
    } catch (e) {
        console.error('Error fetching data');
    }
}
const findAllAnnonceByEmail = async (user) => {
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
const findAnnonceById = (id, token) => {
    return axios
        .get(baseUrl + "/annonces/" + id, {
            headers: {
                'Authorization': token,
                'Content-Type': 'application/json'
            }
        });
}
const getAllCampus = () => {
    return axios
        .get(baseUrl + "/adresses/", {
            headers: {
                'Content-Type': 'application/json'
            }

        });
}
const updateAnnonce = async (data, token) => {
    console.log(data)
    return axios
        .put(baseUrl + "/annonces", data, {
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
    addAnnonce,
    findAllCategorie,
    getAllCampus,
    findAllByCampus,
    updateAnnonce
}
export default AnnonceServices;