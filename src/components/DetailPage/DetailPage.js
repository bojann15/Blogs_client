import React, { useContext, useEffect, } from 'react';
import { Card, CardMedia, CardContent, Typography, Button, CardActions } from '@material-ui/core';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import ThumbUpAltOutlined from '@material-ui/icons/ThumbUpAltOutlined';
import { useParams } from "react-router-dom";
import API from '../../api/index';
import useStyles from './styles';
import { PostContext } from '../../context/PostContext';
import moment from 'moment';

const DetailPage = () => {
    const { id } = useParams();
    const classes = useStyles();
    const user = JSON.parse(localStorage.getItem('profile'));
    const { selectedPost, setSelectedPost, } = useContext(PostContext);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await API.get(`/posts/${id}`);
                setSelectedPost(response.data);
            } catch (err) {
                console.error(err);
            }
        };
        fetchData();
    }, []);
    const Likes = () => {
        if (selectedPost.likes?.length > 0) {
            return selectedPost.likes?.find((like) => like === (user?.result?.googleId || user?.result?._id))
                ? (
                    <><ThumbUpAltIcon fontSize="small" />&nbsp;{selectedPost.likes?.length > 2 ? `You and ${selectedPost.likes?.length - 1} others` : `${selectedPost.likes?.length} like${selectedPost.likes?.length > 1 ? 's' : ''}`}</>
                ) : (
                    <><ThumbUpAltOutlined fontSize="small" />&nbsp;{selectedPost.likes?.length} {selectedPost.likes?.length === 1 ? 'Like' : 'Likes'}</>
                );
        }

        return <><ThumbUpAltOutlined fontSize="small" />&nbsp;Like</>;
    };
    return (
        <Card className={classes.card}>
            <CardMedia className={classes.media} image={selectedPost.selectedFile || 'https://mpng.subpng.com/20180804/qhp/kisspng-blog-computer-icons-vector-graphics-favicon-clip-a-5b661b473a7649.4698522215334183112395.jpg'} />
            <div className={classes.overlay}>
                <Typography variant="h6">{selectedPost.name}</Typography>
                <Typography variant="body2">{moment(selectedPost.createdAt).fromNow()}</Typography>
            </div>
            <div className={classes.details}>
                <Typography variant="body2" color="textSecondary" component="h2">{selectedPost.tags?.map((tag) => `#${tag} `)}</Typography>
            </div>
            <Typography className={classes.title} gutterBottom variant="h5" component="h2">{selectedPost.title}</Typography>
            <CardContent>
                <Typography variant="body2" color="textSecondary" component="p">{selectedPost.message}</Typography>
            </CardContent>
            <CardActions className={classes.cardActions}>
                <Button size="small" color="primary" ><Likes /></Button>
            </CardActions>
        </Card >
    );
};

export default DetailPage;
