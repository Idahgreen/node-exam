import React from 'react';
import logo from './../static/icons/logo-2.png'
import {Link} from 'react-router-dom'

export default function Public(props) {

    let background = props.background

    return(<div className="public-background" style={{ backgroundImage: `url(${background})` }}>
    <div className="public-text">
        <img src={logo} alt="fridgeFinder-logo"></img>
        <div className="public-divider"> </div>
        <h1> Recipes from your fridge</h1> 
        <Link className="public-button" to="/login" style={{ textDecoration: 'none' }}>Start browsing</Link>
        </div>
       
    </div>
    );
}