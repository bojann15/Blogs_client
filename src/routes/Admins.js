import React from 'react';
import { Redirect } from "react-router-dom";
import Admin from '../components/Admin/Admin';
import AdminNavbar from '../components/Admin/AdminNavbar/AdminNavbar';

const user = JSON.parse(localStorage.getItem('profile'));

function Admins() {
    return user?.result.role === 1 ? (
        <div>
            <AdminNavbar />
            <Admin />
        </div>
    ) : (
        <Redirect from="/admin" to="/" />
    );
};

export default Admins;