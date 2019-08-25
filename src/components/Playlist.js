import React from "react";
import "./css/playlist.css";
import CreatePlaylist from "./CreatePlaylist";

const Playlist = props => {

  const playlistId = props.match.params.id;
  const { branchId, setPlaylists,disabledDates, branchScreens } = props;
  
  return (
    <CreatePlaylist
      playlistId={playlistId}
      branchId={branchId}
      branchScreens={branchScreens}
      setPlaylists={setPlaylists}
      disabledDates={disabledDates}
      {...props}
    />  
  );
};
export default Playlist;
