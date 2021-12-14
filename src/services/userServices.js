import axios from "axios";
const baseUrl =
    import.meta.env.VITE_BASE_URL

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
const updateProfile = async(token, email, password, campus) => {
    let toSend = {
        Email: email, 
        MotDePasse: password,
        Campus_Id: campus
    }
    try {
        return axios
        .put(baseUrl + "/Members/UpdateMembre", toSend,{
            headers: {
                'Authorization': token,
                'Content-Type': 'application/json'
            },
        })
    }catch(e){
        console.log('error update profile')
    }
}

const banUser = async(token, idMember, duree) => {
    try {
        return axios
        .put(baseUrl + `/Members/Ban/${idMember}/${duree}`, undefined, {
            headers: {
                'Authorization': token,
                'Content-Type': 'application/json'
            }
        })
    }catch(e){
        console.log('error ban user')
    }
}

const getUserByEmail = async(email, token) => {
    let toSend = {
        Email: email,
    }
    try {
        return axios
        .post(baseUrl + "/members/getmembre/email", toSend, {
            headers: {
                'Authorization': token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(toSend)
        })
    }catch(e){
        console.log('error fetch email')
    }
}

const UserServices = {
    login,
    register,
    getUserById,
    getAllUsers,
    updateProfile,
    banUser,
    getUserByEmail,
}
export default UserServices;