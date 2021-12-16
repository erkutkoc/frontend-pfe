import axios from "axios";
const baseUrl =
    import.meta.env.VITE_BASE_URL;

const findAllAnnonce = async() => {
    try {
        const response = await axios.get(baseUrl + '/annonces');
        return response.data;
    } catch (e) {
        throw e.response.data;
    }
}
const findAllAnnonceStatusWaiting = async(token) => {
    try {
        const response = await axios.get(baseUrl + '/annonces/getallannoncesstatuse', {
            headers: {
                'Authorization': token,
                'Content-Type': 'application/json'
            }
        });
        return response.data;
    } catch (e) {
        throw e.response.data;
    }
}
const findAllByCampus = async(name) => {
    if (name) {
        try {
            const response = await axios.get(baseUrl + '/annonces/campus/' + name);
            return response.data;
        } catch (e) {
            throw e.response.data;
        }
    }
}
const findAllCategorie = async() => {
    try {
        const response = await axios.get(baseUrl + '/categories');
        return response.data;
    } catch (e) {
        throw e.response.data;
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
        throw e.response.data;
    }
}
const findAnnonceById = async(id, token) => {
    try {
        return await axios
            .get(baseUrl + "/annonces/" + id, {
                headers: {
                    'Authorization': token,
                    'Content-Type': 'application/json'
                }
            });
    } catch (e) {
        console.log(e)
        throw e.response.data;
    }
}
const getAllCampus = async() => {
    try {
        return await axios
            .get(baseUrl + "/adresses/", {
                headers: {
                    'Content-Type': 'application/json'
                }

            });
    } catch (e) {
        throw e.response.data;
    }

}
const updateAnnonce = async(data, token, admin) => {
    try {
        if (admin) {
            console.log(admin)
            return await axios
                .put(baseUrl + "/annonces/admin", data, {
                    headers: {
                        'Authorization': token,
                        'Content-Type': 'application/json'
                    }
                })
        } else {
            return await axios
                .put(baseUrl + "/annonces", data, {
                    headers: {
                        'Authorization': token,
                        'Content-Type': 'application/json'
                    }
                })
        }
    } catch (e) {
        throw e.response.data;
    }

}
const uploadAnnonce = async(data, token) => {
    try {
        return await axios
            .post(baseUrl + "/annonces", data, {
                headers: {
                    'Authorization': token,
                    'Content-Type': 'application/json'
                }
            });
    } catch (e) {
        throw e.response.data;
    }
}

const AnnonceServices = {
    findAllAnnonce,
    findAllAnnonceByEmail,
    findAllAnnonceStatusWaiting,
    findAnnonceById,
    findAllCategorie,
    getAllCampus,
    findAllByCampus,
    updateAnnonce,
    uploadAnnonce,

}
export default AnnonceServices;