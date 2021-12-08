import axios from "axios";

const baseUrl = "https://pfe-backend1.herokuapp.com";


const login = (payload) => {
    return axios
        .post(baseUrl + "/login/login", payload)
        .then(response => {
            document.cookie = "token=Bearer " + response.data.token;
        })
}

const UserServices = {
    login
}
export default UserServices;