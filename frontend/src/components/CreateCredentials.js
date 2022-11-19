import { api } from "./api";
import React, { useState } from 'react'

function CreateCredentials({ ouDivisionList, setDisplayAddNew, error, setError, setLoading}) {
  //state variables

  const [newOUdivision, setNewOUdivision] = useState("News Management - IT"); //default division
  const [newWebsite, setNewWebsite] = useState("");
  const [newUsername, setNewUsername] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newOUDivisionID, setNewOUdivisionID] = useState("");

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
          <select className="form-control" onChange={(e) => { setNewOUdivision(e.target.value); setNewOUdivisionID(e.target.id) }}>
            {ouDivisionList.map(item => {
              return (
                <option key={item._id} id={item._id} value={item.division} >{item.division}</option>
              );
            })}
          </select>
        </div>
      </div>
      <div className="row entry">
        <div className="col-2 offset-10">
          <button className="btn btn-info" onClick={(e) => addCredentials(newUsername, newWebsite, newPassword, newOUdivision)}>
            Add New</button></div>
      </div>
    </div>
  )
}

export default CreateCredentials;