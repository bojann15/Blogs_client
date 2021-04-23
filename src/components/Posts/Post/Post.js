import React, { useContext } from 'react';
import { PostContext } from '../../../context/PostContext';
import { Card, CardActions, CardContent, CardMedia, Button, Typography } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import { useHistory } from 'react-router-dom';
import moment from 'moment';
import useStyles from './styles';
const Post = ({ post, handleDelete }) => {
    const classes = useStyles();
    let history = useHistory();
    const user = JSON.parse(localStorage.getItem('profile'));
    const { setCurrentId } = useContext(PostContext)
    const handleUpdate = (e, id) => {
        e.stopPropagation();
        history.push(`/posts/${id}/update/`);
        setCurrentId(post._id);
    };
    return (
        <Card className={classes.card}>
            <CardMedia className={classes.media} image={post.selectedFile || 'https://mpng.subpng.com/20180804/qhp/kisspng-blog-computer-icons-vector-graphics-favicon-clip-a-5b661b473a7649.4698522215334183112395.jpg'} title={post.title} />
            <div className={classes.overlay}>
                <Typography variant="h6">{post.name}</Typography>
                <Typography variant="body2">{moment(post.createdAt).fromNow()}</Typography>
            </div>
            {(user?.result?._id === post?.creator) && (
                <div className={classes.overlay2}>
                    <Button style={{ color: 'white' }} size="small" onClick={((e) => handleUpdate(e, post._id))} >
                        <MoreHorizIcon fontSize="default" />
                    </Button>
                </div>
            )
            }
            <Typography className={classes.title} gutterBottom variant="h5" component="h2">{post.title}</Typography>
            <CardContent>
                <Typography variant="body2" color="textSecondary" component="p">{post.message}</Typography>
            </CardContent>
            <CardActions className={classes.cardActions}>
                {(user?.result?._id === post?.creator) && (<Button size="small" color="primary" onClick={(e) => handleDelete(e, post._id)}>
                    <DeleteIcon fontSize="small" />
                    Delete
                </Button>)}
            </CardActions>
        </Card >
    )
}
export default Post;