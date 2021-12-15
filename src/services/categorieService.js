import axios from "axios";
const baseUrl =
    import.meta.env.VITE_BASE_URL


const updateCategorie = async (data, token, admin, id) => {
    return await axios
        .put(baseUrl + "/categories/" + id, data, {
            headers: {
                'Authorization': token,
                'Content-Type': 'application/json'
            }
        })
}
const addCategorie = async (data, token) => {
    return await axios
        .post(baseUrl + "/categories", data, {
            headers: {
                'Authorization': token,
                'Content-Type': 'application/json'
            }
        });
}

const deleteCategorie = async (token, id) => {
    try {
        return await axios
            .put(baseUrl + "/categories/delete/" + id, {}, {
                headers: {
                    'Authorization': token,
                    'Content-Type': 'application/json'
                }
            });
    } catch (error) {
        throw error.data;
    }
}
const AnnonceServices = {
    addCategorie,
    updateCategorie,
    deleteCategorie

}
export default AnnonceServices;