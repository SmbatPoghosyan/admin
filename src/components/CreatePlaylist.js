import React, { useState, useEffect,useRef } from "react";
import { Link } from "react-router-dom";
import { createBranchPlaylist, getPlaylistById, updatePlaylist } from "../api/playlists";
import Button from "@material-ui/core/Button";
import Input from "@material-ui/core/Input";
import DatetimeRangePicker from "react-datetime-range-picker";
import DeleteIcon from "@material-ui/icons/Delete";
import FileCopyIcon from "@material-ui/icons/FileCopy";
import IconButton from "@material-ui/core/IconButton";
import "./css/createPlaylist.css";
import { uploadFile } from "../api/files";
import { cancel } from "../api/files";
import { TextField } from "@material-ui/core";
import MenuItem from "@material-ui/core/MenuItem";
import { convertSeconds, formatTime, formatBytes, isEmpty, convertSecondsIntoString } from "./Utils";
import { withRouter } from "react-router";

const CreatePlaylist = props => {
  const {
    branchId,
    setPlaylists,
    branchScreens,
    disabledDates,
    playlistId
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
  const [first, setFirst] = useState(true);
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
  const [playlist,setPlaylist] = useState();
  const [changed,setChanged] = useState(false);
  const [currency,setCurrency] = useState(false);
  const [ticker,setTicker] = useState(false);
  const [multiply,setMultiply] = useState(1);
  const [duration,setDuration] = useState(0);

  const copyHandleClick = (p) => {
    const {name,currency,ticker,startDate,endDate} = p;
    localStorage.setItem('copiedPlaylist', JSON.stringify({
      name,
      endDate:new Date(endDate).valueOf(),
      startDate:new Date(startDate).valueOf(),
      currency,
      ticker,
      files:[...files]
    }));
    localStorage.setItem('screens', branchScreens);
    alert(`Playlist "${name}" copied `);
  };

  let dates = null;

  useEffect(() => {
    if(playlist && files.length && first) {
      for(let file of files) {
        file.screen.forEach(screen => {
          let arr = order[`order${screen}`];
          arr.push(file.order);
          
          setOrder({ ...order, [`order${screen}`]: [...arr] });
        })
      }
      setFirst(false);
    }
  }, [files,playlist]);

  useEffect(() => {
    if(playlistId) {
      getPlaylistById(branchId,playlistId,setPlaylist,setFiles);
    }
   }, [playlistId]);

  useEffect(() => {
      if(playlist && !isEmpty(playlist)) {
        dates = disabledDates;
        for(let i in dates){
          if(dates[i].id === playlistId)
          {
            dates.splice(i,1);
          }
        }        
        setName(playlist.name);
        setStartDate(new Date(playlist.startDate).valueOf());
        setEndDate(new Date(playlist.endDate).valueOf());
        setCurrency(playlist.currency);
        setTicker(playlist.ticker);
        setIsInvalidDate(false);
      }
  }, [playlist]);

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
    if(playlist) {
      if(changed) {
        setDisableCreate(false);
      }
      else { 
        setDisableCreate(true);
      }
    }
    else if (files.length>0 && name && startDate && endDate && !isInvalidDate)
    {
      setDisableCreate(false);
    } 
    else
    {
      setDisableCreate(true);
    }
  }, [files, name, startDate, endDate, isInvalidDate,changed]);

  useEffect(() => {
    if (showTime && order && screen.length>0 && selectedFile && uploadFileItem) {
      setEnableUpload(true);
    } else {
      setEnableUpload(false);
    }
  }, [uploadFileItem, showTime, order, screen, selectedFile]);

  useEffect(()=>{
    if(duration) {
      setShowTimeByMultiply(multiply*duration);
    }
  },[multiply,duration]);
    
  const setShowTimeByMultiply = (d) => {
    const obj = convertSeconds(d);
    const {days,hrs,mnts,sec} = obj;
    setDay(days);
    setHour(hrs);
    setMinute(mnts);
    setSecond(sec);
  };

  const handleMetadata = (e) => {
    const d = e.currentTarget.duration.toFixed(2);
    setDuration(d);
    setShowTimeByMultiply(d);
  };

  const createHandleClick = () => {
    const playlistObj = {
      name,
      endDate,
      startDate,
      currency: currency,
      ticker: ticker,
      files: JSON.stringify([...files])
    };
    if(playlist) {
      updatePlaylist(playlistId,branchId,playlistObj,setPlaylists,toBranchPage);
      setChanged(false);
    }
    else 
    { 
      createBranchPlaylist(branchId, playlistObj, setPlaylists,toBranchPage);
      setName("");
      setCurrency(false);
      setTicker(false);
      setStartDate();
      setEndDate();
      setFiles([]);
    }
  };
  const handleChangeName = event => {
    setName(event.target.value);
    setChanged(true);
  };
  const toBranchPage = () => { 
    return props.history.push(`/branches/${branchId}/`);
  };
  const handleChangeCurrency = event => {
    setCurrency(event.target.checked);
    setChanged(true);
  };
  const handleChangeTicker = event => {
    setTicker(event.target.checked);
    setChanged(true);
  };
  const dateTimeRangePickerChange = (value) => {
    const start = new Date(value.start).valueOf();
    const end = new Date(value.end).valueOf();

    let minDate = -Infinity;
    let maxDate = Infinity;
    let d = dates ? dates : disabledDates;
    for (let item of d) {
      const startRange = new Date(item.startDate).valueOf();
      const endRange = new Date(item.endDate).valueOf();
      if (start < startRange || start > endRange) 
      {
        if (minDate === -Infinity) {
          minDate = start > endRange ? endRange : minDate;
        }
        if (maxDate === Infinity) {
          maxDate = start < startRange ? startRange : maxDate;
        }
      } 
      else if (start >= startRange && start <= endRange) 
      {
        setIsInvalidDate(true);
        alert(
          `This date is in used!!! ${new Date(item.startDate).toLocaleString()} - ${new Date(item.endDate).toLocaleString()} try another date.`
        );
        return;
      }
    }

    if (start && start > minDate && start < maxDate) {
      if (end && end > minDate && end < maxDate) {
        setIsInvalidDate(false);
        setChanged(true);
        setEndDate(end);
      }
      setStartDate(start);
      return;
    }
    setIsInvalidDate(true);
    alert(
      `This date is in used!!! try less than ${new Date(maxDate).toLocaleString()} .`
    );
  };
  const handleChangeDay = event => {
    let val = event.target.value ? Number(event.target.value) : "";
    if (!isNaN(val) && val <= 365 && val >= 0) {
      setDay(val);
    }
    else setDay(0);
  };
  const handleChangeHour = event => {
    let val = event.target.value ? Number(event.target.value) : "";
    if (!isNaN(val) && val <= 23 && val >= 0) {
      setHour(val);
    }
    else setHour(0);
  };
  const handleChangeMinute = event => {
    let val = event.target.value ? Number(event.target.value) : "";
    if (!isNaN(val) && val <= 59 && val >= 0) {
      setMinute(val);
    }
    else setMinute(0);
  };
  const handleChangeSecond = event => {
    let val = event.target.value ? Number(event.target.value) : "";
    if (!isNaN(val) && val <= 59 && val >= 0) {
      setSecond(val);
    }
    else setSecond(0);
  };
  const selectFileHandler = event => {
    setSelectedFile(event.target.files[0]);
  };
  const deleteFile = i => {
    setFiles( files.filter((v, ind) => ind !== i) );
    setChanged(true);
  };
  const resetForm = () => {
    const form = document.getElementById("form");
    if(form)
    {
      form.reset();
    }
    if(cancel)
    { 
      cancel();
    }
    setUploadPercentage("");
    setSelectedFile(null);
    setMultiply(1);
    setUploadFileItem(null);
  };
  const fileUploadHandler = event => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("file", selectedFile);
    uploadFile(formData, setUploadFileItem, setUploadPercentage);
  };
  const checkBoxHandleChange = name => event => {
    if ((check.checked1 && !check.checked2 && name === "checked3") ||
        (check.checked3 && !check.checked2 && name === "checked1")) 
    {
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
    if (screenArr.indexOf(parseInt(name.split("")[name.length - 1])) === -1) 
    {
      setScreen([...screenArr, parseInt(name.split("")[name.length - 1])].sort((a, b)=> a-b) );
    } 
    else if (screenArr.indexOf(parseInt(name.split("")[name.length - 1])) !== -1) 
    {
      screenArr.splice(screenArr.indexOf(parseInt(name.split("")[name.length - 1])), 1);
      setScreen([...screenArr].sort((a, b)=> a-b));
    }
  };
  const handleChangeOrder = event => {
    setOrderTemp(event.target.value);
  };
  const handleMultiply = event => {
    const val = event.target.value;
    if(val>=1) {
      setMultiply(val);
    }
    else setMultiply(1);
  };
  const ordering = (screen, files, tempOrder) => {
    files.forEach((file, i) => {
      if (file.screen.indexOf(screen) !== -1) {
        let o = file.order;
        if (file.order === tempOrder) {
          o++;
          file.screen.forEach(scr => {
            ordering(scr, files, o)
          });
        }
        let arr = order[`order${screen}`];
        arr.push(o);
        setOrder({ ...order, [`order${screen}`]: [...arr] });
        files[i] = { ...file, order: o };
      }
    });
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
        ordering(s, tempFiles, orderTemp);
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
      ].sort((a, b)=> a.order-b.order));
    }
      setDuration(0);
      setChanged(true);
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
    
  };

  const strDay = formatTime("d",day);
  const strHour = formatTime("h",hour);
  const strMinute = formatTime("m",minute);
  const strSecond = formatTime("s",second);

  return branchId ? (
    <div className="createPlaylist">
      <div className="head">
        <span>{playlist ? "Update" : "Create Playlist" }</span>
        {playlist && 
          <span className="copyStyle">
            <IconButton
              aria-label="Copy"
              onClick={() => copyHandleClick(playlist)}
              title="Copy"
              style={{ padding: "3px" }}
            >
              <FileCopyIcon fontSize="small" />
            </IconButton>
          </span>
        }
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
                timeFormat={'HH:mm'}
                startDate={startDate ? new Date(startDate) : ""}
                endDate={endDate ? new Date(endDate) : ""}
                onChange={dateTimeRangePickerChange}
                className="centerByFlex dateRangeClass"
              />
              <label style={{color: "#fff"}}> Currency
                <input type="checkbox" name="currency" checked={currency} className="margin05"
                      onChange={handleChangeCurrency} />
              </label>
              <label style={{color: "#fff"}}> Ticker
                <input type="checkbox" name="ticker" checked={ticker} className="margin05"
                      onChange={handleChangeTicker} />
              </label>
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
                  <div className="centerByFlex">
                    {uploadFileItem && uploadFileItem.mimetype.split("/")[0]==="video" &&
                    <>
                      <span>{convertSecondsIntoString(duration)}x</span>
                      <input
                        className="multiply"
                        placeholder="X"
                        type="number"
                        title="X"
                        min="1"
                        onChange={handleMultiply}
                        value={multiply}
                       />
                    </>
                    }
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
                      placeholder="min"
                      type="number"
                      title="minute"
                      min="0"
                      max="59"
                      onChange={handleChangeMinute}
                      value={minute}
                    />
                    <input
                      placeholder="sec"
                      type="number"
                      title="second"
                      min="0"
                      max="59"
                      onChange={handleChangeSecond}
                      value={second}
                    />
                  </div>
                  <span >
                    {`${strDay} ${strHour} ${strMinute} ${strSecond} `}
                  </span>
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
                <div className="spaceBetWeen" style={{ margin: "0.5rem 0",padding: "0 0.4rem" }}>
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
                <>
                  <div className="fileContainer">
                    {uploadFileItem.mimetype.split("/")[0] === "video" && (
                      <video controls preload="metadata" onLoadedMetadata={handleMetadata}>
                        <source src={uploadFileItem.path} type={uploadFileItem.mimetype} />
                        Your browser does not support the video tag.
                      </video>
                      
                    )}
                    {uploadFileItem.mimetype.split("/")[0] === "image" && (
                      <img src={uploadFileItem.path} alt={uploadFileItem.filename}/>
                    )}
                    <div>{formatBytes(uploadFileItem.size)}</div>  
                  </div>          
                </>
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
                <div className="allListLinkContainer fileList">
                  <p className="head">File List</p>

                  <ol className="list listHeight">
                    {files.length > 0
                      ? files.map((file, i) => (
                          <li className="playlistLink" key={i}>
                            <div>
                              <div style={{fontWeight: "bold"}}>
                                [{i + 1}]. {file.name} 
                              </div>
                              <div className="spaceBetWeen">
                                <div className="takitox">
                                  <span>
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
                                  </span>
                                  <span className="fileLi">
                                    Time: <span style={{fontWeight: "bold"}}>{convertSecondsIntoString(file.showTime)}</span>.
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
                  </ol>
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
        {playlist? "Update" :"Create"}
      </Button>
    </div>
  ) : (
    <h1 className="centerByFlex">Loading...</h1>
  );
};

export default withRouter(CreatePlaylist);
