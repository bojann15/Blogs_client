import React from 'react';
import { Redirect } from "react-router-dom";
import AdminDetails from '../components/Admin/Admindetail/AdminDetails';


const user = JSON.parse(localStorage.getItem('profile'));

function AdminDetailPage() {
    return user?.result.role === 1 ? (
        <div>
            <AdminDetails />
        </div>
    ) : (
        <Redirect from="/admin/posts/:id" to="/" />
    );
};

export default AdminDetailPage;