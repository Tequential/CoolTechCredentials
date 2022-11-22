import { api } from "./api";
import React, { useState } from 'react'

function CreateCredentials({ ouDivisionList, credentials, setDisplayAddNew, error, setError, setLoading }) {
  //state variables

  const [newOUdivision, setNewOUdivision] = useState("News Management - IT"); //default division
  const [newWebsite, setNewWebsite] = useState("");
  const [newUsername, setNewUsername] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newOUDivisionID, setNewOUdivisionID] = useState("6373c281b77a5b6bbc926d44"); //default ID

  //add new credentials
  function addCredentials(newUsername, newWebsite, newPassword, newOUdivision, newOUDivisionID) {
    setLoading(true);
    let data = { username: newUsername, website: newWebsite, password: newPassword, OUDivisionID: newOUDivisionID, OUdivision: newOUdivision, archived: false }
    try {
      api(`cooltech/credentials/`, "POST", data)
      setDisplayAddNew(false);
      setLoading(false);
    } catch (error) {
      setError("error fetching credential list");
    }

  }

  //create an array of OUs that the user has access to
  const userOUs = [];
  credentials.map(OUid => {
    if (userOUs.indexOf(OUid.OUDivisionID) === -1) {
      userOUs.push(OUid.OUDivisionID)
    }
  });

  //get the id/value of the OU - Division selected
  const handleId = (e) => {
    const index = e.target.selectedIndex;
    const el = e.target.childNodes[index]
    const option = el.getAttribute('id');
    setNewOUdivision(e.target.value);
    setNewOUdivisionID(option)
  }

  //render the new credentials form
  return (
    <div>
      <div className="row mt-4">
        <div class="col-6">
          <h3>Add New Credentials</h3>
        </div>
        <div className="col-2 offset-4">
          <div className="btn btn-info" onClick={(e) => setDisplayAddNew(false)}>Cancel </div>
        </div>
      </div>
      <br></br>
      <div className="row entry">
        <div className="col-2">
          Username:
        </div>
        <div className="col-6">
          <input className="form-control" placeholder="Username" onChange={(e) => setNewUsername(e.target.value)} type="text" required></input>
        </div>
      </div>
      <div className="row entry">
        <div className="col-2">
          Website:
        </div>
        <div className="col-6">
          <input className="form-control" placeholder="Website" onChange={(e) => setNewWebsite(e.target.value)} type="text" required></input>
        </div>
      </div>
      <div className="row entry">
        <div className="col-2">
          Password:
        </div>
        <div className="col-6">
          <input className="form-control" placeholder="Password" onChange={(e) => setNewPassword(e.target.value)} type="password" required></input>
        </div>
      </div>
      <div className="row entry">
        <div className="col-2">
          Organisational Unit & Division:
        </div>
        <div className="col-6">
          <select className="form-control" onChange={(e) => handleId(e)}>
            {ouDivisionList.map(item => {
              return (
                userOUs.indexOf(item._id) > -1 &&
                <option key={item._id} id={item._id} value={item.division} >{item.division}</option>
              );
            })}
          </select>
        </div>
      </div>
      <div className="row entry">
        <div className="col-2 offset-10">
          <button className="btn btn-info" onClick={(e) => addCredentials(newUsername, newWebsite, newPassword, newOUdivision, newOUDivisionID)}>
            Add New</button></div>
      </div>
    </div>
  )
}

export default CreateCredentials;