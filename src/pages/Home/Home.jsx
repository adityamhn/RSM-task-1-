import React from 'react'
import { Container } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import './Home.scss'

const Home = () => {
    return (
        <Container fluid className="home-cont">
            <div className="title-group">
                <h1 className="title">Welcome</h1>
            </div>
            <Link to='/login' className="group">
                <div className="buton">Login</div>
            </Link>
            <Link to='/register' className="group">
                <div className="buton">Register</div>
            </Link>
        </Container>
    )
}

export default Home
