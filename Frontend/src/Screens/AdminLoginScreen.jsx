import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import FormContainer from '../Components/FormContainer';
import { useLoginMutation } from '../Slices/adminApiSlice';
import { setAdminCredentials } from '../Slices/adminSlice';
import { toast } from 'react-toastify';




const AdminLoginScreen = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [loginAdmin] = useLoginMutation();

    const { adminInfo } = useSelector((state) => state.admin);

    useEffect(() => {
        if (adminInfo) {
            navigate('/admin/dashboard');
        }
    }, [navigate, adminInfo]);

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            const res = await loginAdmin({ email, password }).unwrap();
            dispatch(setAdminCredentials(res));
            navigate('/admin/dashboard');
        } catch (err) {
            toast.error(err?.data?.message || err.error);
        }
    };

    return (
        <FormContainer>
            <h1>Admin Sign In</h1>

            <Form onSubmit={submitHandler}>
                <Form.Group className="my-2" controlId="email">
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control
                        type="email"
                        placeholder="Enter Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    ></Form.Control>
                </Form.Group>

                <Form.Group className="my-2" controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Enter Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    ></Form.Control>
                </Form.Group>

                

                <Button type="submit" variant="primary" className="mt-3">
                    Sign In
                </Button>

                <Row className="py-3">
                    <Col>
                        Not an admin? <Link to="/">Go back to home</Link>
                    </Col>
                </Row>
            </Form>
        </FormContainer>
    );
};

export default AdminLoginScreen;
