import axios from "axios";

const baseUrl = "https://backend-staging-pfe.herokuapp.com";


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
        });
}

const UserServices = {
    login,
    register,
    getUserById
}
export default UserServices;