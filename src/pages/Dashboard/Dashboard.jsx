import React, { useEffect, useState } from 'react'
import { Button, Container } from 'react-bootstrap'
import { useNavigate } from 'react-router'
import { useDispatch } from "react-redux";
import { logoutSuccess } from "../../store/user";
import { useSelector } from 'react-redux'


const Dashboard = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const user = useSelector(state => state.user.value)


    function onLogout(e) {
        e.preventDefault();
        dispatch(logoutSuccess());
        navigate("/", { replace: true });
      }

    return (
        <Container fluid className="d-flex flex-column justify-content-center align-items-center w-100 h-100">
        <p>
        Hello, {user.name} 
        </p>
        <p>
            <Button onClick={onLogout}>Logout</Button>
        </p>
        </Container>
    )
}

export default Dashboard
