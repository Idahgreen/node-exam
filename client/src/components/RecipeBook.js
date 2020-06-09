import React, {useState, useEffect} from 'react';
import Animation from './Animation';

export default function RecipeBook(props) {


    const [profileState] = useState(props);
    console.log(profileState)
    const ingredients = profileState.ingredients
    const [recipe, setRecipes] = useState('');

    useEffect(() => {
        let url = 'https://cors-anywhere.herokuapp.com/http://www.recipepuppy.com/api/?i=' + ingredients
        fetch(url).then(response => response.json()).then(data => {
            setRecipes(data)
        });
        console.log(url)

    }, []);

    function handlerCapitalize(ingredients) {
        let capitalString = ingredients.charAt(0).toUpperCase() + ingredients.slice(1)
        return capitalString
    }


    return (
        <div className="protected">
            <h2>Recipes</h2>
            <div> {
                !recipe.results ? <Animation/>: <div className="fridge-list">
                    <div className="list-header">
                        <div>Item</div>
                        <div>Ingredients Needed</div>
                        <div>Options</div>
                    </div>
                    {
                    recipe.results.map((recipe, index) => (
                        <div key={index}>
                            <div key={index}
                                className="recipe-item">
                                <div> {
                                    recipe.title
                                }</div>
                                <div>{
                                    handlerCapitalize(recipe.ingredients)
                                }</div>
                                <div>
                                    <a href={
                                            recipe.href
                                        }
                                        target="_blank"
                                        key={index}>View Recipe</a>
                                </div>
                            </div>
                            <div className="divider"></div>
                        </div>
                    ))
                } </div>
            } </div>
        </div>
    );
}
