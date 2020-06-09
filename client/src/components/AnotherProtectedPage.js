import React, {useState} from 'react';
import axios from 'axios';

export default function AnotherProtectedPage() {

    const [ingredient, setIngredient] = useState({'ingredient': '', 'expiration_date': ''});
    const [error, setError] = useState('')

    const handleChange = (event) => {
        setIngredient({
            ...ingredient,
            [event.target.name]: event.target.value
        })
    }

    console.log(ingredient)

    const handleSubmit = (e) => {
        e.preventDefault()
        axios.post('/fridge/add-ingredient', ingredient).then(function (response) {
            console.log(response)
            window.location = '/protected-content/fridge/ingredients';
        }).catch(function (error) {
            if (error.response.status === 404) {
                setError('Please fill out all fields')
            }

            if (error.response.status === 500) {
                setError('Something went wrong in the database - please try again later!')
            }
            console.log()
        })
    }

    return (
        <div className="register-form">
            <h2>Add ingredient to Fridge</h2>
            <form method="post"
                onSubmit={handleSubmit}
                className="add-ingredient-form">
                <label>Ingredient</label>
                <input onChange={handleChange}
                    className="text-input"
                    name="ingredient"
                    placeholder="Ingredient"></input>
                <label>Expiration Date</label>
                <input onChange={handleChange}
                    type="datetime-local"
                    className="text-input"
                    name="expiration_date"
                    placeholder="Expiration Date"></input>
                <p className="error">
                    {error}</p>
                <input className="input-button" type="submit" value="Save"></input>
            </form>
        </div>
    );
}
