import React, { useState,useEffect } from 'react'
import { Navbar, Table, Container, Row, Col, ButtonGroup, Button, Form } from 'react-bootstrap';

import { useDispatch, useSelector } from 'react-redux';
import { addUsers, deleteUser, getSingleUser, loadUsers, updateUser } from './redux/action';
import { toast } from 'react-toastify';

const initilaState = {
    name: '',
    email: '',
    contact: '',
    address: ''
}
const Home = () => {
    const [user, setUser] = useState(initilaState);
    const [edit, setEdit] = useState(false);
    const dispatch = useDispatch();
    const { users, msg, userget } = useSelector(state => state.data);

    const { name, email, contact, address } = user;

    useEffect(() => {
        dispatch(loadUsers());
    }, [dispatch]);
    const handleSubmit = (e) => {
        e.preventDefault();
        if(!edit){
            dispatch(addUsers(user));
            setUser({name:'',email:'',contact:'',address:''});
        }
        else{
            dispatch(updateUser(user,userget._id));
            setUser({name:'',email:'',contact:'',address:''});
            setEdit(false);
        }
    };
    const handleChange = (e) => {
        let { name, value } = e.target;
        setUser({ ...user, [name]: value });
    };
    const handleDelete = (id) => {
        // console.log(id);
        if(window.confirm('Are you sure you want to delete?')){
            dispatch(deleteUser(id));
        }
    };
    const handleEdit = (id) => {
        dispatch(getSingleUser(id));
        setEdit(true);
    };
    useEffect(() => {
        if (userget) {
            setUser(userget);
        }
    }, [userget]);
    useEffect(() => {
        if (msg) {
            toast.success(msg);
        }
    }, [msg]);
    return (
        <>
            <Navbar bg="primary" className="justify-content-center">
                <Navbar.Brand>
                    flask-react
                </Navbar.Brand>
            </Navbar>
            <Container>
                <Row>
                    <Col md={4} mt={2}>
                        <Form onSubmit={handleSubmit}>
                            <Form.Group controlId="name">
                                <Form.Label>Name</Form.Label>
                                <Form.Control type="text" placeholder="Enter Name" name='name' value={name || ''} onChange={handleChange}/>
                            </Form.Group>
                            <Form.Group controlId="name">
                                <Form.Label>Email</Form.Label>
                                <Form.Control type="text" placeholder="Enter Email" name='email' value={email || ''} onChange={handleChange}/>
                            </Form.Group>
                            <Form.Group controlId="name">
                                <Form.Label>Address</Form.Label>
                                <Form.Control type="text" placeholder="Enter Address" name='address' value={address || ''} onChange={handleChange}/>
                            </Form.Group>
                            <Form.Group controlId="name">
                                <Form.Label>Contact</Form.Label>
                                <Form.Control type="text" placeholder="Enter Contact" name='contact' value={contact || ''} onChange={handleChange}/>
                            </Form.Group>
                            <div className="d-grid gap-2 mt-2">
                                <Button variant="primary" type="submit">
                                    {edit ? "Update":"Submit"}
                                </Button>
                            </div>
                        </Form>
                    </Col>
                    <Col md={8} mt={2}>
                        <Table border="true" hover="true">
                            <thead>
                                <tr>
                                    <th>No.</th>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Contact</th>
                                    <th>Address</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            {users.map((user, index) => (
                                <tbody key={index}>
                                    <tr>
                                        <td>{index + 1}</td>
                                        <td>{user.name}</td>
                                        <td>{user.email}</td>
                                        <td>{user.contact}</td>
                                        <td>{user.address}</td>
                                        <td>
                                            <ButtonGroup>
                                                <Button style={{ marginRight: '5px' }} variant="danger" onClick={() => handleDelete(user._id)}>
                                                    Delete
                                                </Button>
                                                <Button style={{ marginRight: '5px' }} variant="primary" onClick={() => handleEdit(user._id)}>
                                                    Edit
                                                </Button>
                                            </ButtonGroup>
                                        </td>
                                    </tr>
                                </tbody>
                            ))}
                        </Table>
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default Home