import React, { useState, useEffect } from 'react'
import { Form, Card, Button, Container, Spinner } from "react-bootstrap"
import { Formik } from "formik";
import * as yup from "yup";
import { useNavigate, useParams } from 'react-router';
import { showAlert } from '../../util/util';
import { checkResetPasswordToken, resetPassword } from '../../services/auth.services';

const validationSchema = yup.object().shape({
    newPassword: yup.string().required("Password is a required field").matches(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
        "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
    ),
    confirmNewPassword: yup.string()
        .oneOf([yup.ref('newPassword'), null], 'Passwords must match')

})

const formInitialValues = {

    newPassword: ''
}

const ResetPassword = () => {
    let { token, userId } = useParams()
    const [tokenVerified, setTokenVerified] = useState(true)
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate()

    useEffect(() => {
        setLoading(true)
        checkResetPasswordToken(token, userId).then(res => {
            if (res.data.message === 'link verified.') {
                setTokenVerified(true)
                setLoading(false)
            } else {
                setLoading(false)
                showAlert("Invalid! Unauthorized.")
                navigate('/', { replace: true })
            }
        })

    }, [token, userId])

    const onFormSubmit = async (credentials) => {

        setLoading(true)
        const password = credentials.newPassword

        const res = await resetPassword(token, userId, password)
        if (res.status === 200) {
            navigate('/login', { replace: true })
            setLoading(false)
            showAlert(res.data.message)
        }

    }

    return (
        <Container className="login-cont">
            <div className="wrapper">
                <Card className="card">
                    <div className="header">
                        <h1 className="title">Reset Password</h1>
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
                                                    type="password"
                                                    name="newPassword"
                                                    className="input-2"
                                                    placeholder="enter new password"
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    isInvalid={errors.newPassword}
                                                />
                                                <Form.Control.Feedback type='invalid' className="error-message">
                                                    {errors.newPassword}
                                                </Form.Control.Feedback>
                                            </Form.Group>
                                            <Form.Group className="group">
                                                <Form.Control
                                                    type="password"
                                                    name="confirmNewPassword"
                                                    className="input-2"
                                                    placeholder="confirm your password"
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    isInvalid={errors.confirmNewPassword}
                                                />
                                                <Form.Control.Feedback type='invalid' className="error-message">
                                                    {errors.confirmNewPassword}
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

                                    </>)
                            }}
                    </Formik>

                </Card>

            </div>

        </Container>
    )
}

export default ResetPassword
