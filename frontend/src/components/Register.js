import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Paper, TextField, Button, Typography, Container, InputLabel, Select, MenuItem } from '@material-ui/core';
import { useNavigate } from 'react-router-dom';
import authService from "../handler/auth"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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

const Register = () => {
    const navigate = useNavigate();
    const classes = useStyles();
    const [userDetails, setUserDetails] = useState({
        name: '',
        email: '',
        password: '',
    });
    const [pass,setPass]=useState("");
   
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setUserDetails({ ...userDetails, [name]: value });
    };

    const handleSubmit =async (event) => {
        event.preventDefault();
        try {
            if(userDetails.password == pass){
                toast.error(" Login successful");
            }
            const response = await authService.register(userDetails);

            if (response) {
                navigate('/login', { replace: true });
            } 
        } catch (error) {
            console.log(error)
        }
    };

    return (
        <Container component="main" maxWidth="xs">
            <ToastContainer/>
            <Paper className={classes.root} elevation={3}>
                <Typography component="h1" variant="h5">
                    Register
                </Typography>
                <form className={classes.form} noValidate onSubmit={handleSubmit}>
                    <TextField
                        className={classes.inputField}
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="name"
                        label="name"
                        name="name"
                        autoComplete="name"
                        autoFocus
                        value={userDetails.username}
                        onChange={handleInputChange}
                    />
                    <TextField
                        className={classes.inputField}
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        value={userDetails.email}
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
                        autoComplete="new-password"
                        value={userDetails.password}
                        onChange={handleInputChange}
                    />
                    <TextField
                        className={classes.inputField}
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="confirmPassword"
                        label="Confirm Password"
                        type="password"
                        id="confirmPassword"
                        
                        onChange={(e) => {
                            setPass(e.target.value);
                        }}                    />
                    <div style={{display:"flex",alignItems:"center",marginBottom:"10px",justifyContent:"start",width:"100%"}}>

                    <InputLabel style={{marginRight:"10px"}}>Role</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        name="role"
                        onChange={handleInputChange}
                    >
                        <MenuItem value={"admin"}>Admin</MenuItem>
                        <MenuItem value={"user"}>User</MenuItem>
                        
                    </Select>
                    </div>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submitButton}
                    >
                        Register
                    </Button>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        onClick={() => { navigate('/login',{replace:true}) }}
                        style={{ backgroundColor: "rgb(31 150 32)", color: "white" }}
                        className={classes.submitButton}
                    >
                        Login
                    </Button>
                </form>
            </Paper>
        </Container>
    );
};

export default Register;
