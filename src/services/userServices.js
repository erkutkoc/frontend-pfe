import axios from "axios";
const baseUrl =
    import.meta.env.VITE_BASE_URL

const login = async(payload) => {
    try {
        return await axios.post(baseUrl + "/login/login", payload);
    } catch (error) {
        throw error.response.data;
    }
}
const register = async(payload) => {
    try {
        return await axios.post(baseUrl + "/login/register", payload);
    } catch (error) {
        throw error.response.data;
    }
}
const getUserById = async(id, token) => {
    try {
        return await axios
            .get(baseUrl + "/members/getmembre/" + id, {
                headers: {
                    'Authorization': token,
                    'Content-Type': 'application/json'
                }
            })
    } catch (error) {
        throw error.response.data;
    }
}
const getAllUsers = async(token) => {
    try {
        return await axios
            .get(baseUrl + "/Members", {
                headers: {
                    'Authorization': token,
                    'Content-Type': 'application/json'
                }
            });
    } catch (error) {
        throw error.response.data;
    }

};
const updateProfile = async(token, email, password, campus) => {
    let toSend = {
        Email: email,
        MotDePasse: password,
        Campus_Id: campus
    }
    try {
        return await axios
            .put(baseUrl + "/Members/UpdateMembre", toSend,{
                headers: {
                    'Authorization': token,
                    'Content-Type': 'application/json'
                },
            })
    }catch(error){
        throw error.response.data;
    }
}

const banUser = async(token, idMember, duree) => {
    try {
        return await axios
        .put(baseUrl + `/Members/Ban/${idMember}/${duree}`, undefined, {
            headers: {
                'Authorization': token,
                'Content-Type': 'application/json'
            }
        })
    }catch(error){
        throw error.response.data;
    }
}

const getUserByEmail = async(email, token) => {
    let toSend = {
        Email: email,
    }
    try {
        return axios
        .post(baseUrl + "/members/getmembre/email", toSend, {
            headers: {
                'Authorization': token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(toSend)
        })
    }catch(e){
        throw error.response.data;
    }
}

const UserServices = {
    login,
    register,
    getUserById,
    getAllUsers,
    updateProfile,
    banUser,
    getUserByEmail,
}
export default UserServices;