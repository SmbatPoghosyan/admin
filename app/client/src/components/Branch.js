import React, {useEffect} from "react"
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import Icon from '@material-ui/core/Icon';
import {deleteBranch} from '../../api/branches';
import {updateBranch} from '../../api/branches';
import Input from '@material-ui/core/Input';

import "./branch.css"
import Button from "@material-ui/core/Button";
import {TextField} from "@material-ui/core";
import MenuItem from "@material-ui/core/MenuItem";



const useStyles = makeStyles(theme => ({
  margin: {
    margin: theme.spacing(0),
  },
  extendedIcon: {
    marginRight: theme.spacing(0),
  }
}));


const Branch = ({branch, setBranches}) => {
    const classes = useStyles();
    const [name, setName] = React.useState(branch.name);
    const [edit, setEdit] = React.useState(true);
    const [screens, setScreens] = React.useState(branch.screens);
    const handleDelete = () => {
        deleteBranch(branch._id, setBranches);
    };
    const handleEdit = () => {
        setEdit(false);
    };

    const onEdit = () => {
        updateBranch(branch._id, name, screens, setBranches);
        setEdit(true);
    };

    const handleChangeName = (event) => {
        setName(event.target.value);
    };
    const handleChangeScreens = event => {
        setScreens(event.target.value);
    };
    return ( 
    <div className="branchContainer">
        <div className="nameidcont">
            <div style={{display:"inline-block",flex: "1"}}>
                <Input className="brancheName" disabled={edit} value={name} onChange={handleChangeName}/>
                <p className="brancheId" title={`id: ${branch._id}`}>{branch._id}</p>
            </div>
            
            <div className="iconsContainer">
                <IconButton  onClick={handleEdit} aria-label="Edit" title="Edit" >
                    <Icon fontSize="small">edit_icon</Icon>
                </IconButton>
            </div>
            <div className="iconsContainer">
                <IconButton aria-label="Delete" onClick={handleDelete} className={classes.margin} title="Delete">
                    <DeleteIcon fontSize="small"/>
                </IconButton>
            </div>
        </div>
        <TextField className="brancheScreen" select disabled={edit} value={screens} onChange={handleChangeScreens}>
            {[1,2,3].map(option => (
                <MenuItem key={option} value={option}>
                    {option}
                </MenuItem>
            ))}
        </TextField>
        {!edit && <Button variant="contained" color="primary" onClick={onEdit}>Save</Button>}
    </div>  
    );

};

export default Branch;