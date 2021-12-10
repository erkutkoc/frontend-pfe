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

const UserServices = {
    login,
    register
}
export default UserServices;