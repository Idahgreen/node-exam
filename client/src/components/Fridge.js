import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import EditIcon from '../static/icons/edit.png';
import DeleteIcon from '../static/icons/delete.png';
import Animation from './Animation';

export default function Fridge() {
    const [fridge, setFridge] = useState('Waiting...');
   
    useEffect(() => {
        fetch("/1/api/ingredient-info")
        .then(response => response.json())
        .then(data => {
            setFridge(data)
        });
  
    }, []);

   function handlerSubstring(date){
        let dateVar = date
        let ShortDate = dateVar.substring(0, 10);
        return ShortDate
    } 
    
    return(
    <div className="fridge">
        <h2>Fridge</h2>
              {!fridge.ingredientInfo ? 
            <Animation/>
            :  
            <div className="fridge-list">
                <div className="list-header">
                    <div>Item</div>
                    <div>Expiration Date</div>
                    <div>Options</div>
                </div>
               {fridge.ingredientInfo.map((ingredient,index) =>(
                
                <div key={index}>
                   <div key={index} className="ingredient-item">
                       <div>{ingredient.ingredient}</div>
                       <div>{handlerSubstring(ingredient.expiration_date)}</div>
                       <div className="options">
                            <Link to={{ pathname:"/protected-content/fridge/edit", 
                                        state: {id: `${ingredient.id}`, 
                                                ingredient:`${ingredient.ingredient}`, 
                                                xpirationDate :`${handlerSubstring(ingredient.expiration_date)}`}, 
                                        style:{ textDecoration: 'none' }
                                        }}><img src={EditIcon} alt="edit-icon"></img>
                            </Link>
                            <form method="post"  action="/fridge/delete-ingredient/"> 
                                <input type="hidden" name="id" value={ingredient.id}></input>
                                <button className="delete"><img src={DeleteIcon} alt="delete-icon"></img> </button>
                            </form>
                       </div>
                   </div>
                   <div className="divider"></div>
                </div>
               )
               
               )}
            
            </div> 

            }
        
   
    </div>
    
    );
}