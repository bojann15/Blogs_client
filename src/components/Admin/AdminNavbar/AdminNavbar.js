import React, { useState, useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { AppBar, Button, Typography, Toolbar } from '@material-ui/core';
import { PostContext } from '../../../context/PostContext';
import HomeIcon from '@material-ui/icons/Home';
import PostAddIcon from '@material-ui/icons/PostAdd';
import PeopleIcon from '@material-ui/icons/People';
import useStyles from './styles';
const AdminNavbar = () => {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    const { setState } = useContext(PostContext)
    const history = useHistory();
    const classes = useStyles();
    const logout = () => {
        localStorage.clear();
        history.push('/auth')
        setUser(null);
    };
    return (
        <AppBar className={classes.appBar} position="static" color="inherit">
            <div className={classes.brandContainer}>
                <Typography component={Link} to="/" className={classes.heading} variant="h6" align="center"><HomeIcon fontSize="large" /></Typography>
                <Button size="small" color="primary" onClick={() => setState(false)}><PeopleIcon fontSize="large" /></Button>
                <Button size="small" color="primary" onClick={() => setState(true)}><PostAddIcon fontSize="large" /></Button>
            </div>
            <Toolbar className={classes.toolbar}>
                <div className={classes.profile}>
                    <Typography className={classes.heading} variant="h4">Admin</Typography>
                    <Button variant="contained" className={classes.logout} color="secondary" onClick={logout}>Logout</Button>
                </div>
            </Toolbar>
        </AppBar >
    )
};
export default AdminNavbar;