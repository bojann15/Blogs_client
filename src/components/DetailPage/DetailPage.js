import React, { useContext, useEffect, } from 'react';
import { Card, CardMedia, CardContent, Typography } from '@material-ui/core';
import { useParams } from "react-router-dom";
import API from '../../api/index';
import useStyles from './styles';
import { PostContext } from '../../context/PostContext';
import moment from 'moment';

const DetailPage = () => {
    const { id } = useParams();
    const classes = useStyles();
    const { selectedPost, setSelectedPost, } = useContext(PostContext);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await API.get(`/posts/${id}`)
                setSelectedPost(response.data)
            } catch (err) {
                console.error(err)
            }
        };
        fetchData();
    }, []);
    return (
        <Card className={classes.card}>
            <CardMedia className={classes.media} image={selectedPost.selectedFile || 'https://mpng.subpng.com/20180804/qhp/kisspng-blog-computer-icons-vector-graphics-favicon-clip-a-5b661b473a7649.4698522215334183112395.jpg'} />
            <div className={classes.overlay}>
                <Typography variant="h6">{selectedPost.name}</Typography>
                <Typography variant="body2">{moment(selectedPost.createdAt).fromNow()}</Typography>
            </div>
            <Typography className={classes.title} gutterBottom variant="h5" component="h2">{selectedPost.title}</Typography>
            <CardContent>
                <Typography variant="body2" color="textSecondary" component="p">{selectedPost.message}</Typography>
            </CardContent>
        </Card >
    );
};

export default DetailPage;
