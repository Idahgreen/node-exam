import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';

export default function Edit(props){
    const [userId] = useState(props);

    let id = userId.location.state.id
    let ingredient = userId.location.state.ingredient
    let expirationDate = userId.location.state.expirationDate

    const [editIngredient, setIngredient] = useState({'id': id , 'ingredient': ingredient, 'expiration_date': expirationDate});
    const [error, setError] = useState('')


    const handleChange = (event) => {
        setIngredient({...editIngredient, [event.target.name]: event.target.value})
    }

    console.log(editIngredient)

    const handleSubmit = (e) => {
        e.preventDefault()
        axios.post('/fridge/update-ingredient', editIngredient)
          .then(function (response) {
              console.log(response)
              window.location = '/protected-content/fridge/ingredients';
          })
          .catch(function (error) 
          
          {
              console.log(error)
              if(error.response.status === 404){
                  setError('Please fill out all fields')
              }

              if(error.response.status === 500){
                setError('Something went wrong in the database - please try again later!')
            }
              console.log()
          }) 
    }



    return(<div>
        {!id ? 'nothing to display' : 
        
        <div>
        <h2>Edit Ingredient</h2>
        <form   className="register-form add-ingredient-form" onSubmit={handleSubmit}>
            <input type="hidden" name="id" onChange={handleChange} value={id}></input>
        <label>Ingredient</label><input className="text-input"  onChange={handleChange}   type="text" defaultValue={ingredient} name="ingredient" placeholder={ingredient}></input>
        <label>Expiration Date</label><input type="datetime-local"  onChange={handleChange}  className="date-input" defaultValue={expirationDate} name="expiration_date" ></input>
        <p className="error">{error}</p>
        <button className="ingredient-button" >Save changes</button><Link className="ingredient-cancel" to="/protected-content/fridge/ingredients" style={{ textDecoration: 'none' }}>Cancel changes</Link>
        </form>
        </div>
        }
    </div> )
}