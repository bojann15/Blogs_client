import React, { useContext, useState } from 'react';
import { TextField, Button, Typography, Paper } from '@material-ui/core';
import API from '../../api/index';
import FileBase from 'react-file-base64';
import useStyles from './styles';
import { PostContext } from '../../context/PostContext';
import { useHistory } from 'react-router-dom';

const Form = () => {
    const classes = useStyles();
    const user = JSON.parse(localStorage.getItem('profile'));
    const history = useHistory();
    const { addPosts, setShouldUpdate } = useContext(PostContext);
    const [postData, setPostData] = useState({
        title: '', message: '', tags: [], selectedFile: '',
    });
    const clear = () => {
        setPostData({ title: '', message: '', tags: [], selectedFile: '' });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await API.post("/posts", { ...postData, name: user?.result?.name });
            addPosts(response.data);
            setShouldUpdate(true);
            clear();
        } catch (err) {
            console.log(err);
        }
    };
    const handleAdmin = () => {
        history.push('/admin')
    };
    if (!user?.result?.name) {
        return (
            <Paper className={classes.paper}>
                <Typography variant="h6" align="center">
                    Please Sign In to create your own blog.
                </Typography>
            </Paper>
        );
    };
    return (
        <Paper className={classes.paper}>
            <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={(e) => handleSubmit(e)}>
                <Typography variant="h6"> {'Creating a blog'}</Typography>
                <TextField name="title" variant="outlined" label="Title" fullWidth value={postData.title} onChange={(e) => setPostData({ ...postData, title: e.target.value })} />
                <TextField name="message" variant="outlined" label="Message" fullWidth value={postData.message} onChange={(e) => setPostData({ ...postData, message: e.target.value })} />
                <TextField name="tags" variant="outlined" label="Tags" fullWidth value={postData.tags} onChange={(e) => setPostData({ ...postData, tags: e.target.value.split(',') })} />
                <div className={classes.fileInput}><FileBase type="file" multiple={false} onDone={({ base64 }) => setPostData({ ...postData, selectedFile: base64 })} /></div>
                <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" fullWidth>Submit</Button>
                <Button className={classes.button} variant="contained" color="secondary" size="small" onClick={clear} fullWidth>Clear</Button>
                {(user?.result?.role === 1) && (<Button variant="contained" color="primary" size="small" onClick={(() => handleAdmin())} fullWidth >Admin </Button>)}
            </form>
        </Paper >
    );
};
export default Form;