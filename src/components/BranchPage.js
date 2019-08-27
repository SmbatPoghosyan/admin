import React, { useState, useEffect } from "react";
import { getBranchById } from "../api/branches";
import {
  Route,
  Link,
  Switch,
  Redirect
} from "react-router-dom";
import Playlist from "./Playlist";
import Button from "@material-ui/core/Button";
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";
import AddToPhotosIcon from '@material-ui/icons/AddToPhotos';
import "./css/branchPage.css";
import "./css/branches.css";
import CreatePlaylist from "./CreatePlaylist";
import { withRouter } from "react-router";
import { getAllBranchePlaylists, deletePlaylist, createBranchPlaylist } from "../api/playlists";

const BranchPage = props => {
  const [branch, setBranch] = useState({});
  const [playlists, setPlaylists] = useState([]);
  const [disabledDates,setDisabledDates] = useState([]);
  const { params } = props.match;
  const [letAdd,setLetAdd] = useState(false);

  useEffect(() => {
    getBranchById(params.id, setBranch, setPlaylists);
    getAllBranchePlaylists(params.id, setPlaylists);
  }, [params.id]);
  
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
    setDisabledDates(arr);
  };

  useEffect(()=> {
    initDisabledDates();
  },[playlists]);
  
  const createHandleClick = () => {
    props.history.push(`/branches/${branch._id}/create`);
  };

  const deleteHandleClick = playlistId => {
    if (window.confirm("Are you sure ?")) {
      deletePlaylist(playlistId, branch._id, setPlaylists);
    }
  };

  const handleAddPlaylist = () => {
    let playlistInfo = JSON.parse(localStorage.getItem('copiedPlaylist'));
    playlistInfo.files = JSON.stringify(playlistInfo.files);
    createBranchPlaylist(branch._id, playlistInfo,setPlaylists);
  };

  useEffect(()=> {
    setLetAdd(letAddPlaylist());
  },[branch])

  const letAddPlaylist = () => {
    let playlistInfo = JSON.parse(localStorage.getItem('copiedPlaylist'));
    if(!playlistInfo || parseInt(localStorage.getItem('screens')) !== branch.screens)
    {
      return false;
    }

    for(let it of disabledDates) 
    {
      if( (playlistInfo.startDate >= it.startDate && playlistInfo.startDate <= it.endDate) ||
          (playlistInfo.endDate >= it.startDate && playlistInfo.endDate <= it.endDate)) 
      {  
        return false;
      }
      if( (it.startDate >= playlistInfo.startDate && it.startDate <= playlistInfo.endDate) ||
          (it.endDate >= playlistInfo.startDate && it.endDate <= playlistInfo.endDate)) 
      {
        return false;
      }  
    }
    return true;
  };
  
  return branch && branch._id ? (
    <>
      <div className="branchPageContainer">
        <div className="body">
          <div className="allListLinkContainer">
            <p className="head">Playlists</p>
            { letAdd &&
              <div className="iconsContainer" style={{background: "#f99a4e"}}>
                <IconButton
                  aria-label="Add"
                  onClick={handleAddPlaylist}
                  title="Add Playlist"
                >
                  <AddToPhotosIcon fontSize="small" />
                </IconButton>
              </div>
            }
            <ul className="list listHeight">
              {playlists.length > 0
                ? playlists.map((playlist, i) => (
                    <li className="playlistLink" key={i}>
                      <p>
                        <Link to={`/branches/${branch._id}/playlist/${playlist._id}`}>
                          {i + 1}. {playlist.name}
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
              <span><Link to="/">Home</Link></span>
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
                  render={props => 
                  <Playlist                     
                    setPlaylists={setPlaylists}
                    branchId={branch._id}
                    branchScreens={branch.screens}
                    disabledDates={disabledDates}
                    {...props}
                    />
                  }
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
                <Redirect to="/" />
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
