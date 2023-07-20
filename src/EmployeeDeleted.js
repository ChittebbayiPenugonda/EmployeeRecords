import {Link} from 'react-router-dom';
import Nav from './Nav.js';
const EmployeeDeleted = () => {
    return (  
        <div>
            <Nav/>
            <h1>Employee Successfully Deleted</h1>
            <Link to="/dashboard"><button>Back to Dashboard</button></Link>
        </div>
    );
}
 
export default EmployeeDeleted;