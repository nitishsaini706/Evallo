import axios from 'axios';

const API_URL = 'http://localhost:8000/content'; // Replace with your API URL

const getAllContents = async (token) => {
    try {
        const response = await axios.get(`${API_URL}/list`,{headers:{Authorization:token}});
        return response.data;
    } catch (error) {
        // Handle error
        console.error("Error fetching contents", error);
        return error;
    }
};
const getAllAdminContents = async (token) => {
    try {
        const response = await axios.get(`${API_URL}/admin/list`, { headers: { Authorization:token}});
        return response.data;
    } catch (error) {
        // Handle error
        console.error("Error fetching contents", error);
        return error;
    }
};
const addContents = async (body,token) => {
    try {
        const response = await axios.post(`${API_URL}/add`, body, { headers: { Authorization: token } });
        return response;
    } catch (error) {
        // Handle error
        console.error("Error adding contents", error);
        return error;
    }
};
const deleteContent = async (body, token) => {
    try {
        const response = await axios.post(`${API_URL}/admin/delete`, {_id:body}, { headers: { Authorization: token } });
        return response;
    } catch (error) {
        // Handle error
        console.error("Error adding contents", error);
        return error;
    }
};
const updateContent = async (body, token) => {
    try {
        const response = await axios.post(`${API_URL}/admin/edit`,body, { headers: { Authorization: token } });
        return response;
    } catch (error) {
        // Handle error
        console.error("Error adding contents", error);
        return error;
    }
};


export const ContentService = {
    getAllContents,
    addContents,
    getAllAdminContents,
    deleteContent,
    updateContent,
};
