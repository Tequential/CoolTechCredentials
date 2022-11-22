import { api } from "./api";
function Login({ setLoggedin, setDisplayRegistered, displayRegistered, loginUser, setLoginUser, setLoading, setError }) {

  //login and set the JWT on success
  function login(user) {
    setLoading(true);
    api(`/cooltech/login`, "POST", user)
      .then(result => {
        if ("err" in result) {
          setError("You are not registered :( - please check that your username and password are correct");
          setLoading(false);
        } else {
          sessionStorage.setItem("jwt", result.token);
          setError(false);
          setLoading(false);
          setLoggedin(true);
        }
      }
      );
  }

  const handleLogin = () => {
    login(loginUser);
  };

  const handleRegister = () => {
    register(loginUser);
  };

  //register a new user
  function register(user) {
    setLoading(true);
    api(`/cooltech/register`, "POST", user)
      .then(result => {
        setDisplayRegistered(true);
        setLoading(false);
      },
        (error) => {
          setLoading(false);
          setError("You are already registered");
        });
  }

  return (
    <div>
      <div className="row justify-content-center mt-4">
        <div className="col-3 mx-auto">
          <input className="form-control" type="text" placeholder="piet@cooltech.co.za" onChange={(e) => setLoginUser((prev) => ({ ...prev, email: e.target.value }))} required />
        </div>
      </div>
      <div className="row mt-4">
        <div className="col-3 mx-auto">
          <input className="form-control" type="password" placeholder="piet" onChange={(e) => setLoginUser((prev) => ({ ...prev, password: e.target.value }))} required />
        </div>
      </div>
      <div className="row mt-4">
        <div className="col-3 mx-auto">
          <button className="btn btn-info" onClick={(e) => handleLogin()}>Login</button>
          <button className="btn btn-info" onClick={(e) => handleRegister()}>Register</button>
        </div>
      </div>
      {displayRegistered ? <div>You have been successfully registered. Please contact an admin to give you user rights</div> : <></>}
    </div>

  )
}

export default Login;