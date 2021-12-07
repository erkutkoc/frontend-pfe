import axios from "axios";

// const baseUrl = "http://localhost:3000/api/persons"
const baseUrl = "http://dd08-2a02-a03f-6603-9b00-fc9c-9e92-81ec-70c1.ngrok.io";


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