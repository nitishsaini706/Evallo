import axios from 'axios';

const API_URL = 'http://localhost:8000/auth';

const login = async (details) => {
    try {
        const response = await axios.post(`${API_URL}/login`, details);
        if (response.data) {
            localStorage.setItem("user", JSON.stringify(response.data.user));
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('role', response.data.user.role);
        }
        return response.data;
    } catch (error) {
        throw error;
    }
};
const register = async (details) => {
    try {
        const response = await axios.post(`${API_URL}/register`, details);
        if (response.data) {
            
            return response.data;
        }
    } catch (error) {
        throw error;
    }
};

const verifyToken = async (token) => {
    try {
        const response = await axios.post(`${API_URL}/verifyToken`, {token:token});
        if (response.data) {

            return response.data;
        }
    } catch (error) {
        throw error;
    }
};
const AuthService = {
    login,
    register,
    verifyToken
};

export default AuthService;
