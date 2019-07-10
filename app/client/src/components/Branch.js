import React from "react"
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import Icon from '@material-ui/core/Icon';

import "./branch.css"



const useStyles = makeStyles(theme => ({
  margin: {
    margin: theme.spacing(0),
  },
  extendedIcon: {
    marginRight: theme.spacing(0),
  }
}));


const Branch = ({branch}) => {
    const classes = useStyles();
    return ( 
    <div className="branchContainer">
        <div className="nameidcont">
            <div style={{display:"inline-block",flex: "1"}}>
                <p className="brancheName" title={branch.name}>{branch.name}</p>
                <p className="brancheId" title={`id: ${branch._id}`}>{branch._id}</p>
            </div>
            
            <div className="iconsContainer">
                <IconButton color="disabled" aria-label="Edit" title="Edit" >
                    <Icon fontSize="small">edit_icon</Icon>
                </IconButton>
            </div>
            <div className="iconsContainer">
                <IconButton aria-label="Delete" className={classes.margin} title="Delete">
                    <DeleteIcon fontSize="small" />
                </IconButton>
            </div>
            

            
        </div>
        <p className="brancheScreen" title={"Screen"}>{branch.screens}</p>
    </div>  
    );

};

export default Branch;