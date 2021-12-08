import axios from "axios";


const baseUrl = "https://pfe-backend1.herokuapp.com";


const login = (payload) => {
    return axios
        .post(baseUrl + "/login/login", payload);
}

const getProfile = () => {
    return axios
        .get(baseUrl + "/members/1")
        .then(response => {
            console.log(response.data);
        })
}

const setProfile = (payload) => {
    return axios
        .post(baseUrl + "/members/1", payload)
        .then(response => {
            console.log(response.data);
        })
}

const UserServices = {
    login
}
export default UserServices;