import React, {useState} from "react";
import {Link} from 'react-router-dom'

export default function EditAccount(props) {
    const [userId] = useState(props);
    let user = userId.location.state


    return <div className="account">
        <div className="account-icon"></div>
        <div className="account-info">
            <p>{
                user.username
            }</p>
            <p>
                {user.first_name} {user.last_name}
            </p>
        </div>
        <div className="account-form">
            <form method="post" className="register-form" action="/account/update">
                <label>E-Mail</label>
                <input className="text-input" required name="email" placeholder="E-Mail"
                    defaultValue={
                        user.email
                }></input>
                <br></br>
                <label>First Name</label>
                <input className="text-input" required name="first_name"
                    defaultValue={
                        user.first_name
                }></input>
                <br></br>
                <label>Last Name</label>
                <input className="text-input" required name="last_name"
                    defaultValue={
                        user.last_name
                }></input>
                <button className="edit-button">Save changes</button>
                <Link to="/account"
                    style={
                        {textDecoration: 'none'}
                }>Cancel changes</Link>
            </form>
            <form method="post" className="delete-form" action="/account/delete">
                <input type="hidden"
                    value={
                        user.id
                }></input>Delete Account</form>
        </div>
    </div>

}
