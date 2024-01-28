import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Paper, TextField, Button, Typography, Container } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
// You would import the adminAuthService for authentication service for admin

const useStyles = makeStyles((theme) => ({
    root: {
        marginTop: theme.spacing(10),
        padding: theme.spacing(3),
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    inputField: {
        width: '100%', // Full width
        margin: theme.spacing(1, 0),
    },
    submitButton: {
        margin: theme.spacing(2, 0),
    },
}));

const AdminLogin = () => {
    const classes = useStyles();
    const [credentials, setCredentials] = useState({ username: '', password: '' });
    const history = useHistory();

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setCredentials({ ...credentials, [name]: value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        // Admin login logic here, which would involve calling an admin-specific endpoint
        console.log(credentials);
        // On successful login, you might redirect to the admin dashboard
        // history.push('/admin/dashboard');
    };

    return (
        <Container component="main" maxWidth="xs">
            <Paper className={classes.root} elevation={3}>
                <Typography component="h1" variant="h5">
                    Admin Login
                </Typography>
                <form className={classes.form} noValidate onSubmit={handleSubmit}>
                    <TextField
                        className={classes.inputField}
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="username"
                        label="Username"
                        name="username"
                        autoComplete="username"
                        autoFocus
                        value={credentials.username}
                        onChange={handleInputChange}
                    />
                    <TextField
                        className={classes.inputField}
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        value={credentials.password}
                        onChange={handleInputChange}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submitButton}
                    >
                     Login
                    </Button>
                </form>
            </Paper>
        </Container>
    );
};

export default AdminLogin;
