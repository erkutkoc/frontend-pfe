import axios from "axios";
const baseUrl = "http://5e47-2a02-a03f-6603-9b00-e42e-c2a0-e62f-731a.ngrok.io";
// import.meta.env.VITE_BASE_URL

const login = async(payload) => {
    try {
        return await axios.post(baseUrl + "/login/login", payload);
    } catch (error) {
        throw error.response.data;
    }
}
const register = async(payload) => {
    try {
        return axios.post(baseUrl + "/login/register", payload);
    } catch (error) {
        throw error.response.data;
    }
}
const getUserById = async(id, token) => {
    try {
        return axios
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
        return axios
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
const updateProfile = async(token, payload) => {
    try {
        return axios
            .put(baseUrl + "/Members/UpdateMembre", {
                headers: {
                    'Authorization': token,
                    'Content-Type': 'application/json'
                },
                body: payload
            });
    } catch (error) {
        throw error.response.data;
    }

}
const banUser = async(token, idMember, duree) => {
    try {
        return axios
            .put(baseUrl + `Members/Ban/${idMember}/${duree}`, {}, {
                headers: {
                    'Authorization': token,
                    'Content-Type': 'application/json'
                }
            })
    } catch (error) {
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
}
export default UserServices;