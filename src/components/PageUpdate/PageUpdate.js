import React, { useContext, useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { TextField, Button, Typography, Paper } from '@material-ui/core';
import API from '../../api/index';
import FileBase from 'react-file-base64';
import useStyles from './styles';
import { PostContext } from '../../context/PostContext';
const PageUpdate = () => {
    const { id } = useParams();
    const history = useHistory();
    const classes = useStyles();
    const user = JSON.parse(localStorage.getItem('profile'));
    const { setShouldUpdate, setCurrentId } = useContext(PostContext);
    const [postData, setPostData] = useState({
        title: '', message: '', tags: [], selectedFile: '',
    });
    const clear = () => {
        setPostData({ title: '', message: '', tags: [], selectedFile: '' })
    };
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await API.get(`/posts/${id}`)
                setPostData(response.data)
            } catch (err) {
                console.error(err);
            }
        };
        fetchData();
    }, []);
    const submitEdit = async (e) => {
        e.preventDefault();
        e.stopPropagation();

        try {
            await API.put(`/posts/${id}`, { ...postData, name: user?.result?.name })
            setShouldUpdate(true);
            setCurrentId(null);
            clear()
            history.push("/");
        } catch (err) {
            console.error(err)
        }
    };
    return (
        <Paper className={classes.paper}>
            <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={(e) => submitEdit(e)}>
                <Typography variant="h6"> {'Editing a blog'}</Typography>
                <TextField name="title" variant="outlined" label="Title" fullWidth value={postData.title} onChange={(e) => setPostData({ ...postData, title: e.target.value })} />
                <TextField name="message" variant="outlined" label="Message" fullWidth value={postData.message} onChange={(e) => setPostData({ ...postData, message: e.target.value })} />
                <TextField name="tags" variant="outlined" label="Tags" fullWidth value={postData.tags} onChange={(e) => setPostData({ ...postData, tags: e.target.value.split(',') })} />
                <div className={classes.fileInput}><FileBase type="file" multiple={false} onDone={({ base64 }) => setPostData({ ...postData, selectedFile: base64 })} /></div>
                <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" fullWidth>Submit</Button>
                <Button variant="contained" color="secondary" size="small" onClick={clear} fullWidth>Clear</Button>
            </form>
        </Paper >
    );
};
export default PageUpdate;