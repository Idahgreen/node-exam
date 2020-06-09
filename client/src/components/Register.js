import React, {useState} from 'react';
import axios from 'axios';

export default function Register() {

    
    const [user, setUser] = useState({'username':'','first_name':'', 'last_name':'','email':'','password':'','repeatPassword':''});
    const [error, setError] = useState('')

    const handleChange = (event) => {
        setUser({...user, [event.target.name]: event.target.value})
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        axios.post('/users/register', user)
          .then(function (response) {
              console.log(response)
              window.location = '/';
          })
          .catch(function (error) {
              if(error.response.status === 404){
                  setError('Please fill out all fields')
              }

              if(error.response.status === 400){
                setError("The Password doesn't fullfill the requirements")
            }
            if(error.response.status === 429){
                setError("Your request has been denied too many times - Please wait a bit before trying again.")
            }

              if(error.response.status === 500){
                setError('Something went wrong in the database - please try again later!')
            }
              console.log()
          }) 
    }



    return(
    <div className="register-form">
        <form method="post" onSubmit={handleSubmit}>
            <input className="text-input" onChange={handleChange} name="username" placeholder="Username"></input>
            <input className="text-input" onChange={handleChange} name="email" placeholder="Email"></input>
            <input className="text-input" onChange={handleChange} name="first_name" placeholder="First Name"></input>
            <input className="text-input" onChange={handleChange} name="last_name" placeholder="Last Name"></input>
            <input className="text-input" onChange={handleChange} name="password" placeholder="Password" type="password"></input>
            <input className="text-input" onChange={handleChange} name="repeatPassword" placeholder="Repeat Password" type="password"></input>
            <p className="error">{error}</p>
            <input className="input-button"type="submit" value="register"></input>
        </form>


    </div>
    );
}