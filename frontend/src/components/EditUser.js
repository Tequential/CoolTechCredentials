import { api } from "./api";
import React from 'react'
import { useState } from 'react'
import { MultiSelect } from "react-multi-select-component";

function EditUser({ ouDivisionList, setDisplayEditUser, setLoading, setError, users, userRoles, setUserRoles }) {

  //state variables
  const [edit, setEdit] = useState("false")
  const [selected, setSelected] = useState([]);
  const [userOUs, setUserOUs] = useState([]);
  const [newRole, setNewRole] = useState('');
  const selectedOUArray = [];

  //create a dropdown option list for all OU Divisions
  const divisionsAll = ouDivisionList.map((ouDivision) => {
    return (
      { label: ouDivision.division, value: ouDivision._id }
    )
  })

  //create a check list for the OU Divisions that the user has access to
  const divisionsUser = ouDivisionList.map(item =>
    userRoles.indexOf(item._id) > -1 &&
    { label: item.division, value: item._id }
  )

  //update information about 1 user
  function updateusers() {
    setError('');
    setLoading(true);
    setSelected(divisionsUser);
    selected.map((item) => {
      if (item !== false) {
        selectedOUArray.push(item.value)
      }
    })
    const input_data = { _id: edit.id, OUdivision: selectedOUArray, role: newRole }
    api(`cooltech/users/`, "PUT", input_data)
      .then(result => {
        setLoading(false);
        setEdit([]);
      },
        (error) => {
          setError(error);
        });
  }

  //render based on state
  return (
    <div>
      <div className="row">
        <div className="col-2 offset-8">
          <button className="btn btn-info" onClick={(e) => setDisplayEditUser(false)}>Cancel</button>
        </div>
      </div>
      <div className="row">
        <div className="col-2">
          <h5>Username</h5>
        </div>
        <div className="col-2">
          <h5>Username</h5>
        </div>
        <div className="col-2">
          <h5>OU - Divisions</h5>
        </div>
        <div className="col-2">
          <h5>Role</h5>
        </div>
      </div>
      {users && users.map((user, index) => {
        return (<div className="row" key={index}>
          <div className="col-2" ><input id={user._id} placeholder={user.username} type="text"
            disabled="disabled"></input>
          </div>
          <div className="col-2" ><input id={user._id} placeholder={user.email} type="text"
            disabled="disabled"></input>
          </div>
          <div className="col-2" >
            <div>
              <MultiSelect className="rmsc" disabled={edit.id === user._id ? false : true}
                options={divisionsAll}
                // value={divisionsUser}
                value={selected}
                onChange={setSelected}
                labelledBy="Select"
              />
            </div>
          </div>
          <div className="col-2" >
            <select className="form-control" disabled={edit.id === user._id ? false : true} onChange={(e) => setNewRole(e.target.value)} required>
              <option selected ={user.role === "admin" ? "selected" : ""} value="admin">admin</option>
              <option selected ={user.role === "manager" ? "selected" : ""} value="manager">manager</option>
              <option selected ={user.role === "normal" ? "selected" : ""}  value="normal">normal</option>
            </select>
          </div>
          <div className="col-2">{edit.id === user._id && users.id !== user._id ?
            <button className="btn btn-info" onClick={() => updateusers()}>Update</button> :
            <button className="btn btn-info" onClick={() => {
              setEdit({ id: user._id }); setSelected(divisionsUser); setUserRoles(user.OUdivisionIDs);
            }}>Edit</button>}
          </div>
        </div>)
      })
      } </div>)
}

export default EditUser;