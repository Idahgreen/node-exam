import React from 'react';
import Private from './Private';
import Public from './Public';

export default function FrontPage(props) {

    let auth = props.auth
    let background = props.background
    
    return(<div>
    {!auth ? <Public background={background}/> : <Private/>}
    </div>
    );
}