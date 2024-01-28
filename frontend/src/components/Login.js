import React, { useState ,useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Paper, TextField, Button, Typography, Container } from '@material-ui/core';
import { useNavigate } from 'react-router-dom';
import authService from "../handler/auth"


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

const Login = () => {
    const navigate = useNavigate();
    const classes = useStyles();

    const [credentials, setCredentials] = useState({ email: '', password: '' });

    useEffect(() => {
        const checkAuthState = async () => {
            const token = localStorage.getItem('token');
            if (token) {
                try {
                    const response = await authService.verifyToken(token);
                    if (response) {
                        if (response.role === 'admin') {
                            navigate('/admin', { replace: true });
                        } else {
                            navigate('/', { replace: true });
                        }
                    }
                } catch (error) {
                    console.error('Token verification failed', error);
                    localStorage.removeItem('token');
                }
            }
        };

        checkAuthState();
    }, []);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setCredentials({ ...credentials, [name]: value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await authService.login(credentials);
            if (response?.data?.user?.role === 'admin') {
                navigate('/admin',{replace:true});
            } else {
                navigate('/', { replace: true });
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Container component="main" maxWidth="xs">
            <Paper className={classes.root} elevation={3}>

                    <Typography component="h1" variant="h5">
                        Login
                    </Typography>
                    
                <form className={classes.form} noValidate onSubmit={handleSubmit}>
                    <TextField
                        className={classes.inputField}
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="email"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        value={credentials.email}
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
                    <Button
                        
                        fullWidth
                        variant="outlined"
                        color="success"
                        style={{ backgroundColor: "rgb(31 150 32)" ,color:"white"}}
                        onClick={() => {
                            navigate('/register', { replace: true });
                        }}
                    >
                        Register
                    </Button>
                </form>
            </Paper>
        </Container>
    );
};

export default Login;
