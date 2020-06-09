import React, {useState, useEffect} from 'react';
import {Route} from 'react-router-dom';
import RecipeBook from './RecipeBook';
import Fridge from './Fridge';
import Edit from './EditIngredient';

export default function Protected() {

    let [ingredients, setIngredients] = useState(' ');


    useEffect(() => {

        fetch("/1/api/ingredients").then(response => response.json()).then(data => {
            setIngredients({data: data})

        });

    }, []);

    return (
        <div className="">
            <Route path='/fridge/ingredients'
                component={Fridge}/>
            <Route path='/protected-content/fridge/edit'
                component={Edit}/> {
            !ingredients.data ? 'Loading recipes ... ' : <Route path='/fridge/recipes'
                render={
                    (props) => <RecipeBook {...props}
                        ingredients={
                            ingredients.data[0]
                        }/>
                }/>
        } </div>
    );
}
