import React, {useEffect, useState} from "react"
import Branch from "./Branch";
import {getAllBranches} from '../../api/branches';
import {createBranch} from '../../api/branches';
import "./branches.css";
import Button from '@material-ui/core/Button';
import Modal from "@material-ui/core/Modal";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import { makeStyles } from "@material-ui/core/styles";

function rand() {
    return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
    const top = 50 + rand();
    const left = 50 + rand();

    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`,
    };
}

const useStyles = makeStyles(theme => ({
    paper: {
        position: 'absolute',
        width: 400,
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 4),
        outline: 'none',
    },
}));


const Branches = () => {
    const classes = useStyles();
    const [modalStyle] = React.useState(getModalStyle);
    const[branches, setBranches] = useState([]);
    const [open, setOpen] = React.useState(false);
    const [name, setName] = React.useState('Branch Name');
    const [screens, setScreens] = React.useState(1);

    const handleChangeName = (event) => {
        setName(event.target.value);
    };
    const handleChangeScreens = event => {
        setScreens(event.target.value);
    };
    const onCreateBranch = () => {
      createBranch(name, screens, setBranches, handleClose);
    };
    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    useEffect(() => {
        getAllBranches(setBranches);
    },[]);

    return branches.length > 0 && ( 
    <div className="allBranchesContainer">
        <Button variant="contained" color="primary" onClick={handleOpen}>
            Create
        </Button>
       {
           branches.map((el,i) => <Branch setBranches={setBranches} key={i} branch={el} />)
       }
        <Modal
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
            open={open}
            onClose={handleClose}
        >
            <div style={modalStyle} className={classes.paper}>
                <h2 id="modal-title">Create branch</h2>
                <TextField
                    id="branch-name"
                    label="Name"
                    value={name}
                    onChange={handleChangeName}
                    margin="normal"
                    className="mg-16"
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
                    {[1,2,3].map(option => (
                        <MenuItem key={option} value={option}>
                            {option}
                        </MenuItem>
                    ))}
                </TextField>
                <Button  variant="contained" color="primary" onClick={onCreateBranch}>
                    Create
                </Button>
            </div>
        </Modal>
    </div>
    );

};

export default Branches;