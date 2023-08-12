
import { db, auth, googleProvider } from './config/firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { getDocs, collection, deleteDoc, addDoc, doc } from 'firebase/firestore';
import {useContext, useState} from 'react';
import {AuthContext} from './Auth.js';
import './Login.css';
import ai9logo from './img/ai9logo.png';
const Login = ({history}) => {
    const [email, setEmail] = useState(" ");
    const [password, setPassword] = useState(" ");

    let isUser = false;
    let isAdmin = false;
    const employeeCollection = collection(db, "employees");
    const adminCollection = collection(db, "authorizedusers");
    const {currentUser} = useContext(AuthContext);

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

    const checkIfUser = (user, index) => {
        if (user.personalEmailId == currentUser.email){
            isUser = true;
        }
    };

    const checkIfAdmin = (user, index) => {
        if (user.email == currentUser.email){
            isAdmin = true;
            console.log("yea");
        }
    };

    const getEmployeeData = async () => {
        try{
            const data = await getDocs(employeeCollection);

            const filteredData = data.docs.map((doc) => ({
                ...doc.data(),
                id:doc.id,
            }));
            filteredData.forEach(checkIfUser);

            if(isUser){
                history.push("/employee" + currentUser.id);
            }


        } catch(err){
            console.log(err.message);
        }
    }
    
    const getAdminData = async () => {
        try{
            const data = await getDocs(adminCollection);

            const filteredData = data.docs.map((doc) => ({
                ...doc.data(),
                id:doc.id,
            }));
            filteredData.forEach(checkIfAdmin);

        } catch(err){
            console.log(err.message);
        }
    }

        
    const signInWithGoogle = async (e) => {
        console.log('signing in');
        e.preventDefault();
        try{
            await signInWithPopup(auth, googleProvider).then((ret)=> {
                console.warn(currentUser);
                getAdminData();
                if(isAdmin){

                    history.push("/dashboard");
                } else{
                    getEmployeeData();
                }

            });
            
            

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