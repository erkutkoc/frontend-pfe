import axios from "axios";
import "dotenv";

const baseUrl = process.env['VITE_BASE_URL'];

const login = async(payload) => {
    return axios
        .post(baseUrl + "/login/login", payload);
}
const register = async(payload) => {
    return axios
        .post(baseUrl + "/login/register", payload);
}
const getUserById = async(id, token) => {
    return axios
        .get(baseUrl + "/members/getmembre/" + id, {
            headers: {
                'Authorization': token,
                'Content-Type': 'application/json'
            }
        })
}
const getAllUsers = async(token) => {
    return axios
        .get(baseUrl + "/Members", {
            headers: {
                'Authorization': token,
                'Content-Type': 'application/json'
            }
        });
};
const updateProfile = async(token, payload) => {
    return axios
        .put(baseUrl + "/Members/UpdateMembre"), {
            headers: {
                'Authorization': token,
                'Content-Type': 'application/json'
            },
            body: payload
        }
}
const banUser = async(token, idMember, duree) => {
    return axios
        .put(baseUrl + `Members/Ban/${idMember}/${duree}`), {
            headers: {
                'Authorization': token,
                'Content-Type': 'application/json'
            }
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