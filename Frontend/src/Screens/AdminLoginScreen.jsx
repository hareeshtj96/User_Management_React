import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Form, Button, Row, Col, Spinner, Alert } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import FormContainer from '../Components/FormContainer';
import { useLoginMutation } from '../Slices/adminApiSlice';
import { setAdminCredentials } from '../Slices/adminSlice';
import { toast } from 'react-toastify';




const AdminLoginScreen = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

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
        setLoading(true)
        setError(null)
        try {
            const res = await loginAdmin({ email, password }).unwrap();
            dispatch(setAdminCredentials(res));
            navigate('/admin/dashboard');
        } catch (err) {
            setError(err?.data?.message || err.error);
            toast.error(err?.data?.message || err.error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <FormContainer>
            <h1 className='text-4xl font-bold mb-4'>Admin Sign In</h1>

            {error && <Alert variant='danger'>{error}</Alert>}

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

                

                <Button type="submit" variant="primary" className="mt-3" disabled={loading}>
                    {loading? <Spinner as="span" animation='border' size='sm' role='status' aria-hidden='true' /> : 'sign In'}
                </Button>

                <Row className="py-3">
                    <Col>
                        Not an admin? <Link to="/" className="text-blue-500 underline hover:text-blue-700">Go back to home</Link>
                    </Col>
                </Row>
            </Form>
        </FormContainer>
    );
};

export default AdminLoginScreen;
