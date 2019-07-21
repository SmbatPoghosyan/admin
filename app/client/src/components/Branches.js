import React, { useEffect, useState } from "react";
import { createBranch, getAllBranches } from "../../api/branches";
import "./css/branches.css";
import Button from "@material-ui/core/Button";
import Modal from "@material-ui/core/Modal";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import { makeStyles } from "@material-ui/core/styles";
import { BrowserRouter as Router, Route, Link, Switch,Redirect } from "react-router-dom";
import Branch from "./Branch";

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`
  };
}

const useStyles = makeStyles(theme => ({
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 4),
    outline: "none"
  }
}));

const Branches = props => {

  const [branches, setBranches] = useState([]);
  
  const classes = useStyles();
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);
  const [name, setName] = React.useState("Branch Name");
  const [screens, setScreens] = React.useState(1);


  useEffect(() => {
    getAllBranches(setBranches);
  }, []);

  
  const handleChangeName = event => {
    setName(event.target.value);
  };
  const handleChangeScreens = event => {
    setScreens(event.target.value);
  };
  const onCreateBranch = () => {
    if(name) {
      setName("Branch Name");
      setScreens(1);
      createBranch(name, screens, setBranches, handleClose);
    }
    else{
      alert(`The "Name" field is empty ,please type branch name !!!`);
    }
  };
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Modal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={open}
        onClose={handleClose}
      >
        <div style={modalStyle} className={classes.paper}>
          <h1 id="modal-title"> Create branch </h1>
          <TextField
            id="branch-name"
            label="Name"
            value={name}
            onChange={handleChangeName}
            margin="normal"
            className="mg-16"
            helperText={`The "Name" field is required*`}
            error={name.length !== 0 ? false : true}
          />
          <TextField
            id="select-screens"
            select
            label="Select"
            value={screens}
            onChange={handleChangeScreens}
            helperText="Please select screens count"
            margin="normal"
            className="mg-16"
          >
            {[1, 2, 3].map(option => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </TextField>
          <Button variant="contained" onClick={onCreateBranch}>
            Create
          </Button>
        </div>
      </Modal>

      
      <>
        <Button variant="contained" onClick={handleOpen}>
          Create
        </Button>
        <div className="allListLinkContainer">
          <p className="head">Branches</p>
          <ul className="list">
            {branches.map((el, i) => (
              <li key={i}>
                <p>
                  <Link to={`/branches/${el._id}`} >{el.name}</Link>
                  <span>{i+1}</span>
                </p>
                <hr />
              </li>
            ))}
          </ul>
        </div>
      </>
      
      {branches.length > 0 && (
        <div className="allBranchesContainer">
          {branches.map((el, i) => (
            <Branch branch={el} setBranches={setBranches} key={i} />
          ))}
        </div>
      )}
    </>
  );
};

export default Branches;
