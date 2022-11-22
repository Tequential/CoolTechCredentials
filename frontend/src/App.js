import './App.css';
import { useState } from "react";
import Header from './components/Header';
import Login from './components/Login';
import Credentials from './components/Credentials';
import CreateCredentials from './components/CreateCredentials';
import EditUser from './components/EditUser';


//main component
function App() {

  //state variables
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [loginUser, setLoginUser] = useState({});
  const [registerUser, setRegisterUser] = useState({});
  const [loggedin, setLoggedin] = useState(false);
  const [displayAdd, setDisplayAdd] = useState(true);
  const [credentials, setCredentials] = useState([]);
  const [ouDivisionList, setOUdivisionList] = useState([]);
  const [displayAddNew, setDisplayAddNew] = useState(false);
  const [displayRegistered, setDisplayRegistered] = useState(false);
  const [role, setRole] = useState([]);
  const [displayEditUser, setDisplayEditUser] = useState(false);
  const [users, setUsers] = useState([]);
  const [userRoles, setUserRoles] = useState([]);
  const [userDetails, setUserDetails] = useState([]);

  //render all components based on state
  return (
    <div className="App-container">
      <div className="cars-container">
        <Header loading={loading} error={error} loggedin={loggedin} setLoggedin={setLoggedin} role={role} setError={setError} />

        {!loggedin && 
          <Login displayRegistered={displayRegistered} setDisplayRegistered={setDisplayRegistered} 
          setLoggedin={setLoggedin} registerUser={registerUser} setRegisterUser={setRegisterUser} setLoginUser={setLoginUser}
          loginUser={loginUser} setLoading={setLoading} setError={setError} />}

        {!displayAddNew && loggedin && !displayEditUser && 
          <Credentials setUsers={setUsers} setDisplayEditUser={setDisplayEditUser}
          role={role} setRole={setRole} ouDivisionList={ouDivisionList} setOUdivisionList={setOUdivisionList} setLoading={setLoading} 
          setError={setError} loginUser={loginUser} displayAdd={displayAdd} setDisplayAdd={setDisplayAdd} credentials={credentials} 
          setCredentials={setCredentials} userDetails={userDetails} setUserDetails={setUserDetails} setDisplayAddNew={setDisplayAddNew} />}

        {displayAddNew && loggedin && 
          <CreateCredentials setDisplayAddNew={setDisplayAddNew} userDetails={userDetails} ouDivisionList={ouDivisionList} error={error}
          setError={setError} loading={loading} users={users} setLoading={setLoading} credentials={credentials} setCredentials={setCredentials} /> }

        {displayEditUser && loggedin && 
          <EditUser setDisplayEditUser={setDisplayEditUser} setError={setError} setLoading={setLoading} 
          users={users} ouDivisionList={ouDivisionList} userRoles={userRoles} setUserRoles={setUserRoles}/>}

      </div>
    </div>
  );
}

export default App;
