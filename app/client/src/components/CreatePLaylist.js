import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  Redirect
} from "react-router-dom";
import { createBranchPlaylist } from "../../api/playlists";
import Button from "@material-ui/core/Button";
import Input from "@material-ui/core/Input";
import DatetimeRangePicker from "react-datetime-range-picker";
import TimePicker from "rc-time-picker";
import moment from "moment";
import "rc-time-picker/assets/index.css";
import "./css/createPlaylist.css";

const CreatePlaylist = props => {
  const { branchId, setPlaylists } = props;
  const [name, setName] = useState("");
  const [totalTime, setTotalTime] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);

  const createHandleClick = () => {
    if (name && endDate && startDate && totalTime) {
      let playlistObj = {
        name,
        endDate,
        startDate,
        totalTime,
        files: JSON.stringify([{ url, screen, order }, { url, screen, order }])
      };
      //createBranchPlaylist(branchId,playlistObj,setPlaylists);
    }
  };

  const handleChangeName = event => {
    setName(event.target.value);
  };

  const showSecond = true;
  const str = showSecond ? "HH:mm:ss" : "HH:mm";

  function onChangeTotalTime(value) {
    if (value) {
      setTotalTime(value.format(str));
    }
  }

  function dateTimeRangePickerChange(value) {
    if (value && value.end && value.start) {
      setStartDate(moment(value.end).format());
      setEndDate(moment(value.start).format());
    }
  }

  const selecFileHandler = event => {
    setSelectedFile(event.target.files[0]);
  };

  const fileUploadHandler = event => {};

  return branchId ? (
    <div className="createPlaylist">
      <div className="head">
        <span>Create Playlist </span>
        <Link to={`/branches/${branchId}/`}>
          <i className="close" />
        </Link>
      </div>
      <div className="createPlaylistBody">
        <div className="playlistTabsContainer">
          <div className="nameContainer spaceBetWeen">
            <span className="playlistTabHead">Name</span>
            <Input
              value={name}
              title={name}
              onChange={handleChangeName}
              placeholder="Name"
            />
          </div>
          <div className="totalTime spaceBetWeen">
            <span className="playlistTabHead">Total Time</span>
            <TimePicker
              style={{ width: 100 }}
              showSecond={showSecond}
              defaultValue={moment()}
              className="xxx"
              onChange={onChangeTotalTime}
            />
          </div>
          <div className="dataRangePicker spaceBetWeen">
            <span className="playlistTabHead">Pick Data Range</span>
            <DatetimeRangePicker input onChange={dateTimeRangePickerChange} />
          </div>
        </div>
        <div className="playlistFilesContainer">
          <input type="file" onChange={selecFileHandler} />
          <button onClick={fileUploadHandler}>Upload</button>
        </div>
        <Button variant="contained" onClick={createHandleClick}>
          Create
        </Button>
      </div>
    </div>
  ) : (
    <h1>Loading...</h1>
  );
};

export default CreatePlaylist;
