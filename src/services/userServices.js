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
        })
}
const getAllUsers = async (token) => {
    return axios
        .get(baseUrl + "/Members", {
            headers: {
                'Authorization': token,
                'Content-Type': 'application/json'
            }
        });
};
const updateProfile = async(token, email, password, campus) => {
    let toSend = {
        Email: email, 
        MotDePasse: password,
        Campus_Id: campus
    }
    return axios
        .put(baseUrl + "/Members/UpdateMembre", toSend,{
            headers: {
                'Authorization': token,
                'Content-Type': 'application/json'
            },
        })
}
const banUser = async(token, idMember, duree) => {
    console.log(token)
    return axios
        .put(baseUrl + `/Members/Ban/${idMember}/${duree}`, undefined, {
            headers: {
                'Authorization': token,
                'Content-Type': 'application/json'
            }
        })
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