import React, { useState, useEffect } from "react";
import { getBranchById } from "../../api/branches";
import { BrowserRouter as Router, Route, Link, Switch,Redirect } from "react-router-dom";
import Playlist from "./Playlist";
import Button from "@material-ui/core/Button";

import "./css/branchPage.css";
import "./css/branches.css";
import CreatePlaylist from "./CreatePLaylist";
import { withRouter } from 'react-router';

const BranchPage = props => {
  const [branch, setBranch] = useState({});
  const [playlists, setPlaylists] = useState([]);
  const { params } = props.match;
  useEffect(() => {
    getBranchById(params.id, setBranch, setPlaylists);
  }, []);

  const createHandleClick = () => {
    props.history.push(`/branches/${branch._id}/create playlist`); 
  };

  return branch ? (
    <>
      
      <div className="branchPageContainer">
        <div className="head">
          <span> <Link to="/">{"<"} Go Back </Link> </span>
          <span className="hello">Hello, {branch.name}</span>
          <span className="screen">Screen {branch.screens}</span>
        </div>
        <div className="body">
          <div className="allListLinkContainer">
              <p className="head">Playlists</p>
                <ul className="list listHeight">
                <li style={{textAlign: "center"}}>
                  <Button variant="contained" onClick={createHandleClick} >
                    Create
                  </Button>
                </li>
                  { playlists.length > 0 ? (
                      playlists.map((playlist, i) => (
                        <li className="playlistLink" key={i}>
                          <p>
                            <Link to={`/branches/${branch._id}/playlist/${playlist._id}`} >{playlist.name} </Link>
                            <span>{i+1}</span>
                          </p>                   
                          <hr />
                        </li>
                      ))
                    ) : null
                  }
                </ul>
          </div>
          
          <div className="playlist">
            <Switch>
              <Route path={`${props.match.url}/playlist/:id`} render={props => <Playlist {...props}/> } />
              <Route path={`${props.match.url}/create playlist`} render={props => <CreatePlaylist branchId={branch._id} {...props}/> } />
            </Switch>
          </div>
        </div>
      </div>
    </>
  ) : null;
};

export default withRouter(BranchPage);
