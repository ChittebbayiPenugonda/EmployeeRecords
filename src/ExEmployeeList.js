import {Link} from 'react-router-dom';
import {db, auth} from './config/firebase';
import {useHistory} from 'react-router-dom';
import {Route, Redirect} from 'react-router-dom';
import { getDocs, collection, deleteDoc, addDoc, doc } from 'firebase/firestore';
import { useState, useEffect  } from 'react';
import Nav from './Nav.js';
import {signOut} from 'firebase/auth';
import './EmployeeList.css';
const ExEmployeeList = () => {
    const history = useHistory();
    const [employeeList, setEmployeeList] = useState([]);
    const employeeCollection = collection(db, "employees")
    const deleteEmployee = async (id) => {
        const employeeDoc = doc(db,"employees", id);
        await deleteDoc(employeeDoc);
        getEmployeeList();
    }

    const checkNotActive = (emp) => {
        return !emp.employeeStatus;
    }
    const getEmployeeList = async () => {
        try{
        const data = await getDocs(employeeCollection);

        const prefilteredData = data.docs.map((doc) => ({
            ...doc.data(),
            id:doc.id,
        }));
        let filteredData = prefilteredData.filter(checkNotActive);
        
        console.log("before " + employeeList);
        setEmployeeList(filteredData);
        console.log("after " + employeeList);
        } catch(err){
            console.log(err.message);
        }
    };

    const goToEmployee = (employeeroute) =>{
        history.push(employeeroute);
    }

    useEffect(() => {
        getEmployeeList();

    }, []);





    return (
        <div className="employeelist">
            <Nav/>
            <p>Current User: {auth.currentUser?.email}</p>
            <table cellSpacing={0}>
                <thead>
                    <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Status</th>
                        <th>Role</th>
                        <th>Email</th>
                    </tr>
                </thead>
                <tbody>
            {employeeList.map((employee) => (
                <tr onClick= {() => {goToEmployee('/employee/' + employee.id)}} style={{backgroundColor: employee.employeeStatus ? "#54d179" : "#ff5454"}}>
                        <td>{employee.fname}</td>
                        <td>{employee.lname}</td>
                        <td>{employee.employeeStatus ? 'active' : 'inactive'}</td>
                        <td>{employee.designation}</td>
                        <td>{employee.personalEmailId}</td>
                </tr>
            ))}
        </tbody>
        </table>
        </div>
    )
}

export default ExEmployeeList;