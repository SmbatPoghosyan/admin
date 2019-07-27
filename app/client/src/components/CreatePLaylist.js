import React, { useState, useEffect } from "react";
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
import MenuItem from "@material-ui/core/MenuItem";
import { TextField } from "@material-ui/core";
import "rc-time-picker/assets/index.css";
import "./css/createPlaylist.css";

const CreatePlaylist = props => {
  const { branchId, setPlaylists, branchScreens } = props;
  const [name, setName] = useState("");
  const [totalTime, setTotalTime] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [openAddFile, setOpenAddFile] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [disableCreate, setDisableCreate] = useState(true);
  const [isValidDate, setIsValidDate] = useState(false);
  const [files, setFiles] = useState(null);
  const [screen, setScreen] = useState(1);

  useEffect(() => {
    if (name && totalTime && startDate && endDate && isValidDate && files) {
      setDisableCreate(false);
    }
  }, [name, totalTime, startDate, endDate, isValidDate, files]);

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

  const selectFileHandler = event => {
    setSelectedFile(event.target.files[0]);
    console.log(event.target);
  };

  if (selectedFile) {
    console.log("selectedFile", selectedFile);
  }

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
          <div className="playlistCreateItemCont spaceBetWeen">
            <span className="playlistTabHead">Name</span>
            <Input
              className="backgoundFFF"
              value={name}
              title={name}
              onChange={handleChangeName}
              placeholder="Name"
            />
          </div>
          <div className="playlistCreateItemCont spaceBetWeen">
            <span className="playlistTabHead">Pick Data Range</span>
            <DatetimeRangePicker input onChange={dateTimeRangePickerChange} />
          </div>
          <div className="playlistCreateItemCont spaceBetWeen">
            <span className="playlistTabHead">Total Time</span>
            <TimePicker
              style={{ width: 100 }}
              showSecond={showSecond}
              defaultValue={moment()}
              className="xxx"
              onChange={onChangeTotalTime}
            />
          </div>
        </div>

        <div
          className={`playlistFilesContainer ${
            openAddFile ? "spaceBetWeen" : "centerByFlex"
          }`}
        >
          {!openAddFile && (
            <Button
              variant="contained"
              onClick={() => setOpenAddFile(true)}
              className="createButton"
            >
              Add File
            </Button>
          )}
          {openAddFile && (
            <>
              <div className="allListLinkContainer" style={{ maxWidth: "50%" }}>
                <p className="head">File List</p>

                <ul className="list listHeight">
                  {/* {files.length > 0
                ? files.map((file, i) => (
                    <li className="playlistLink" key={i}>
                      <p>
                        {i + 1}. {file.name}
                        <span>
                          <IconButton
                            aria-label="Delete"
                            onClick={() => deleteHandleClick(file.name)}
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
                : null} */}
                </ul>
              </div>
              <div>
                <div className="playlistCreateItemCont spaceBetWeen">
                  <span className="playlistTabHead">Screen</span>
                  <TextField
                    className="backgoundFFF"
                    select
                    title="Screen"
                    value={screen}
                    onChange={event => setScreen(event.target.value)}
                  >
                    {[1, 2, 3].map(option =>
                      option <= branchScreens ? (
                        <MenuItem key={option} dense={false} value={option}>
                          {option}
                        </MenuItem>
                      ) : null
                    )}
                  </TextField>
                </div>
                <input type="file" onChange={selectFileHandler} />
                <button onClick={fileUploadHandler}>Upload</button>
              </div>
            </>
          )}
        </div>
      </div>
      <Button
        variant="contained"
        onClick={createHandleClick}
        className={`createButton ${disableCreate ? "buttonDesabled" : ""}`}
        disabled={disableCreate}
      >
        Create
      </Button>
    </div>
  ) : (
    <h1 className="centerByFlex">Loading...</h1>
  );
};

export default CreatePlaylist;
