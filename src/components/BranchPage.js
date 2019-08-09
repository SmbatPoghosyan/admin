import React, { useState, useEffect } from "react";
import { getBranchById } from "../api/branches";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  Redirect
} from "react-router-dom";
import Playlist from "./Playlist";
import Button from "@material-ui/core/Button";
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";
import "./css/branchPage.css";
import "./css/branches.css";
import CreatePlaylist from "./CreatePlaylist";
import { withRouter } from "react-router";
import { getAllBranchePlaylists, deletePlaylist } from "../api/playlists";

const BranchPage = props => {
  const [branch, setBranch] = useState({});
  const [playlists, setPlaylists] = useState([]);
  const [disabledDates,setDisabledDates] = useState([]);
  const { params } = props.match;


  useEffect(() => {
    getBranchById(params.id, setBranch, setPlaylists);
    getAllBranchePlaylists(params.id, setPlaylists);
  }, []);

  useEffect(()=>{
    initDisabledDates();
  },[playlists]);

  const initDisabledDates  = () => {
    let arr = [];
    playlists.forEach((playlist)=>{
      arr.push(
          {
            id: playlist._id,
            startDate: new Date(playlist.startDate).valueOf() ,
            endDate: new Date(playlist.endDate).valueOf()
          });
    });
    arr.sort((a,b) => a.startDate-b.startDate);
    console.log(arr);
    setDisabledDates(arr);
  };

  const createHandleClick = () => {
    props.history.push(`/branches/${branch._id}/create`);
  };

  const deleteHandleClick = playlistId => {
    if (window.confirm("Are you sure ?")) {
      deletePlaylist(playlistId, branch._id, setPlaylists);
    }
  };

  return branch && branch._id ? (
    <>
      <div className="branchPageContainer">
        <div className="body">
          <div className="allListLinkContainer">
            <p className="head">Playlists</p>

            <ul className="list listHeight">
              {playlists.length > 0
                ? playlists.map((playlist, i) => (
                    <li className="playlistLink" key={i}>
                      <p>
                        <Link
                          to={`/branches/${branch._id}/playlist/${
                            playlist._id
                          }`}
                        >
                          {i + 1}. {playlist.name}{" "}
                        </Link>
                        <span>
                          <IconButton
                            aria-label="Delete"
                            onClick={() => deleteHandleClick(playlist._id)}
                            title="Delete"
                            style={{ padding: "3px" }}
                          >
                            <DeleteIcon fontSize="small" />
                          </IconButton>
                        </span>
                      </p>
                      <hr />
                    </li>
                  ))
                : null}
            </ul>

          </div>
          <div className="headAndPlaylistcontainer">
            <div className="head">
              <span className="hello">Hello, {branch.name}</span>
              <span className="screen">Screen {branch.screens}</span>
            </div>

            <div className="playlist">
              <Switch>
                <Route
                  exact
                  path={`${props.match.url}/`}
                  render={props => (
                    <>
                      <div className="centerByFlex selectOrCreate">
                        Select or Create Playlist
                        <Button variant="contained" onClick={createHandleClick}>
                          Create
                        </Button>
                      </div>
                    </>
                  )}
                />
                <Route
                  path={`${props.match.url}/playlist/:id`}
                  render={props => <Playlist {...props} />}
                />
                <Route
                  path={`${props.match.url}/create`}
                  render={props => (
                    <CreatePlaylist
                      branchId={branch._id}
                      branchScreens={branch.screens}
                      setPlaylists={setPlaylists}
                      playlists={playlists}
                      disabledDates={disabledDates}
                      {...props}
                    />
                  )}
                />
              </Switch>
            </div>
          </div>
        </div>
      </div>
    </>
  ) : (
    <h1 className="centerByFlex margin0Auto">Loading...</h1>
  );
};

export default withRouter(BranchPage);