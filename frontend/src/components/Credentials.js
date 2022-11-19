import { api, apiToken } from "./api";
import React from 'react'
import { useEffect, useState } from 'react'
import { dateFormat } from "./dateFormatter";

function Credentials({ setUsers, ouDivisionList, setOUdivisionList, setDisplayEditUser, role, setRole, setLoading, setError, setDisplayAddNew, credentials, setCredentials }) {

  //set state variables
  const [userDetails, setUserDetails] = useState([]);
  const [update, setUpdate] = useState([])
  const [edit, setEdit] = useState([]);

  //store the JWT in session storage
  const token = sessionStorage.getItem("jwt");

  //fetch user details based on authentication
  const fetchDetailsUser = async () => {
    try {
      const userDetails = await apiToken(`/cooltech/users`, "GET", token);
      setUserDetails(userDetails);
      setRole(userDetails.role)
    } catch (error) {
      setError("Error fetching user details");
    }
  };

  //fetch all user details
  const fetchAllUsers = async () => {
    try {
      const users = await api(`/cooltech/editaccess`, "GET");
      setUsers(users);
    } catch (error) {
      setError("Error fetching user details");
    }
  };

  //fetch all OU Divisions
  const fetchOUdivisions = async () => {
    try {
      const ouDivisions = await api(`/cooltech/oudivision`, "GET");
      setOUdivisionList(ouDivisions);
    } catch (error) {
      setError("Error fetching OUs and divisions");
    }
  };

  //fetch credential details based on authentication
  const fetchDetailsCredentials = async () => {
    try {
      const credentials = await apiToken(`/cooltech/credentials`, "GET", token);
      setCredentials(credentials);
    } catch (error) {
      setError("Error fetching credential details");
    }
  };

  //update information about 1 credential
  function updateCredentials(input_data) {
    setLoading(true);
    api(`cooltech/credentials/`, "PUT", input_data)
      .then(result => {
        setLoading(false);
        setEdit([]);
      },
        (error) => {
          setError(error);
        });
  }

  //archive credential
  function archive(input_data) {
    setLoading(true);
    const id = { _id: input_data }
    api(`cooltech/credentials/archive`, "PUT", id)
      .then(result => {
        setLoading(false);
        setEdit([]);
      },
        (error) => {
          setError(error)
        });
  }

  //execute when the token or edit status changes
  useEffect(() => {
    setError("");
    setLoading(true);
    fetchDetailsUser();
    fetchDetailsCredentials();
    fetchOUdivisions();
    setLoading(false);
  }, [token, edit]);

  //render the credentials based on state
  return (
    <div>
      <div className="row mt-2 mb-2">
        {role === "admin" &&
          <div className="col-2 offset-8">
            <button className="btn btn-info" onClick={(e) => { setDisplayEditUser(true); fetchAllUsers() }}>Edit User Access</button>
          </div>}
        <div className="col-2">
          <button className="btn btn-info" onClick={(e) => setDisplayAddNew(true)}>Add New Credentials</button>
        </div>
      </div>

      <div className="row">
        <div className="col-2">
          <h5>Website</h5>
        </div>
        <div className="col-2">
          <h5>Username</h5>
        </div>
        <div className="col-2">
          <h5>Password</h5>
        </div>
        <div className="col-2">
          <h5>Date Created</h5>
        </div>
      </div>
      {credentials && credentials.map((credential, index) => {
        return (<div className="row" key={index}>
          <div className="col-2" ><input id={credential._id} placeholder={credential.OUdivision} type="text"
            onChange={e => setUpdate((prev) => ({ ...prev, OUdivision: e.target.value }))}
            disabled={edit.id === credential._id && credentials.id !== credential._id ? false : true}></input>
          </div>
          <div className="col-2" ><input id={credential._id} placeholder={credential.website} type="text"
            onChange={e => setUpdate((prev) => ({ ...prev, website: e.target.value }))}
            disabled={edit.id === credential._id && credentials.id !== credential._id ? false : true}></input>
          </div>
          <div className="col-2" ><input id={credential._id} placeholder={credential.username} type="text"
            onChange={e => setUpdate((prev) => ({ ...prev, username: e.target.value }))} disabled={edit.id === credential._id && credentials.id !== credential._id ? false : true}></input>
          </div>
          <div className="col-2" ><input id={credential._id} placeholder={credential.password} type="text"
            onChange={e => setUpdate((prev) => ({ ...prev, password: e.target.value }))} disabled={edit.id === credential._id && credentials.id !== credential._id ? false : true}></input>
          </div>
          <div className="col-2" >{dateFormat(credential.dateCreated)}</div>
          {role !== "normal" ?
            <div className="col-2">{edit.id === credential._id && credentials.id !== credential._id ?
              <button className="btn btn-info" onClick={() => updateCredentials(update)}>Update</button> :
              <button className="btn btn-info" onClick={() => {
                setEdit({ id: credential._id }); setUpdate({
                  _id: credential._id, OUdivision: credential.OUdivision,
                  website: credential.website, username: credential.username, password: credential.password
                });
              }}>Edit</button>}
              <button className="btn btn-info" onClick={(e) => archive(credential._id)}>Archive</button>
            </div>
            : <></>}
        </div>)
      })
      } </div>)
}

export default Credentials;