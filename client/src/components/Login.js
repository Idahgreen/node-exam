import React, {useState} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';

export default function Login() {

    const [user, setUser] = useState({'username': '', 'password': ''});
    const [error, setError] = useState('')

    const handleChange = (event) => {
        setUser({
            ...user,
            [event.target.name]: event.target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        axios.post('/users/login', user).then(function (response) {
            console.log(response)
            window.location = '/';
        }).catch(function (error) {
            if (error.response.status === 404) {
                setError('The entered Username or password was incorrect')
            }

            if (error.response.status === 429) {
                setError("Your request has been denied too many times - Please wait a bit before trying again.")
            }

            if (error.response.status === 500) {
                setError('Something went wrong in the database - please try again later!')
            }
            console.log()
        })
    }


    return (
        <div className="login">
            <form method="post"
                onSubmit={handleSubmit}>

                <input className="text-input"
                    onChange={handleChange}
                    name="username"
                    placeholder="Username"></input>
                <input className="text-input"
                    onChange={handleChange}
                    name="password"
                    placeholder="Password"
                    type="password"></input>
                <p className="error">
                    {error}</p>
                <div>
                    <Link to="/forgot-password"
                        style={
                            {textDecoration: 'none'}
                    }>Forgot password?</Link>
                    <Link to="/register"
                        style={
                            {textDecoration: 'none'}
                    }>Not a User? Register</Link>
                </div>

                <input className="input-button" type="submit" value="Login"></input>
            </form>


        </div>
    );
}
