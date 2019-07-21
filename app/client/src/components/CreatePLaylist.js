import React from "react";
import { BrowserRouter as Router, Route, Link, Switch,Redirect } from "react-router-dom";

import "./css/createPlaylist.css"

const CreatePlaylist = props => {

  return (
      <div className="createPlaylist">
        <div className="head">
            <span>Create Playlist </span>
            <Link to={`/branches/${props.branchId}/`} ><i className="close"></i></Link> 
        </div>
      </div>
    );
};

export default CreatePlaylist;
