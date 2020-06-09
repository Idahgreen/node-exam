import React from 'react';

export default function ResetPassword() {
    return(
    <div className="register-form">
        <form method="post" action="/users/password-reset">
            <input className="text-input" name="username" placeholder="Username"></input>
            <input className="text-input" name="password" placeholder="Password" type="password"></input>
            <input className="text-input" name="repeatPassword" placeholder="Repeat Password" type="password"></input>
            <input className="input-button"type="submit" value="register"></input>
        </form>


    </div>
    );
}