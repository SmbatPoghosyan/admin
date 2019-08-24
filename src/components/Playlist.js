import React, { useState,useEffect } from "react";
import "./css/playlist.css";
import { getPlaylistById, updatePlaylist } from "../api/playlists";
import { Link } from "react-router-dom";
import DatetimeRangePicker from "react-datetime-range-picker";
import Input from "@material-ui/core/Input";
import Button from "@material-ui/core/Button";

const Playlist = props => {

  const playlistId = props.match.params.id;
  const { branchId, setPlaylists,disabledDates } = props;
  const [files,setFiles] = useState();
  const [playlist,setPlaylist] = useState();

  const [name, setName] = useState("");
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();

  const [enableSave,setEnableSave] = useState(false);

  const handleChangeName = event => {
    setName(event.target.value);
    setEnableSave(true);
  };

  useEffect(()=> {
    if(playlist) 
    {
      setName(playlist.name);
      setStartDate(playlist.startDate);
      setEndDate(playlist.endDate);
    }
  },[playlist]);

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
        setEnableSave(false);
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
        setEnableSave(true);
        setEndDate(end);
      }
      setStartDate(start);
      return;
    }
    setEnableSave(false);
    alert(
      `This date is in used!!! try less than ${new Date(
        maxDate
      ).toLocaleString()} .`
    );
  };

  const savePlaylistHandler = () => {
    const playlistObj = {
      name,
      endDate,
      startDate,
      currency: false,
      ticker: false,
      files: JSON.stringify([...files])
    };
    updatePlaylist(playlistId,branchId, playlistObj, setPlaylists);

    setName("");
    setStartDate(new Date());
    setEndDate(new Date());
    setFiles([]);
    setEnableSave(false);
  };

  useEffect(()=>{
    getPlaylistById(branchId,playlistId,setPlaylist,setFiles);
  },[branchId,playlistId]);
  
  return playlist ? (
      <div className="playlistContainer">
        <div className="head">
          <span>{playlist.name}</span>
          <Link to={`/branches/${branchId}/`}>
            <i className="close" />
          </Link>
        </div>
        <div className="playlistBody">
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
                startDate={startDate}
                endDate={endDate}
                onChange={dateTimeRangePickerChange}
                className="centerByFlex dateRangeClass"
              />
            </div>
          </div>
          <Button
            variant="contained"
            onClick={savePlaylistHandler}
            className={`createButton ${!enableSave ? "buttonDisabled" : ""}`}
            disabled={!enableSave}
          >
            Save
          </Button>
        </div>
      </div>
    ): (
      <h1 className="centerByFlex">Loading...</h1>
    );
};

export default Playlist;
