import React from 'react';
import {Link} from 'react-router-dom';
import fridge from './../static/icons/fridge.png'
import recipeBook from './../static/icons/recipe-book.png'

export default function Private() {
    return (
        <div className="private">
            <h1>Welcome!</h1>
            <div className="private-divider"></div>
            <h2>What would you like to do?</h2>
            <div className="private-options-container">
                <div className="private-options-content">
                    <img src={fridge}
                        alt="fridge-icon"></img>
                    <div className="private-divider"></div>
                    <h3>Check fridge</h3>
                    <p>Not sure what's currently in your fridge? Check your ingredients to find out!</p>
                    <div className="private-divider"></div>
                    <Link className="private-button" to="/protected-content/fridge/ingredients"
                        style={
                            {textDecoration: 'none'}
                    }>Check Ingredients ⯈</Link>
                </div>
                <div className="private-options-content">
                    <img src={recipeBook}
                        alt="recipe-book-icon"></img>
                    <div className="private-divider"></div>
                    <h3>Find Recipes</h3>
                    <p>Find recipes tailored to the contents of your fridge!</p>
                    <div className="private-divider"></div>
                    <Link className="private-button" to="/protected-content/fridge/recipes"
                        style={
                            {textDecoration: 'none'}
                    }>Browse Recipes ⯈</Link>
                </div>
            </div>
        </div>
    );
}
