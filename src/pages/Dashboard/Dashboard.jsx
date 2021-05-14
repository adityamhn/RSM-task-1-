import React from 'react'
import { Button, Container } from 'react-bootstrap'
import { useNavigate } from 'react-router'
import { useDispatch } from "react-redux";
import { logoutSuccess } from "../../store/user";
import { useSelector } from 'react-redux'
import './Dashboard.scss'

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
        <Container fluid className="dash-cont">
            <div className="header">
                <h1 className="title">
                    Hello, {user.name}

                </h1>
            </div>

            <div className="logout-cont">
                <Button className="logout" onClick={onLogout}>Logout</Button>
            </div>
        </Container>
    )
}

export default Dashboard
