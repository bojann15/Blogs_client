import React from 'react';
import { Container, Grow, Grid } from '@material-ui/core';
import Posts from '../components/Posts/Posts';
import Form from '../components/Form/Form';
import Navbar from '../components/Navbar/Navbar'


const Home = () => {
    return (
        <Grow in>
            <Container>
                <Navbar />
                <Grid container justify="space-between" alignItems="stretch" spacing={3}>
                    <Grid item xs={12} sm={7}>
                        <Posts />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <Form />
                    </Grid>
                </Grid>
            </Container>
        </Grow>

    )
};
export default Home;