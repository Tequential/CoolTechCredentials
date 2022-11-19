//Header to display loading and/or errors
export function Header({ loading, error, loggedin, role, setLoggedin, setError }) {

  //log out and destroy JWT
  const handleLogout = () => {
    setLoggedin(false);
    sessionStorage.removeItem("jwt")
    setError('');
  };
  
  //render the header based on state
  return (
    <div className="App-header mb-4" >
      <div className="row header mt-2 mb-2">
        <div className="col-5 my-auto ms-1">
          CoolTech Credential Repository
          {loading && <div>A moment please...</div>}
          {error && (
            <div className="error">{`There is a problem fetching data - ${error}`}</div>
          )}
        </div>
        <div className="col-4 my-auto">
          {loggedin && <div>Logged in - {role}</div>}
        </div>
        <div className="col-2 my-auto ms-auto">
          {loggedin && <button className="btn btn info header-btn" onClick={() => { handleLogout() }}>Log Out</button>}</div>
      </div>
    </div>
  );
}

export default Header;