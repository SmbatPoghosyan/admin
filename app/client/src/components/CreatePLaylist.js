import React from "react";
import { BrowserRouter as Router, Route, Link, Switch,Redirect } from "react-router-dom";
import { createBranchPlaylist } from "../../api/playlists";
import Button from "@material-ui/core/Button";

import "./css/createPlaylist.css"

const CreatePlaylist = props => {
  
  const {branchId,setPlaylists} = props;

  const createHandleClick = () => {
    createBranchPlaylist(branchId,{},setPlaylists);
  };

  return (
      <div className="createPlaylist">
        <div className="head">
            <span>Create Playlist </span>
            <Link to={`/branches/${branchId}/`} >
              <i className="close"></i>
            </Link> 
        </div>
        <Button variant="contained" onClick={createHandleClick} >
          Create
        </Button>
      </div>
  )
}

export default CreatePlaylist;
