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
import moment from "moment";
import MenuItem from "@material-ui/core/MenuItem";
import { TextField } from "@material-ui/core";
import "rc-time-picker/assets/index.css";
import "./css/createPlaylist.css";
import { uploadFile } from "../../api/files";

const CreatePlaylist = props => {
  const { branchId, playlists, setPlaylists, branchScreens } = props;
  const [name, setName] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [disableCreate, setDisableCreate] = useState(true);
  const [file, setFile] = useState(null);
  const [screen, setScreen] = useState(1);
  const [uploadPercentage, setUploadPercentage] = useState();
  const [day, setDay] = useState("");
  const [hour, setHour] = useState("");
  const [minute, setMinute] = useState("");
  const [second, setSecond] = useState("");
  const [showTime, setShowTime] = useState(null);
  const [order, setOrder] = useState("");

  useEffect(() => {
    let miliseconds =
      (second ? second : 0) * 1000 +
      (minute ? minute : 0) * 60 * 1000 +
      (hour ? hour : 0) * 60 * 60 * 1000 +
      (day ? day : 0) * 24 * 60 * 60 * 1000;
    setShowTime(miliseconds);
  }, [day, hour, minute, second]);

  useEffect(() => {
    if (name && startDate && endDate && file && showTime && order) {
      setDisableCreate(false);
    }
  }, [name, startDate, endDate, file, showTime, order]);

  const createHandleClick = () => {
      let playlistObj = {
        name,
        endDate,
        startDate,
        files: JSON.stringify([{ url, screen, order }, { url, screen, order }])
      };
      //createBranchPlaylist(branchId,playlistObj,setPlaylists);
  };

  const handleChangeName = event => {
    setName(event.target.value);
  };

  function dateTimeRangePickerChange(value) {
    if (value && value.end && value.start) {
      setStartDate(moment(value.end).format());
      setEndDate(moment(value.start).format());
    }
  }

  const selectFileHandler = event => {
    setSelectedFile(event.target.files[0]);
  };

  const handleChangeDay = event => {
    let val = event.target.value ? parseInt(event.target.value) : "";
    if (val <= 365 && val >= 0) {
      setDay(val);
    }
  };
  const handleChangeHour = event => {
    let val = event.target.value ? parseInt(event.target.value) : "";
    if (val <= 23 && val >= 0) {
      setHour(val);
    }
  };
  const handleChangeMinute = event => {
    let val = event.target.value ? parseInt(event.target.value) : "";
    if (val <= 59 && val >= 0) {
      setMinute(val);
    }
  };
  const handleChangeSecond = event => {
    let val = event.target.value ? parseInt(event.target.value) : "";
    if (val <= 59 && val >= 0) {
      setSecond(val);
    }
  };

  const fileUploadHandler = event => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("file", selectedFile);
    formData.append("name", selectedFile.name);
    uploadFile(formData, setFile, setUploadPercentage);
  };

  const strDay = `D:${day || day === 0 ? (day < 10 ? "0" + day : day) : " --"}`;
  const strHour = `H:${
    hour || hour === 0 ? (hour < 10 ? "0" + hour : hour) : " --"
  }`;
  const strMinute = `M:${
    minute || minute === 0 ? (minute < 10 ? "0" + minute : minute) : " --"
  }`;
  const strSecond = `S:${
    second || second === 0 ? (second < 10 ? "0" + second : second) : " --"
  }`;

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
          Info
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
            <span className="playlistTabHead">Date Range</span>
            <DatetimeRangePicker input onChange={dateTimeRangePickerChange} />
          </div>
          <div>
            File
            <div className="playlistCreateItemCont spaceBetWeen">
              <span className="playlistTabHead">Show Time</span>

              <div className="showTimeCont">
                <input
                  placeholder="day"
                  type="number"
                  title="day"
                  min="0"
                  max="365"
                  onChange={handleChangeDay}
                  value={day}
                />
                <input
                  placeholder="hour"
                  type="number"
                  title="hour"
                  min="0"
                  max="23"
                  onChange={handleChangeHour}
                  value={hour}
                />
                <input
                  placeholder="minute"
                  type="number"
                  title="minute"
                  min="0"
                  max="59"
                  onChange={handleChangeMinute}
                  value={minute}
                />
                <input
                  placeholder="second"
                  type="number"
                  title="second"
                  min="0"
                  max="59"
                  onChange={handleChangeSecond}
                  value={second}
                />
                <div>{`${strDay} ${strHour} ${strMinute} ${strSecond} `}</div>
              </div>
            </div>
            <div className="playlistCreateItemCont spaceBetWeen">
              <span className="playlistTabHead">Order</span>
              <input
                placeholder="order"
                type="number"
                title="order"
                min="0"
                onChange={e => setOrder(e.target.value)}
              />
            </div>
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
            <form onSubmit={fileUploadHandler}>
              <div className="spaceBetWeen" style={{ margin: "0.5rem 0" }}>
                <input type="file" onChange={selectFileHandler} />
                <span>
                  {uploadPercentage && (
                    <label style={{ marginRight: "0.5rem" }}>
                      {uploadPercentage}%
                    </label>
                  )}
                  <button type="submit">Upload</button>
                </span>
              </div>
            </form>
            {file && file.path && (
              <div className="fileContainer">
                {file.mimetype.split("/")[0] === "video" ? (
                  <video src={file.path} controls preload="none">
                    Your browser does not support the video tag.
                  </video>
                ) : null}
                {file.mimetype.split("/")[0] === "image" ? (
                  <img src={file.path} />
                ) : null}
              </div>
            )}
          </div>
        </div>

        <div className="playlistFilesContainer spaceBetWeen">
          <>
            <div className="allListLinkContainer" style={{ margin: "0.5rem" }}>
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
          </>
        </div>
      </div>
      <Button
        variant="contained"
        //onClick={createHandleClick}
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
