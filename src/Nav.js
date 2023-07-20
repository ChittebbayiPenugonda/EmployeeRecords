import ai9logo from './img/ai9logo.png';
import {Link} from 'react-router-dom';
import {db, auth} from './config/firebase';
import {Route, Redirect} from 'react-router-dom';
import { useState, useEffect  } from 'react';
import {signOut} from 'firebase/auth';
import './Nav.css'
const Nav = () => {

    const [loggedin, setLoggedin] = useState(true);
    const logOut = async (e) => {
        e.preventDefault();
        try{
            await signOut(auth);
            console.log('logged out');
            setLoggedin(false);
            
        } catch(err){
            console.error(err);
        }

    }

    if(!loggedin){
        return  (<Redirect to="/" push />);
    }
    return (  
        <div className="navdiv">
            <div className="selectionWrapper">
                <img src={ai9logo} />
                <Link className="selection" to="/dashboard">Dashboard</Link>
                <Link className="selection" to="/newemployee">New Employee</Link>
            </div>
            <button className="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect" onClick={logOut}>Logout</button>
        </div>
    );
}
 
export default Nav;