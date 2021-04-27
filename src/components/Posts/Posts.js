import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import API from '../../api/index';
import { PostContext } from '../../context/PostContext';
import { Grid, CircularProgress } from '@material-ui/core';
import Post from './Post/Post';
import useStyles from './styles';
const Posts = () => {
    const classes = useStyles();
    const history = useHistory();
    const { posts, setPosts, shouldUpdate, setShouldUpdate } = useContext(PostContext);
    useEffect(() => {
        if (!shouldUpdate) {
            return;
        };
        const fetchData = async () => {
            try {
                const response = await API.get('/posts');
                setPosts(response.data);
                setShouldUpdate(false);

            } catch (err) {
                console.error(err)
            }
        };
        fetchData();
    }, [shouldUpdate]);
    const handleDelete = async (e, id) => {
        e.stopPropagation();
        try {
            await API.delete(`/posts/${id}`);
            setShouldUpdate(true);
        } catch (err) {
            console.error(err);
        }
    };
    const handlePostSelect = (id) => {
        history.push(`/posts/${id}`)
    };
    return (
        !posts.length ? <CircularProgress /> : (
            <Grid className={classes.container} container alignItems="stretch" spacing={3}>
                {posts.map((post) => {
                    return (
                        <Grid onClick={() => handlePostSelect(post._id)} key={post._id} item xs={12} sm={6} md={6}>
                            <Post post={post} handleDelete={handleDelete} />
                        </Grid>
                    )
                })}
            </Grid>
        )
    );
};
export default Posts;