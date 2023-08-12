import './App.css';
import EmployeeList from './EmployeeList';
import {HashRouter as Router, Route, Switch} from 'react-router-dom';
import NewEmployee from './NewEmployee';
import Employee from './Employee';
import Dashboard from './Dashboard';
import ActiveEmployeeList from './ActiveEmployeeList';
import ExEmployeeList from './ExEmployeeList.js';
import {AuthProvider} from './Auth.js';
import PrivateRoute from './PrivateRoute.js';
import LowUserRoute from './LowUserRoute';
import EmployeeDeleted from './EmployeeDeleted.js'
import Login from './Login';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Switch>
          <Route exact path='/' component={Login} />
          <PrivateRoute exact path='/employeelist' component={EmployeeList} />
          <PrivateRoute exact path='/activeemployeelist' component={ActiveEmployeeList} />
          <PrivateRoute exact path='/exemployeelist' component={ExEmployeeList} />
          <PrivateRoute exact path='/dashboard' component={Dashboard} />
          <PrivateRoute exact path='/newemployee' component={NewEmployee} />
          <LowUserRoute exact path='/employee/:id' component={Employee} />
          <PrivateRoute exact path='/employeedeleted' component={EmployeeDeleted} />
        </Switch>
      </Router>
    </AuthProvider>
  );
}

export default App;
