import Nav from './Nav.js';
import {Link} from 'react-router-dom';
import './Dashboard.css';
const Dashboard = () => {
    return (  
        <div>
            <Nav/>
            <div className="allselections">
                <div className="selectionrowwrapper">
                <Link to="/activeemployeelist"><div className="card activecard">Active Employees</div></Link>
                <Link to="/employeelist"><div className="card allcard">All Employees</div></Link>
                <Link to="/exemployeelist"><div className="card excard">Ex Employees</div></Link>
                </div>
                <div className="selectionrowwrapper">
                <Link to="/dashboard"><div className="card timesheetscard">Time Sheets</div></Link>
                <Link to="/dashboard"><div className="card i9card">I9</div></Link>
                <Link to="/dashboard"><div className="card passportdetailscard">Passport Details</div></Link>
                </div>
                <div className="selectionrowwrapper">
                <Link to="/dashboard"><div className="card immigrationhistorycard">Immigration History</div></Link>
                </div>
            </div>
        </div>
    );
}
 
export default Dashboard;