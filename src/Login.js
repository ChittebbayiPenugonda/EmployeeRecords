import { auth, googleProvider } from './config/firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import {useState} from 'react';
import {AuthContext} from './Auth.js';
import './Login.css';
import ai9logo from './img/ai9logo.png';
const Login = ({history}) => {
    const [email, setEmail] = useState(" ");
    const [password, setPassword] = useState(" ");

  /*  const signIn = async (e) => {
        console.log('signing in');
        e.preventDefault();
        try{
            await signInWithEmailAndPassword(auth,email,password);
            history.push("/dashboard");

        } catch (err) {
            alert('Invalid Login 1')
            console.log(err.message);
        }
    }; */

    const signInWithGoogle = async (e) => {
        console.log('signing in');
        e.preventDefault();
        try{
            await signInWithPopup(auth, googleProvider);
            history.push("/dashboard");

        } catch (err) {
            
            console.log(err.message);
        }
    };
    return (  
        <div className="logincard">
            <img src={ai9logo}/>
            <h1>HR Login</h1>
            <div className="buttonwrapper">
            <button onClick={signInWithGoogle}><i className="fa-brands fa-google"></i>Sign In With Google</button>
            </div>
        </div>
    );
}
/*
<input 
            placeholder = "Email"
            onChange={(e) => setEmail(e.target.value)}
            ></input>
            <input 
            placeholder = "Password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            ></input>
            <button onClick={signIn}>Sign In</button> 
*/
 
export default Login;