import React, { useState } from 'react'
import { Form, Card, Button, Container, Spinner, Modal } from "react-bootstrap"
import { Link } from 'react-router-dom'
import './Register.scss'
import { Formik } from "formik";
import * as yup from "yup";
import { register } from '../../services/auth.services';
import { showAlert } from '../../util/util';

const validationSchema = yup.object().shape({
    name: yup.string()
        .required('This is a required field')
        .strict(),
    email: yup.string()
        .email("Invalid email format")
        .required('This is a required field')
        .strict(),
    password: yup.string()
        .required('This is a required field')
        .matches(/^(?=.{8,}$)(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*\W).*$/, "Must contain 8 characters, one uppercase, one lowercase, one number and one special case character")
})

const formInitialValues = {
    name: '',
    email: '',
    password: ''
}

const Register = () => {

    const [modalOpen, setModalOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const openModal = () => setModalOpen(true);
    const closeModal = () => setModalOpen(false);


    const handleRegister = async (values) => {
        setLoading(true)
        const { name, email, password } = values;

        try {
            const res = await register(name, email, password)
            if (res) {
                openModal()
            }
        } catch (e) {
            showAlert(e.response.data.message)
        }
        setLoading(false)
    }

    return (<>
        <Container className="register-cont">
            <div className="wrapper">
                <Card className="card">
                    <div className="header">
                        <h1 className="title">Register</h1>
                        <p className="sub-title">Welcome!</p>
                    </div>
                    <Formik
                        initialValues={formInitialValues}
                        validationSchema={validationSchema}
                        onSubmit={(values) => {
                            handleRegister(values)
                        }}>
                        {
                            ({ handleChange, handleBlur, handleSubmit, values, touched, errors }) => {
                                return (
                                    <>
                                        <Form onSubmit={(e) => {
                                            e.preventDefault()
                                            handleSubmit()
                                        }}>
                                            <Form.Group className="group">
                                                <Form.Control
                                                    type="text"
                                                    name="name"
                                                    className="input-1"
                                                    placeholder="name"
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    isInvalid={errors.name}
                                                />
                                                <Form.Control.Feedback type='invalid'>
                                                    {errors.name}
                                                </Form.Control.Feedback>
                                            </Form.Group>

                                            <Form.Group className="group">
                                                <Form.Control
                                                    type="text"
                                                    name="email"
                                                    className="input-1"
                                                    placeholder="email"
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    isInvalid={errors.email}
                                                />
                                                <Form.Control.Feedback type='invalid'>
                                                    {errors.email}
                                                </Form.Control.Feedback>
                                            </Form.Group>
                                            <Form.Group className="group">
                                                <Form.Control
                                                    type="password"
                                                    name="password"
                                                    className="input-2"
                                                    placeholder="Password"
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    isInvalid={errors.password}
                                                />
                                                <Form.Control.Feedback type='invalid' className="error-message">
                                                    {errors.password}
                                                </Form.Control.Feedback>
                                            </Form.Group>
                                            <Form.Group className="group">
                                                <Button disabled={loading} type="submit" className="button w-100">
                                                    {loading ? <Spinner animation="border" variant="danger" /> : <>Register</>}
                                                </Button>
                                                <Form.Text>Already a member? <Link to='/login'>Login</Link> </Form.Text>
                                            </Form.Group>
                                        </Form>
                                    </>)
                            }}
                    </Formik>
                </Card>
            </div>
        </Container>
        <Modal centered show={modalOpen} onHide={closeModal}>
            <Modal.Header closeButton>
                <Modal.Title>Account Created</Modal.Title>
            </Modal.Header>
            <Modal.Body>A verification email has been sent. Please check your email and click on the link to verify your account.</Modal.Body>
            <Modal.Footer style={{
                border: 'none'
            }}>
            </Modal.Footer>
        </Modal>
    </>
    )
}

export default Register
