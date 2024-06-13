import React from 'react'
import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PrivateAdminRoute = () => {
    const { adminInfo } = useSelector((state) => state.admin);
  
    return adminInfo ? <Outlet /> : <Navigate to='/admin/login'/>

}

export default PrivateAdminRoute