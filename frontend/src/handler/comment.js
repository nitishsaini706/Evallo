import axios from 'axios';

const API_URL = 'http://localhost:8000/comment';

const addComment = async (body, token) => {
    try {
        const response = await axios.post(`${API_URL}/add`, body, { headers: { Authorization: token } });
        return response;
    } catch (error) {
        // Handle error
        console.error("Error adding contents", error);
        return error;
    }
};
const getComments = async (id, token) => {
    try {
        const response = await axios.get(`${API_URL}/${id}`, { headers: { Authorization: token } });
        return response;
    } catch (error) {
        // Handle error
        console.error("Error adding contents", error);
        return error;
    }
};
export const CommentService = {
    addComment,
    getComments
};