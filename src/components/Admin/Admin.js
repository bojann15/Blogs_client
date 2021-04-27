import React, { Fragment, useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import API from '../../api/index';
import { PostContext } from '../../context/PostContext';
import DeleteIcon from '@material-ui/icons/Delete';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import ThumbUpAltOutlined from '@material-ui/icons/ThumbUpAltOutlined';
import moment from 'moment';
import useStyles from './styles';
import { Grid, Typography, Button, Table, TableBody, TableContainer, TableHead, TableRow, Paper, Card, CardActions, CardContent, CardMedia } from '@material-ui/core';
import { StyledTableCell, StyledTableRow } from './styles';

const Users = () => {
    const classes = useStyles();
    const history = useHistory();
    const [useres, setUseres] = useState([]);
    const { posts, setPosts } = useContext(PostContext);
    const { state } = useContext(PostContext);
    const [shouldUpdate, setShouldUpdate] = useState(true);

    const handlePostSelect = (id) => {
        history.push(`/admin/posts/${id}`)
    };

    useEffect(() => {
        if (!shouldUpdate) {
            return;
        };
        const fetchData = async () => {
            try {
                const response = await API.get('/users');
                setUseres(response.data)
                setShouldUpdate(false)
            } catch (err) {
                console.error(err)
            }
        };
        fetchData();
    }, [shouldUpdate]);
    const handleDelete = async (id) => {
        try {
            await API.delete(`/users/${id}`);
            setShouldUpdate(true);
        } catch (err) {
            console.error(err)
        }
    };
    useEffect(() => {
        if (!shouldUpdate) {
            return;
        };
        const fetchData = async () => {
            try {
                const response = await API.get('/admin/posts');
                setPosts(response.data)
                setShouldUpdate(false)
            } catch (err) {
                console.error(err)
            }
        };
        fetchData();
    }, [shouldUpdate]);


    const handleDeletePosts = async (e, id) => {
        e.stopPropagation();
        try {
            await API.delete(`/admin/posts/${id}`);
            setShouldUpdate(true);
        } catch (err) {
            console.error(err);
        }
    };
    return (
        <div >
            {!state &&
                <Fragment>
                    <div>
                        <TableContainer component={Paper}>
                            <Table className={classes.table} aria-label="customized table">
                                <TableHead>
                                    <TableRow >
                                        <StyledTableCell align="center">Role</StyledTableCell>
                                        <StyledTableCell align="center">Name</StyledTableCell>
                                        <StyledTableCell align="center">Email</StyledTableCell>
                                        <StyledTableCell align="center"></StyledTableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {useres.map((user) => (
                                        <StyledTableRow key={user._id}>
                                            <StyledTableCell align="center">{user.role === 1 ? 'Admin' : 'User'}</StyledTableCell>
                                            <StyledTableCell align="center">{user.name}</StyledTableCell>
                                            <StyledTableCell align="center">{user.email}</StyledTableCell>
                                            <td>
                                                <Button variant="contained" color="secondary" size="small" onClick={() => handleDelete(user._id)} fullWidth>Delete</Button>
                                            </td>
                                        </StyledTableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </div>
                </Fragment>}

            {
                state &&
                <Fragment>
                    <div>
                        <Grid className={classes.container} container alignItems="stretch" spacing={3}>
                            {posts.map((post) => {
                                return (
                                    <Grid onClick={() => handlePostSelect(post._id)} key={post._id} item xs={12} sm={6} md={6}>
                                        <Card className={classes.card}>
                                            <CardMedia className={classes.media} image={post.selectedFile || 'https://mpng.subpng.com/20180804/qhp/kisspng-blog-computer-icons-vector-graphics-favicon-clip-a-5b661b473a7649.4698522215334183112395.jpg'} title={post.title} />
                                            <div className={classes.overlay}>
                                                <Typography variant="h6">{post.name}</Typography>
                                                <Typography variant="body2">{moment(post.createdAt).fromNow()}</Typography>
                                            </div>
                                            <div className={classes.details}>
                                                <Typography variant="body2" color="textSecondary" component="h2">{post.tags.map((tag) => `#${tag} `)}</Typography>
                                            </div>
                                            <Typography className={classes.title} gutterBottom variant="h5" component="h2">{post.title}</Typography>
                                            <CardContent>
                                                <Typography variant="body2" color="textSecondary" component="p">{post.message}</Typography>
                                            </CardContent>
                                            <CardActions className={classes.cardActions}>
                                                <Button size="small" color="primary" onClick={(e) => handleDeletePosts(e, post._id)}><DeleteIcon fontSize="small" />Delete</Button>
                                                <Button size="small" color="primary" >{(post.likes?.length > 0) ? <><ThumbUpAltIcon fontSize="small" /> &nbsp;{post.likes?.length} {post.likes?.length === 1 ? 'Like' : 'Likes'} </> : <><ThumbUpAltOutlined fontSize="small" />&nbsp;Like</>}</Button>
                                            </CardActions>
                                        </Card>
                                    </Grid>
                                )
                            })}
                        </Grid>
                    </div>
                </Fragment>}
        </div >

    );
};
export default Users;

