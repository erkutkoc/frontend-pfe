import axios from "axios";

const baseUrl =
    import.meta.env.VITE_BASE_URL

const getMessagesByDiscussion = async(token, discussionId) => {
    try {
        const response = await axios
            .get(baseUrl + `/discussions/messages/${discussionId}`, {
                headers: {
                    'Authorization': token,
                    'Content-Type': 'application/json'
                }
            });
        return response.data;
    } catch (e) {
        throw e.response.data;
    }
}

const postMessage = async(token, message, discussionId) => {
    let toSend = {
        Discussion_id: discussionId,
        Texte: message
    }
    try{
        return await axios
        .post(baseUrl + "/discussions/messages", toSend, {
            headers: {
                'Authorization': token,
                'Content-Type': 'application/json'
            },
        });
    }catch (e) {
        console.log("error post message")
    }
}

const getDiscussions = async(token, memberId) => {
    try {
        const response = await axios
            .get(baseUrl + `/discussions/membres/${memberId}`, {
                headers: {
                    'Authorization': token,
                    'Content-Type': 'application/json'
                }
            });
        return response.data;
    } catch (e) {
        throw e.response.data;
    }
}

const postDiscussion = async (token, member, id) => {
    try {
        return await axios
        .post(baseUrl + `/discussions/membres/${member}/${id}`, undefined,{
            headers: {
                'Authorization': token,
                'Content-Type': 'application/json'
            },
        });
    }catch(e){
        console.log('Error post discussion')
    }
}

const DiscussionServices = {
    getMessagesByDiscussion,
    postMessage,
    getDiscussions,
    postDiscussion,
}
export default DiscussionServices;