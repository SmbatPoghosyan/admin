import React, {useEffect, useState} from "react";
import {createBranch, getAllBranches} from "../api/branches";
import "./css/branches.css";
import Button from "@material-ui/core/Button";
import Modal from "@material-ui/core/Modal";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import {makeStyles} from "@material-ui/core/styles";
import {Link} from "react-router-dom";
import Branch from "./Branch";
import {withRouter} from "react-router";
import Loader from "./Loader";
import AlertMe from "./ConfirmAlert/AlertMe";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import ProfileImg from "../images/profile.png";

function getModalStyle()
{
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

const Branches = props =>
{
    const [branches, setBranches] = useState(null);
    const classes = useStyles();
    const [modalStyle] = useState(getModalStyle);
    const [open, setOpen] = useState(false);
    const [name, setName] = useState("name");
    const [screens, setScreens] = useState(1);
    const user = localStorage.getItem("user");
    if (!user)
    {
        props.setUser("");
    }

    useEffect(() =>
    {
        getAllBranches(setBranches);
    }, []);

    const handleChangeName = event =>
    {
        setName(event.target.value);
    };
    const handleChangeScreens = event =>
    {
        setScreens(event.target.value);
    };

    const handleOpen = () =>
    {
        setOpen(true);
    };
    const handleClose = () =>
    {
        setOpen(false);
        setName("name");
        setScreens(1);
    };

    const onCreateBranch = () =>
    {
        if (name)
        {
            createBranch(name, screens, setBranches, handleClose);
        } else
        {
            AlertMe("The \"Name\" field is empty ,please type branch name !!!");
        }
    };
    return branches ? (
        <>
            <Modal
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 350,
                }}
            >
                <Fade in={open}>
                    <div style={modalStyle} className={classes.paper}>
                        <h1 id="modal-title"> Create branch </h1>
                        <TextField
                            id="branch-name"
                            label="Name"
                            value={name}
                            placeholder={"Branch Name"}
                            onChange={handleChangeName}
                            margin="normal"
                            className="mg-16"
                            helperText={"The \"Name\" field is required*"}
                            error={name.length === 0}
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
                        <Button variant="contained" onClick={onCreateBranch}
                                style={{margin: "0 auto", display: "flex"}}>
                            Save New
                        </Button>
                    </div>
                </Fade>
            </Modal>

            <>
                <Button variant="contained" onClick={handleOpen}>
                    Create
                </Button>
                <div className="allListLinkContainer">
                    <p className="head">Branches</p>
                    <ul className="list">
                        {branches?.map((el, i) => (
                            <li key={i}>
                                <p>
                                    <Link to={`/branches/${el._id}`}>{el.name}</Link>
                                    <span>{i + 1}</span>
                                </p>
                                <hr/>
                            </li>
                        ))}
                    </ul>
                </div>
            </>

            {branches?.length > 0 && (
                <div className="allBranchesContainer">
                    <div style={{padding: "0.5rem", textAlign: "left"}}>
                        <Link to={"/profile"} style={{textDecoration: "none"}}>
                            <Button style={{height: 30, textTransform: "none"}}>
                                <img src={ProfileImg} alt={"profile"} style={{width: 20, height: 20, marginRight: 8}}/>
                                {user}
                            </Button>
                        </Link>
                    </div>
                    {branches.map((el, i) => (
                        <Branch branch={el} setBranches={setBranches} key={i}/>
                    ))}
                </div>
            )}
        </>
    ) : <Loader/>;
};

export default withRouter(Branches);
