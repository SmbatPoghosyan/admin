import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  Redirect
} from "react-router-dom";
import { createBranchPlaylist } from "../api/playlists";
import Button from "@material-ui/core/Button";
import Input from "@material-ui/core/Input";
import DatetimeRangePicker from "react-datetime-range-picker";
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";
import "./css/createPlaylist.css";
import { uploadFile } from "../api/files";
import { cancel } from "../api/files";
import { TextField } from "@material-ui/core";
import MenuItem from "@material-ui/core/MenuItem";

const CreatePlaylist = props => {
  const {
    branchId,
    playlists,
    setPlaylists,
    branchScreens,
    disabledDates
  } = props;
  const [name, setName] = useState("");
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [selectedFile, setSelectedFile] = useState(null);
  const [disableCreate, setDisableCreate] = useState(true);
  const [enableUpload, setEnableUpload] = useState(false);
  const [uploadFileItem, setUploadFileItem] = useState(null);
  const [screen, setScreen] = useState([]);
  const [uploadPercentage, setUploadPercentage] = useState();
  const [day, setDay] = useState("");
  const [hour, setHour] = useState("");
  const [minute, setMinute] = useState("");
  const [second, setSecond] = useState("");
  const [showTime, setShowTime] = useState(0);
  const [order, setOrder] = useState({
    order1: [],
    order2: [],
    order3: []
  });
  const [files, setFiles] = useState([]);
  const [isInvalidDate, setIsInvalidDate] = useState(true);
  const [check, setCheck] = useState({
    checked1: false,
    checked2: false,
    checked3: false
  });
  const [maxOrder, setMaxOrder] = useState(1);
  const [orderTemp, setOrderTemp] = useState(1);

  useEffect(() => {
    let max = 0;
    screen.forEach(s => {
      let arr = order[`order${s}`];
      let temp = Math.max(...arr);
      max = max > temp ? max : temp;
    });
    setMaxOrder(max + 1);
    setOrderTemp(max + 1);
  }, [screen]);

  useEffect(() => {
    const seconds =
      (second ? second : 0) +
      (minute ? minute : 0) * 60 +
      (hour ? hour : 0) * 60 * 60 +
      (day ? day : 0) * 24 * 60 * 60;
    setShowTime(seconds);
  }, [day, hour, minute, second]);

  useEffect(() => {
    if (files.length && name && startDate && endDate && !isInvalidDate) {
      setDisableCreate(false);
    } else {
      setDisableCreate(true);
    }
  }, [files, name, startDate, endDate, isInvalidDate]);

  useEffect(() => {
    if (showTime && order && screen && selectedFile && uploadFileItem) {
      setEnableUpload(true);
    } else {
      setEnableUpload(false);
    }
  }, [uploadFileItem, showTime, order, screen, selectedFile]);

  const createHandleClick = () => {
    const playlistObj = {
      name,
      endDate,
      startDate,
      currency: false,
      ticker: false,
      files: JSON.stringify([...files])
    };
    createBranchPlaylist(branchId, playlistObj, setPlaylists);

    setName("");
    setStartDate(new Date());
    setEndDate(new Date());
    setFiles([]);
  };
  const handleChangeName = event => {
    setName(event.target.value);
  };
  function dateTimeRangePickerChange(value) {
    const start = new Date(value.start).valueOf();
    const end = new Date(value.end).valueOf();

    let minDate = -Infinity;
    let maxDate = Infinity;

    for (let item of disabledDates) {
      const startRange = new Date(item.startDate).valueOf();
      const endRange = new Date(item.endDate).valueOf();
      if (start < startRange || start > endRange) {
        if (minDate === -Infinity) {
          minDate = start > endRange ? endRange : minDate;
        }
        if (maxDate === Infinity) {
          maxDate = start < startRange ? startRange : maxDate;
        }
      } else if (start >= startRange && start <= endRange) {
        setIsInvalidDate(true);
        alert(
          `This date is in used!!! ${new Date(
            item.startDate
          ).toLocaleString()} - ${new Date(
            item.endDate
          ).toLocaleString()} try another date.`
        );
        return;
      }
    }

    if (start && start > minDate && start < maxDate) {
      if (end && end > minDate && end < maxDate) {
        setIsInvalidDate(false);
        setEndDate(end);
      }
      setStartDate(start);
      return;
    }
    setIsInvalidDate(true);
    alert(
      `This date is in used!!! try less than ${new Date(
        maxDate
      ).toLocaleString()} .`
    );
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
  const selectFileHandler = event => {
    setSelectedFile(event.target.files[0]);
  };
  const deleteFile = i => {
    setFiles(
      files.filter(function(v, ind) {
        return ind !== i;
      })
    );
  };
  const resetForm = () => {
    const form = document.getElementById("form");
    form.reset();
    cancel();
    setUploadPercentage("");
    setSelectedFile(null);
    setUploadFileItem(null);
  };
  const fileUploadHandler = event => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("file", selectedFile);
    uploadFile(formData, setUploadFileItem, setUploadPercentage);
  };
  const checkBoxHandleChange = name => event => {
    if (
      (check.checked1 && !check.checked2 && name === "checked3") ||
      (check.checked3 && !check.checked2 && name === "checked1")
    ) {
      return;
    }
    if (
      check.checked1 &&
      check.checked2 &&
      check.checked3 &&
      name === "checked2"
    ) {
      setCheck({
        checked1: false,
        checked2: false,
        checked3: false
      });
      setScreen([]);
      return;
    }
    let screenArr = screen;
    setCheck({ ...check, [name]: event.target.checked });
    if (screenArr.indexOf(parseInt(name.split("")[name.length - 1])) === -1) {
      setScreen([...screenArr, parseInt(name.split("")[name.length - 1])]);
    } else if (
      screenArr.indexOf(parseInt(name.split("")[name.length - 1])) !== -1
    ) {
      screenArr.splice(
        screenArr.indexOf(parseInt(name.split("")[name.length - 1])),
        1
      );
      setScreen([...screenArr]);
    }
  };
  const handleChangeOrder = event => {
    setOrderTemp(event.target.value);
  };

  const createFile = event => {
    if (uploadFileItem) {
      screen.forEach(s => {
        let arr = order[`order${s}`];
        arr.push(orderTemp);
        setOrder({ ...order, [`order${s}`]: [...arr] });
      });

      let tempFiles = files;
      screen.forEach(s => {
        files.forEach((file, i) => {
          if (file.screen.indexOf(s) !== -1) {
            let o = file.order;
            if (file.order >= orderTemp) {
              file.screen.forEach(scr => {
                if (scr === s) {
                  o++;
                  let arr = order[`order${scr}`];
                  arr.push(o);
                  setOrder({ ...order, [`order${scr}`]: [...arr] });
                } else {
                  tempFiles = tempFiles.map(f => {
                    if (f.screen.indexOf(scr) !== -1) {
                      let ord = f.order;
                      if (f.order >= o) {
                        ord++;
                        let arr = order[`order${scr}`];
                        arr.push(ord);
                        setOrder({ ...order, [`order${scr}`]: [...arr] });
                      }
                      return { ...f, order: ord };
                    }
                    return f;
                  });
                }
              });
            }
            tempFiles[i] = { ...file, order: o };
          }
          return file;
        });
      });

      setFiles([
        ...tempFiles,
        {
          showTime,
          order: orderTemp,
          screen,
          name: uploadFileItem.filename,
          type: uploadFileItem.mimetype,
          url: uploadFileItem.path
        }
      ]);
    }

    setTimeout(() => {
      setShowTime(0);
      setScreen([]);
      setDay("");
      setHour("");
      setMinute("");
      setSecond("");
      setUploadFileItem(null);
      setSelectedFile(null);
      resetForm();
      setCheck({
        checked1: false,
        checked2: false,
        checked3: false
      });
    }, 500);
  };
  const convertSeconds = seconds => {
    let sec = parseInt(seconds, 10);
    let days = Math.floor(sec / (3600 * 24));
    sec -= days * 3600 * 24;
    let hrs = Math.floor(sec / 3600);
    sec -= hrs * 3600;
    let mnts = Math.floor(sec / 60);
    sec -= mnts * 60;
    return days + "d:" + hrs + "h:" + mnts + "m:" + sec + "s";
  };

  const strDay = `${day || day === 0 ? (day < 10 ? "0" + day : day) : " --"}:d`;
  const strHour = `${hour || hour === 0 ? (hour < 10 ? "0" + hour : hour) : " --"}:h`;
  const strMinute = `${minute || minute === 0 ? (minute < 10 ? "0" + minute : minute) : " --"}:m`;
  const strSecond = `${second || second === 0 ? (second < 10 ? "0" + second : second) : " --"}:s`;

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
          <div>
            <div className="playlistCreateItemCont">
              <Input
                className="backgroundFFF"
                value={name}
                title={name}
                onChange={handleChangeName}
                placeholder="Name"
              />
            
              <DatetimeRangePicker
                inputProps={{
                  className: "margin05",
                  placeholder: "pick date and time"
                }}
                timeFormat
                startDate={startDate ? new Date(startDate) : ""}
                endDate={endDate ? new Date(endDate) : ""}
                onChange={dateTimeRangePickerChange}
                className="centerByFlex dateRangeClass"
              />
            </div>
          </div>
          <div
            className="spaceBetWeen"
            style={{ height: "100%", alignItems: "flex-start" }}
          >
            <div className="createFileCont">
              <span className="head"> 
                Create File
              </span>
              <div className="playlistCreateItemCont spaceBetWeen">
                <span className="playlistTabHead">Show Time:</span>
                <div className="showTimeCont centerByFlex">
                  <span >
                    {`${strDay} ${strHour} ${strMinute} ${strSecond} `}
                  </span>
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
                </div>
              </div>
              <div className="playlistCreateItemCont spaceBetWeen">
                <span className="playlistTabHead">Screen:</span>
                <div className="backgroundFFF" style={{ padding: "0.5rem" }}>
                  {[1, 2, 3].map(option =>
                    option <= branchScreens ? (
                      <span key={option}>
                        <label>{option}</label>
                        <input
                          className="margin05 padding05"
                          type="checkbox"
                          checked={
                            option === 1
                              ? check.checked1
                              : option === 2
                              ? check.checked2
                              : check.checked3
                          }
                          onChange={checkBoxHandleChange(`checked${option}`)}
                        />
                      </span>
                    ) : null
                  )}
                </div>
              </div>
              {screen.length > 0 && (
                <div className="playlistCreateItemCont spaceBetWeen">
                  <span className="playlistTabHead">Order:</span>
                  <TextField
                    className={`brancheScreen`}
                    select
                    title="order"
                    value={orderTemp}
                    onChange={handleChangeOrder}
                  >
                    {Array.from({ length: maxOrder }, (v, k) => k + 1).map(
                      (a, i) => (
                        <MenuItem key={a} dense={false} value={a}>
                          {a}
                        </MenuItem>
                      )
                    )}
                  </TextField>
                </div>
              )}
              <form id="form" onSubmit={fileUploadHandler}>
                <div className="spaceBetWeen" style={{ margin: "0.5rem 0" }}>
                  <input type="file" onChange={selectFileHandler} />
                  <span>
                    {uploadPercentage && (
                      <label style={{ marginRight: "0.5rem" }}>
                        {uploadPercentage}%
                      </label>
                    )}
                    <button
                      type="submit"
                      disabled={!selectedFile || uploadFileItem}
                      className={(!selectedFile || uploadFileItem) ? "buttonDisabled" : ""}
                    >
                      Upload
                    </button>
                    <button
                      type="reset"
                      onClick={resetForm}
                      disabled={!selectedFile}
                      className={(!selectedFile) ? "buttonDisabled" : ""}
                    >
                      Cancel
                    </button>
                  </span>
                </div>
              </form>
              {uploadFileItem && (
                <div className="fileContainer">
                  {uploadFileItem.mimetype.split("/")[0] === "video" && (
                    <video src={uploadFileItem.path} controls preload="none">
                      Your browser does not support the video tag.
                    </video>
                  )}
                  {uploadFileItem.mimetype.split("/")[0] === "image" && (
                    <img src={uploadFileItem.path} />
                  )}
                </div>
              )}
              <button
                onClick={createFile}
                disabled={!enableUpload}
                className={`createFileButton ${!enableUpload ? "buttonDisabled" : ""}`} 
              >
                Create File
              </button>
              
            </div>

            <div className="playlistFilesContainer spaceBetWeen">
              <>
                <div className="allListLinkContainer" style={{ margin: "0.5rem", maxHeight: "62vh" }}>
                  <p className="head">File List</p>

                  <ul className="list listHeight">
                    {files.length > 0
                      ? files.map((file, i) => (
                          <li className="playlistLink" key={i}>
                            <div>
                              <div>
                                {i + 1}. {file.name}
                              </div>
                              <div className="spaceBetWeen">
                                <div>
                                  <span className="fileLi">
                                    Screen:
                                    <strong className="bold">
                                      {file.screen.join(",")}
                                    </strong>.
                                  </span>
                                  <span className="fileLi">
                                    Order:
                                    <strong className="bold">
                                      {file.order}
                                    </strong>.
                                  </span>
                                  <span className="fileLi">
                                    Time: {convertSeconds(file.showTime)}.
                                  </span>
                                </div>
                                <span>
                                  <IconButton
                                    aria-label="Delete"
                                    onClick={() => deleteFile(i)}
                                    title="Delete"
                                    style={{ padding: "3px" }}
                                  >
                                    <DeleteIcon fontSize="small" />
                                  </IconButton>
                                </span>
                              </div>
                            </div>
                            <hr />
                          </li>
                        ))
                      : null}
                  </ul>
                </div>
              </>
            </div>
          </div>
        </div>
      </div>
      <Button
        variant="contained"
        onClick={createHandleClick}
        className={`createButton ${disableCreate ? "buttonDisabled" : ""}`}
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
