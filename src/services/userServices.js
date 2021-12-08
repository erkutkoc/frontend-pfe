import axios from "axios";

const baseUrl = "https://pfe-backend1.herokuapp.com";


const login = (payload) => {
    return axios
        .post(baseUrl + "/login/login", payload)
        .then(response => {
            document.cookie = "token=" + response.data;
            console.log(response.data);
        })
}

const UserServices = {
    login,
}
export default UserServices;