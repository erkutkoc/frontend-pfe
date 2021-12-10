import axios from "axios";

const baseUrl = "https://pfe-backend1.herokuapp.com";


const login = (payload) => {
    return axios
        .post(baseUrl + "/login/login", payload);
}
const register = (payload) => {
    return axios
        .post(baseUrl + "/login/register", payload);
}
const getUserById = (id, token) => {
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