import React, { useState, useEffect, } from 'react';
import { Card, Button, CardMedia, CardContent, Typography, CardActions, Checkbox } from '@material-ui/core';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import ThumbUpAltOutlined from '@material-ui/icons/ThumbUpAltOutlined';
import { useParams, useHistory } from "react-router-dom";
import API from '../../../api/index';
import useStyles from './styles';
import moment from 'moment';
import CheckIcon from '@material-ui/icons/Check';


const AdminDetails = () => {
    const { id } = useParams();
    const history = useHistory();
    const classes = useStyles();
    const [selectedPost, setSelectedPost] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await API.get(`/admin/posts/${id}`)
                setSelectedPost(response.data)
            } catch (err) {
                console.error(err)
            }
        };
        fetchData();
    }, []);
    const isApproveds = async (e,) => {
        e.preventDefault();
        try {

            await API.put(`/admin/posts/${id}`, { isApproved: true })
            history.push("/admin");
        } catch (err) {
            console.error(err)
        }
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
                {(selectedPost.isApproved) ? (<CheckIcon fontSize="large" />) : (<Checkbox inputProps={{ 'aria-label': 'uncontrolled-checkbox' }} onClick={(e) => isApproveds(e)} />)}
                <Button size="small" color="primary" >{(selectedPost.likes?.length > 0) ? <><ThumbUpAltIcon fontSize="small" /> &nbsp;{selectedPost.likes?.length} {selectedPost.likes?.length === 1 ? 'Like' : 'Likes'} </> : <><ThumbUpAltOutlined fontSize="small" />&nbsp;Like</>}</Button>
            </CardActions>
        </Card >
    );
};

export default AdminDetails;
