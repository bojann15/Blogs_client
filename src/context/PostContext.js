import React, { useState, createContext } from 'react';
export const PostContext = createContext();
export const PostContextProvider = (props) => {
    const [posts, setPosts] = useState([]);
    const [shouldUpdate, setShouldUpdate] = useState(true);
    const [currentId, setCurrentId] = useState(null);
    const [users, setUsers] = useState([]);
    const [state, setState] = useState(true);
    const [selectedPost, setSelectedPost] = useState([]);
    const addPosts = (post) => {
        setPosts([...posts, post]);
    };
    const addUsers = (user) => {
        setUsers([...users, user]);
    };
    return (
        <PostContext.Provider value={{ posts, setPosts, addPosts, shouldUpdate, setShouldUpdate, currentId, setCurrentId, addUsers, users, setUsers, state, setState, selectedPost, setSelectedPost }}>
            {props.children}
        </PostContext.Provider>
    )
};