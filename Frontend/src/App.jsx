import React from 'react';
import { Outlet } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import Header from './Components/Header';
import AdminHeader from './Components/AdminHeader';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector } from 'react-redux';


const App = () => {
  const { adminInfo } = useSelector((state) => state.admin);
  return (
    <>
    {adminInfo ? <AdminHeader /> : <Header />}
    <ToastContainer />
    <Container className='my-2'>
      <Outlet />
    </Container>
    
    </>
  )
}

export default App