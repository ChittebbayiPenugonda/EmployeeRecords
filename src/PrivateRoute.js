import {useContext, useState, useEffect} from 'react';
import {Route, Redirect} from 'react-router-dom';
import {AuthContext} from './Auth.js';
import { getDocs, collection, deleteDoc, addDoc, doc } from 'firebase/firestore';
import {db, auth} from './config/firebase';
const PrivateRoute = ({ component: RouteComponent, ...rest}) => {
    const {currentUser} = useContext(AuthContext);
    
    let isAuthorizedUser = false;
    const [go, setGo] = useState(false);
    const authorizedUsersCollection = collection(db, "authorizedusers");
    const [pending, setPending] = useState(true);
    const checkIfAuthorized = (authorizedUser, index) => {
        if (authorizedUser.email == currentUser.email){
            isAuthorizedUser = true;
        }
    };

    const getData = async () => {
        try{
            const data = await getDocs(authorizedUsersCollection);

            const filteredData = data.docs.map((doc) => ({
                ...doc.data(),
                id:doc.id,
            }));
            filteredData.forEach(checkIfAuthorized);

            setGo(!!currentUser && isAuthorizedUser);


        } catch(err){
            console.log(err.message);
        }
        setPending(false);


        
    }
    useEffect(() => {
        console.log('pls');
    },[setGo]);

    useEffect(() => {
        getData();
        
    },[]);

    if(pending){
        return (<p>Loading...</p>);
    }

    return (  
        <Route
        {...rest}
        render = { () => 
            (go) ? (<RouteComponent />) : (<Redirect to={"/"} />)

        }
    />
    );
}
 /*


        <Route
        {...rest}
        render = { () => 
            (go) ? (<RouteComponent />) : (<Redirect to={"/somethin"} />)

        }
    />



 */
export default PrivateRoute;