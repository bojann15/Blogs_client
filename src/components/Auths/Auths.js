import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import API from '../../api/index';
import { Avatar, Button, Paper, Grid, Typography, Container } from '@material-ui/core';
import { GoogleLogin } from 'react-google-login';
import Icon from './icon';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import { PostContext } from '../../context/PostContext';
import useStyles from './styles';
import Input from './Input';
const initialState = { firstName: '', lastName: '', email: '', password: '', confirmPassword: '' }
const Auths = () => {
    let history = useHistory();
    const classes = useStyles();
    const { addUsers } = useContext(PostContext);
    const [showPassword, setShowPassword] = useState(false);
    const [isSignup, setIsSignup] = useState(false);
    const [formData, setFormData] = useState(initialState);
    const handleShowPassword = () => setShowPassword((prevShowPassword) => !prevShowPassword);
    const handleSignUp = async (e) => {
        e.preventDefault();
        try {
            const response = await API.post("/user/signup", formData)
            localStorage.setItem("profile", JSON.stringify(response.data));
            addUsers(response.data);
            history.push('/');
        } catch (error) {
            console.error(error)
        }
    };
    const handleSignIn = async (e) => {
        e.preventDefault();
        try {
            const response = await API.post("/user/signin", formData)
            localStorage.setItem("profile", JSON.stringify(response.data));
            addUsers(response.data);
            const user = JSON.parse(localStorage.getItem('profile'));
            history.push('/');
            user.result.role === 1 && history.push('/admin');
        } catch (error) {
            console.error(error)
        }
    };
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    };
    const switchMode = () => {
        setIsSignup((prevIsSignup) => !prevIsSignup)
        setShowPassword(false)
    };
    const googleSuccess = (res) => {
        const result = res?.profileObj;
        const token = res?.tokenId;
        localStorage.setItem("profile", JSON.stringify({ result, token }));
        history.push('/');
    };
    const googleFailure = (error) => {
        console.error(error)
        console.log("Google Sign In was unsuccessful. Try Again Later")
    };
    return (
        <Container component="main" maxWidth="xs">
            <Paper className={classes.paper} elevation={3}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography variant="h5">{isSignup ? 'Sign Up' : 'Sign In'}</Typography>
                <form className={classes.form} onSubmit={(e) => isSignup ? handleSignUp(e) : handleSignIn(e)}>
                    <Grid container spacing={2}>
                        {
                            isSignup && (
                                <>
                                    <Input name="firstName" label="First Name" handleChange={handleChange} autoFocus half />
                                    <Input name="lastName" label="Last Name" handleChange={handleChange} half />
                                </>
                            )}
                        <Input name="email" label="Email Address" handleChange={handleChange} type="email" />
                        <Input name="password" label="Password" handleChange={handleChange} type={showPassword ? "text" : "password"} handleShowPassword={handleShowPassword} />
                        {isSignup && <Input name="confirmPassword" label="Repeat Password" handleChange={handleChange} type="password" />}
                    </Grid>
                    < Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
                        {isSignup ? 'Sign Up' : 'Sign In'}
                    </Button>
                    <GoogleLogin clientId="777845847095-9biuph0fhovvm6ssuscd3kjhso52236r.apps.googleusercontent.com" render={(renderProps) => (<Button className={classes.googleButton} color='primary' fullWidth onClick={renderProps.onClick} disabled={renderProps.disabled} startIcon={<Icon />} variant="contained">Google Sign In </Button>)} onSuccess={googleSuccess} onFailure={googleFailure} cookiePolicy="single_host_origin" />
                    <Grid container justify="flex-end">
                        <Grid item>
                            <Button onClick={switchMode}>
                                {isSignup ? 'Already have an account? Sign In' : "Don't have an account? Sign Up"}
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </Container >
    );
};
export default Auths;