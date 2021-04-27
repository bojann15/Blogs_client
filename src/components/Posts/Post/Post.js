import React, { useContext } from 'react';
import { PostContext } from '../../../context/PostContext';
import API from '../../../api/index';
import { Card, CardActions, CardContent, CardMedia, Button, Typography } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import ThumbUpAltOutlined from '@material-ui/icons/ThumbUpAltOutlined';
import { useHistory } from 'react-router-dom';
import moment from 'moment';
import useStyles from './styles';
const Post = ({ post, handleDelete }) => {
    const classes = useStyles();
    let history = useHistory();
    const user = JSON.parse(localStorage.getItem('profile'));
    const { setCurrentId, setShouldUpdate } = useContext(PostContext);
    const handleUpdate = (e, id) => {
        e.stopPropagation();
        history.push(`/posts/${id}/update/`);
        setCurrentId(post._id);
    };
    const likePost = async (e, id) => {
        e.preventDefault();
        e.stopPropagation();
        try {
            await API.put(`/posts/${id}/likePost`, { id })
            setShouldUpdate(true);
            setCurrentId(null);
        } catch (err) {
            console.error(err)
        }
    };
    const Likes = () => {
        if (post.likes?.length > 0) {
            return post.likes?.find((like) => like === (user?.result?.googleId || user?.result?._id))
                ? (
                    <><ThumbUpAltIcon fontSize="small" />&nbsp;{post.likes?.length > 2 ? `You and ${post.likes?.length - 1} others` : `${post.likes?.length} like${post.likes?.length > 1 ? 's' : ''}`}</>
                ) : (
                    <><ThumbUpAltOutlined fontSize="small" />&nbsp;{post.likes?.length} {post.likes?.length === 1 ? 'Like' : 'Likes'}</>
                );
        };
        return <><ThumbUpAltOutlined fontSize="small" />&nbsp;Like</>;
    };

    return (
        <Card className={classes.card}>
            <CardMedia className={classes.media} image={post.selectedFile || 'https://mpng.subpng.com/20180804/qhp/kisspng-blog-computer-icons-vector-graphics-favicon-clip-a-5b661b473a7649.4698522215334183112395.jpg'} title={post.title} />
            <div className={classes.overlay}>
                <Typography variant="h6">{post.name}</Typography>
                <Typography variant="body2">{moment(post.createdAt).fromNow()}</Typography>
            </div>
            {(user?.result?.googleId === post?.creator || user?.result?._id === post?.creator) && (
                <div className={classes.overlay2}>
                    <Button style={{ color: 'white' }} size="small" onClick={((e) => handleUpdate(e, post._id))}> <MoreHorizIcon fontSize="default" /> </Button>
                </div>)}
            <div className={classes.details}>
                <Typography variant="body2" color="textSecondary" component="h2">{post.tags.map((tag) => `#${tag} `)}</Typography>
            </div>
            <Typography className={classes.title} gutterBottom variant="h5" component="h2">{post.title}</Typography>
            <CardContent>
                <Typography variant="body2" color="textSecondary" component="p">{post.message}</Typography>
            </CardContent>
            <CardActions className={classes.cardActions}>
                <Button size="small" color="primary" disabled={!user?.result} onClick={(e) => likePost(e, post._id)}><Likes /></Button>
                {(user?.result?.googleId === post?.creator || user?.result?._id === post?.creator) && (<Button size="small" color="primary" onClick={(e) => handleDelete(e, post._id)}> <DeleteIcon fontSize="small" />Delete</Button>)}
            </CardActions>
        </Card >
    )
};
export default Post;