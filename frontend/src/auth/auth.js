
export const isAuthenticated = () => {
    const token = localStorage.getItem('token');
    if(token != null){
        return true;
    }
    return false;
};

export const isAdmin = () => {
    if (isAuthenticated()){

        const role = localStorage.getItem('role');
        return role == 'admin' // Check the role from the token
    }
};
