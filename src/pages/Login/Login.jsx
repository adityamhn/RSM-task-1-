import React, { useState,useEffect } from 'react'
import { Form, Card, Button, Container, Spinner,Alert } from "react-bootstrap"
import { Link, useNavigate } from 'react-router-dom'
import './Login.scss'
import { Formik } from "formik";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { loginThunk } from "../../store/user";
import { unwrapResult } from "@reduxjs/toolkit";
import { showAlert } from "../../util/util";

const validationSchema = yup.object().shape({

    email: yup.string()
        .email("Invalid email format")
        .required('This is a required field')
        .strict(),
    password: yup.string()
        .required('This is a required field')
})

const formInitialValues = {
    email: '',
    password: ''
}

const Login = () => {
    const navigate = useNavigate()

    const { loading } = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const [emailVerified, setEmailVerified] = useState(false);

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        if (urlParams.get("verified") === "true") {
          setEmailVerified(true);
        }
      }, []);


    const handleLogin = async(credentials) => {
        try {
            const res = await dispatch(loginThunk(credentials));
            const user = unwrapResult(res);
            showAlert("Welcome, " + user.name + "!", "success");
            navigate("/dashboard", { replace: true });
          } catch (err) {
            showAlert(err.message);
          }
    }

    return (
        <Container className="login-cont">
        {emailVerified ? (
                              <Alert key="emailVerified" variant="success">
                                Email Verified!
                              </Alert>
                            ) : null}
            <div className="wrapper">
                <Card className="card">
                    <div className="header">
                        <h1 className="title">Login</h1>
                        <p className="sub-title">Welcome Back!</p>
                    </div>
                    <Formik
                        initialValues={formInitialValues}
                        validationSchema={validationSchema}
                        onSubmit={(values) => {
                            handleLogin(values)
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
                                onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    isInvalid={errors.password}
                                className="input-2"
                                placeholder="Password"
                            />
                            <Form.Control.Feedback type='invalid' className="error-message">
                                                    {errors.password}
                                                </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="group d-flex flex-column">
                            <Button disabled={loading} type="submit" className="button w-100">
                                                    {loading ? <Spinner animation="border" variant="danger" /> : <>Login</>}
                                                </Button>
                            <Form.Text>New here? <Link to='/register'>Register</Link> </Form.Text>
                            <Form.Text>Forgot Password? <Link to='/forgot-password'>click here</Link> </Form.Text>
                        </Form.Group>
                    </Form>

                                    </>)}}
                                    </Formik>
                   
                </Card>

            </div>

        </Container>
    )
}

export default Login
