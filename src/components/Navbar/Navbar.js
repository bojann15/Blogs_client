import React, { useState, useEffect } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import decode from 'jwt-decode';
import { AppBar, Avatar, Button, Typography, Toolbar } from '@material-ui/core';
import blog from '../../images/blog.png';
import useStyles from './styles';
const Navbar = () => {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    const history = useHistory();
    const location = useLocation();
    const classes = useStyles();
    const logout = () => {
        localStorage.clear();
        history.push('/auth');
        setUser(null);
    };
    useEffect(() => {
        const token = user?.token;
        if (token) {
            const decodedToken = decode(token);
            if (decodedToken.exp * 1000 < new Date().getTime()) logout();
        }
        setUser(JSON.parse(localStorage.getItem('profile')))
    }, [location]);

    return (
        <AppBar className={classes.appBar} position="static" color="inherit">
            <div className={classes.brandContainer}>
                <Typography component={Link} to="/" className={classes.heading} variant="h2" align="center">Blog</Typography>
                <img className={classes.image} src={blog} alt="blog" height="100" />
            </div>
            <Toolbar className={classes.toolbar}>
                {user ? (
                    <div className={classes.profile}>
                        <Avatar className={classes.purple} alt={user.result.name} src={user.result.imageUrl}>{user.result.name.charAt(0)}</Avatar>
                        <Typography className={classes.userName} variant="h6">{user.result.name}</Typography>
                        <Button variant="contained" className={classes.logout} color="secondary" onClick={logout}>Logout</Button>
                    </div>
                ) : (
                    <div >
                        <Button className={classes.button} component={Link} to="/auth" variant="contained" color="primary">Sign In</Button>
                        <Button component={Link} to="/auth/signup" variant="contained" color="primary">Sign Up</Button>
                    </div>

                )}
            </Toolbar>
        </AppBar >
    );
};

export default Navbar;