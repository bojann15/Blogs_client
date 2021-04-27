import React, { useState, useContext } from 'react';
import API from '../../../api/index';
import { Avatar, Button, Paper, Grid, Container, Typography } from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { useHistory } from 'react-router-dom';
import { PostContext } from '../../../context/PostContext';
import useStyles from './styles';
import Input from './Input';
const initialState = { firstName: '', lastName: '', email: '', password: '', confirmPassword: '' }
const SignUp = () => {
    const classes = useStyles();
    const history = useHistory();
    const [showPassword, setShowPassword] = useState(false);
    const handleShowPassword = () => setShowPassword((prevShowPassword) => !prevShowPassword);
    const { addUsers } = useContext(PostContext);
    const [formData, setFormData] = useState(initialState);
    const handleSignUp = async (e) => {
        e.preventDefault();
        try {
            const response = await API.post("/user/signup", formData)
            localStorage.setItem("profile", JSON.stringify(response.data));
            addUsers(response.data);
            history.push('/');
        } catch (error) {
            console.error(error);
        }
    };
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    };
    return (
        <Container component="main" maxWidth="xs">
            <Paper className={classes.paper} elevation={3}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography variant="h5">Sign Up</Typography>
                <form className={classes.form} onSubmit={(e) => handleSignUp(e)}>
                    <Grid container spacing={2}>
                        <Input name="firstName" label="First Name" handleChange={handleChange} autoFocus half />
                        <Input name="lastName" label="Last Name" handleChange={handleChange} half />
                        <Input name="email" label="Email Address" handleChange={handleChange} type="email" />
                        <Input name="password" label="Password" handleChange={handleChange} type={showPassword ? "text" : "password"} handleShowPassword={handleShowPassword} />
                        <Input name="confirmPassword" label="Repeat Password" handleChange={handleChange} type="password" />
                    </Grid>
                    <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
                        Sign Up
                </Button>
                </form>
            </Paper>
        </Container>
    );
};
export default SignUp;