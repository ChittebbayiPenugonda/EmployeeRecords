import {useContext, useState, useEffect} from 'react';
import {Route, Redirect} from 'react-router-dom';
import {AuthContext} from './Auth.js';
import { getDocs, collection, deleteDoc, addDoc, doc } from 'firebase/firestore';
import {db, auth} from './config/firebase';
const LowUserRoute = ({ component: RouteComponent, ...rest}) => {
    const {currentUser} = useContext(AuthContext);
    
    let isAuthorizedUser = false;
    let isUser = false;
    const [go, setGo] = useState(false);
    const [lowgo, setLowGo] = useState(false);
    const authorizedUsersCollection = collection(db, "authorizedusers");
    const usersCollection = collection(db, "employees");
    const [lowgoID, setLowGoID] = useState("");
    const [pending, setPending] = useState(true);
    const checkIfAuthorized = (authorizedUser, index) => {
        if (authorizedUser.email == currentUser.email){
            isAuthorizedUser = true;
        }
    };

    const checkIfUser = (authorizedUser, index) => {
        console.log(authorizedUser);
        if (authorizedUser.personalEmailId == currentUser.email){
            setLowGoID(authorizedUser.id);
            isUser = true;
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

            const userdata = await getDocs(usersCollection);

            const filteredUserData = userdata.docs.map((doc) => ({
                ...doc.data(),
                id:doc.id,
            }));
            filteredUserData.forEach(checkIfUser);

            setGo(!!currentUser && isAuthorizedUser);
            setLowGo(!!currentUser && isUser);

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
            (go || lowgo) ? (<RouteComponent />) : (<Redirect to={"/"} />)

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
export default LowUserRoute;