import React, { useState, useEffect }  from 'react';
import {BrowserRouter as Router, Link, Route, Redirect, Switch} from 'react-router-dom';
import Login from './components/Login';
import Cookies from 'js-cookie';
import FrontPage from './components/FrontPage';
import Protected from './components/Protected';
import Register from './components/Register';
import AnotherProtectedPage from './components/AnotherProtectedPage';
import SendResetEmail from './components/SendResetEmail';
import ResetPassword from './components/ResetPassword';
import Account from './components/Account';
import EditAccount from './components/EditAccount';
import './App.css';
import logo from './static/icons/logo.png';
import background1 from './static/images/background.jpg';
import background2 from './static/images/background-2.jpg';
import background3 from './static/images/background-3.jpg';

function App() {

  
  const [user, setUser] = useState('Waiting...');
  const [background, setBackground] = useState('');


    useEffect(() => {

      if(!Cookies.get('SessionIsAuthenticated')){
        return null
      }
      else {

        fetch("/1/api/user")
        .then(response => response.json())
        .then(data => {
            setUser(data.user)
        });

      }

  }, []);

  useEffect(() => {
    var classCycle=[background1,background2, background3];

    var randomNumber = Math.floor(Math.random() * classCycle.length);
    setBackground(classCycle[randomNumber]);

}, []);


  const PrivateRoute = ({ component: Component, ...rest }) => (
      <Route {...rest} render={(props) => (
        Cookies.get('SessionIsAuthenticated')
          ? <Component {...props} />
          : 
          <Redirect to='/login' />
      )} />
    )

    function HandlerOpen() {
      document.getElementById("mySidebar").style.display = "block";
    }
    
    function HandlerClose() {
      document.getElementById("mySidebar").style.display = "none";
    }

  return (
    <Router>

      <div>
        <div className="sidebar" style={{display:'none'}} id="mySidebar">
          <button onClick={HandlerClose} className="nav-button close">&times;</button>
          <div className="nav-links">
          {!Cookies.get('SessionIsAuthenticated') ? <div><li><Link to="/login" style={{ textDecoration: 'none' }} onClick={HandlerClose}>Login</Link></li></div> :
            <div>
                <li><Link to="/" style={{ textDecoration: 'none' }} onClick={HandlerClose}>Home</Link></li>
                <li><Link to="/account" style={{ textDecoration: 'none' }} onClick={HandlerClose}>Account</Link></li>
                <li><Link to="/fridge/ingredients" style={{ textDecoration: 'none' }} onClick={HandlerClose}>Ingredients</Link></li>
                <li><Link to="/fridge/recipes" style={{ textDecoration: 'none' }} onClick={HandlerClose}>Recipes</Link></li>
                <li><Link to="/add" style={{ textDecoration: 'none' }} onClick={HandlerClose}>Add +</Link></li>
                <form method="post" action="/users/logout">
                  <input type="submit" value="Logout" ></input>
                </form>
            </div>
            }
          </div>
        </div>

        <nav className="navigation">
          <button className="nav-button" onClick={HandlerOpen}>☰</button>
          <div className="nav-left">
            <Link to="/" style={{ textDecoration: 'none' }}><img src={logo} alt="logo"></img></Link>
          </div>
          <div className="logout">
            {!Cookies.get('SessionIsAuthenticated') ? 
            <Link className="login-button" to="/login" style={{ textDecoration: 'none' }}>Login</Link>
            :<div className="logged"><div><p>Hello {user.username},</p></div>
            <Link to="/add" style={{ textDecoration: 'none' }}>Add Ingredient +</Link>
            <div className="dropdown">
              <p >Account ▼</p>
              <div className="dropdown-content">
                <Link to="/account" style={{ textDecoration: 'none' }}>Profile</Link>
                <Link to="/fridge/ingredients" style={{ textDecoration: 'none' }}>Ingredients</Link>
                <Link to="/fridge/recipes" style={{ textDecoration: 'none' }}>Recipes</Link>
                <Link to="/add" style={{ textDecoration: 'none' }}>Add Ingredient</Link>
              </div>
            </div>

            <form method="post" action="/users/logout">
            <input type="submit" value="Logout" ></input>
            </form></div>
            }
          </div>
        </nav>

        <div className="main" style={{ backgroundImage: `url(${background})` }}>

          <div className="routes">
            <Switch>
              <Route exact path="/" render={(props) => <FrontPage {...props} background={background} auth={Cookies.get('SessionIsAuthenticated')} />} />
              <Route path="/login" component={Login}/>
              <Route path="/register" component={Register}/>
              <PrivateRoute path='/fridge' component={Protected} />
              <PrivateRoute path='/account' component={Account} />
              <PrivateRoute path='/edit/account' component={EditAccount} />
              <PrivateRoute path='/add' component={AnotherProtectedPage} />
              <Route path='/forgot-password' component={SendResetEmail} />
              <Route path='/password-reset' component={ResetPassword} />

            </Switch>
          </div>
        
        </div>
      </div>
      <footer></footer>
    </Router>
  );
}

export default App;
