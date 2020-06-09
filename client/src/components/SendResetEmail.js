import React from 'react';

export default function SendResetEmail() {
    return(
    <div className="register-form">
        <p>Please enter your E-Mail to request a password reset:</p>
        <form method="post" action="/users/password-reset/send-mail">
            <input className="text-input" name="email" placeholder="E-Mail"></input>
            <input className="input-button"type="submit" value="Request Password reset"></input>
        </form>


    </div>
    );
}