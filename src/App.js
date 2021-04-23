import React from 'react';
import { Container } from '@material-ui/core';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from './routes/Home';
import Auth from './routes/Auth'
import { PostContextProvider } from './context/PostContext';
import Admins from './routes/Admins';
import PostsDetailPage from './routes/PostsDetailPage';
import UpdatePage from './routes/UpdatePage';
import AdminDetailPage from './routes/AdminDetailPage';

const App = () => {
    return (
        <PostContextProvider>
            <Container maxwidth="lg" >
                <Router>
                    <Switch>
                        <Route path="/" exact component={Home} />
                        <Route path="/auth" exact component={Auth} />
                        <Route path="/admin" exact component={Admins} />
                        <Route path="/admin/posts/:id" exact component={AdminDetailPage} />
                        <Route path="/posts/:id" exact component={PostsDetailPage} />
                        <Route path="/posts/:id/update/" exact component={UpdatePage} />
                    </Switch>
                </Router>
            </Container>
        </PostContextProvider>
    )

}
export default App;