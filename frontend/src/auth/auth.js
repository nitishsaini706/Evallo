
export const isAuthenticated = () => {
    const token = localStorage.getItem('token');
    return Boolean(token); // Ideally, you'd also check if the token has expired
};

export const isAdmin = () => {
    if (isAuthenticated()){

        const role = localStorage.getItem('role');
        return role == 'admin' // Check the role from the token
    }
};
