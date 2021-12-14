import axios from "axios";
const baseUrl =
    import.meta.env.VITE_BASE_URL


const updateCategorie = async(data, token, admin, id) => {
    return await axios
        .put(baseUrl + "/categories/" + id, data, {
            headers: {
                'Authorization': token,
                'Content-Type': 'application/json'
            }
        })
}
const addCategorie = async(data, token) => {
    return await axios
        .post(baseUrl + "/categories", data, {
            headers: {
                'Authorization': token,
                'Content-Type': 'application/json'
            }
        });
}
const addSubCategorie = async(data, token) => {
    return await axios
        .post(baseUrl + "/categories", data, {
            headers: {
                'Authorization': token,
                'Content-Type': 'application/json'
            }
        });
}
const deleteCategorie = async(token, id) => {
    return await axios
        .put(baseUrl + "/categories/delete/" + id, {}, {
            headers: {
                'Authorization': token,
                'Content-Type': 'application/json'
            }
        });
}
const AnnonceServices = {
    addCategorie,
    addSubCategorie,
    updateCategorie,
    deleteCategorie

}
export default AnnonceServices;