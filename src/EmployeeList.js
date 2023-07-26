import {Link} from 'react-router-dom';
import {db, auth} from './config/firebase';
import {Route, Redirect} from 'react-router-dom';
import {useHistory} from 'react-router-dom';
import { getDocs, collection, deleteDoc, addDoc, doc } from 'firebase/firestore';
import { useState, useEffect  } from 'react';
import Nav from './Nav.js';
import './EmployeeList.css';
import {signOut} from 'firebase/auth';
const EmployeeList = () => {
    const history = useHistory();
    const [employeeList, setEmployeeList] = useState([]);
    const employeeCollection = collection(db, "employees")
    const deleteEmployee = async (id) => {
        const employeeDoc = doc(db,"employees", id);
        await deleteDoc(employeeDoc);
        getEmployeeList();
    }
    const getEmployeeList = async () => {
        try{
        const data = await getDocs(employeeCollection);

        const filteredData = data.docs.map((doc) => ({
            ...doc.data(),
            id:doc.id,
        }));
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
                        <th>Designation</th>
                        <th>Email</th>
                    </tr>
                </thead>
                <tbody>
            {employeeList.map((employee) => (
                <tr style={{backgroundColor: employee.employeeStatus ? "#54d179" : "#ff5454"}}>
                        <td onClick= {() => {goToEmployee('/employee/' + employee.id)}}>{employee.fname}</td>
                        <td onClick= {() => {goToEmployee('/employee/' + employee.id)}}>{employee.lname}</td>
                        <td onClick= {() => {goToEmployee('/employee/' + employee.id)}}>{employee.employeeStatus ? 'active' : 'inactive'}</td>
                        <td onClick= {() => {goToEmployee('/employee/' + employee.id)}}>{employee.designation}</td>
                        <td onClick= {() => {goToEmployee('/employee/' + employee.id)}}>{employee.personalEmailId}</td>
                </tr>
            ))}
        </tbody>
        </table>
        </div>
    )
}

export default EmployeeList;