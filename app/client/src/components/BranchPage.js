import React, { useState, useEffect } from "react";
import { getBranchById } from "../../api/branches";
import { BrowserRouter as Router, Route, Link, Switch,Redirect } from "react-router-dom";
import Playlist from "./Playlist";
import Button from "@material-ui/core/Button";

import "./css/branchPage.css";
import "./css/branches.css";
import CreatePlaylist from "./CreatePLaylist";

const BranchPage = props => {
  const [branch, setBranch] = useState({});
  const { params } = props.match;

  useEffect(() => {
    getBranchById(params.id, setBranch);
    return()=> {
      getBranchById(params.id, setBranch);
    };
  }, []);

  let playlists = [];
  // let playlists = [
  //   {
  //     name: "Aaaaa",
  //     _id: 111111111111111
  //   },
  //   {
  //     name: "Aaaaa",
  //     _id: 2222222222222222
  //   },
  //   {
  //     name: "Aaaaa",
  //     _id: 33333333333333333
  //   },
  //   {
  //     name: "Aaaaa",
  //     _id: 44444444444444444
  //   },
  //   {
  //     name: "Aaaaa",
  //     _id: 18888888888821321321
  //   },
  //   {
  //     name: "Aaaaa",
  //     _id: 16666666666777721321
  //   },
  //   {
  //     name: "Aaaaa",
  //     _id: 666666666666621321321
  //   },
  //   {
  //     name: "Aaaaa",
  //     _id: 1555555555555321321
  //   },
  //   {
  //     name: "Aaaaa",
  //     _id: 300021321
  //   },
  //   {
  //     name: "Aaaaa",
  //     _id: 18
  //   },
  //   {
  //     name: "Aaaaa",
  //     _id: 88801321321
  //   },
  //   {
  //     name: "Aaaaa",
  //     _id: 321321321
  //   },
  //   {
  //     name: "Aaaaa",
  //     _id: 111321321321
  //   },
  //   {
  //     name: "Aaaaa",
  //     _id: 1321321321
  //   },
  //   {
  //     name: "Aaaaa",
  //     _id: 1321
  //   },
  //   {
  //     name: "Aaaaa",
  //     _id: 21321
  //   },
  //   {
  //     name: "Aaaaa",
  //     _id: 3211321321321
  //   },
  //   {
  //     name: "Aaaaa",
  //     _id: 1
  //   },
  //   {
  //     name: "Aaaaa",
  //     _id: 453475321
  //   },
  //   {
  //     name: "Aaaaa",
  //     _id: 3211245213211321321321
  //   },
  //   {
  //     name: "Aaaaa",
  //     _id: 17886938888881321321321
  //   },
  //   {
  //     name: "Aaaaa",
  //     _id: 24147254524521321
  //   },
  //   {
  //     name: "Aaaaa",
  //     _id: 1747869611321321321
  //   },
  //   {
  //     name: "Aaaaa",
  //     _id: 4144411321321
  //   },
  //   {
  //     name: "Aaaaa",
  //     _id: 12221321132132
  //   },
  //   {
  //     name: "Aaaaa",
  //     _id: 1222132113213
  //   },
  //   {
  //     name: "Aaaaa",
  //     _id: 1222132
  //   },
  //   {
  //     name: "Aaaaa",
  //     _id: 12221321132
  //   }
  // ];
  const createHandleClick = () => {
    props.history.push(`/branches/${branch._id}/create playlist`); 
  }

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

export default BranchPage;
