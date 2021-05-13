import React, { useState } from 'react'
import { Form, Card, Button, Container, Spinner,Modal } from "react-bootstrap"
import { Formik } from "formik";
import * as yup from "yup";
import { Link, useNavigate } from 'react-router-dom'
import {forgotPassword} from '../../services/auth.services'

const validationSchema = yup.object().shape({

    email: yup.string()
        .email("Invalid email format")
        .required('This is a required field')
        .strict(),

})

const formInitialValues = {
    email: '',
}

const ForgotPassword = () => {
    const [modalOpen, setModalOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const openModal = () => setModalOpen(true);
    const closeModal = () => setModalOpen(false);

  const onFormSubmit = async(values) => {

      setLoading(true)

      await forgotPassword(values.email);
      setLoading(false);
      openModal();

  }

    return (
        <>
        <Container className="login-cont">
            <div className="wrapper">
                <Card className="card">
                    <div className="header">
                        <h1 className="title">Forgot Password</h1>
                    </div>
                    <Formik
                        initialValues={formInitialValues}
                        validationSchema={validationSchema}
                        onSubmit={(values) => {
                            onFormSubmit(values)
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
                        <Form.Group className="group d-flex flex-column">
                            <Button disabled={loading} type="submit" className="button w-100">
                                                    {loading ? <Spinner animation="border" variant="danger" /> : <>Submit</>}
                                                </Button>
                            {/* <Form.Text>New here? <Link to='/register'>Register</Link> </Form.Text>
                            <Form.Text>Forgot Password? <Link to='/forgot-password'>click here</Link> </Form.Text> */}
                        </Form.Group>
                    </Form>

                                    </>)}}
                                    </Formik>
                   
                </Card>

            </div>

        </Container>
        <Modal centered show={modalOpen} onHide={closeModal}>
            <Modal.Header closeButton>
                <Modal.Title>Request sent</Modal.Title>
            </Modal.Header>
            <Modal.Body>If the email address is known to us! We will send a password recovery link in few minutes.</Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={closeModal}>
                    Close
          </Button>
            </Modal.Footer>
        </Modal>
        </>
    )
}

export default ForgotPassword
