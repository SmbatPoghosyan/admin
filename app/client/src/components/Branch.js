import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import Icon from "@material-ui/core/Icon";
import { deleteBranch } from "../../api/branches";
import { updateBranch } from "../../api/branches";
import Input from "@material-ui/core/Input";
import "./css/branch.css";
import Button from "@material-ui/core/Button";
import { TextField } from "@material-ui/core";
import MenuItem from "@material-ui/core/MenuItem";
import { withRouter } from 'react-router';

const useStyles = makeStyles(theme => ({
  margin: {
    margin: theme.spacing(0)
  },
  extendedIcon: {
    marginRight: theme.spacing(0)
  }
}));

const Branch = (props) => {
  const { branch, setBranches } = props;
  const classes = useStyles();
  const [name, setName] = React.useState(branch.name);
  const [edit, setEdit] = React.useState(true);
  const [screens, setScreens] = React.useState(branch.screens);


  useEffect(()=> {
    setName(props.branch.name);
    setScreens(props.branch.screens);
  },[props]);

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
  const onCancel = () => {
    setEdit(true);
  };
  const handleChangeName = event => {
    setName(event.target.value);
  };
  const handleChangeScreens = event => {
    setScreens(event.target.value);
  };
  const handleClickBranch = event => {
    props.history.push(`/branches/${branch._id}`);
  };

  return (
   <div className="branchContainer" >  
      <div className="nameidcont">
        <div className="branchName">
          <Input
            disabled={edit}
            value={name}
            title={name}
            onChange={handleChangeName}
          />
          <p className="brancheId" title={`id: ${branch._id}`}>
            {branch._id}
          </p>
        </div>
        <div className="iconsContainer">
          <IconButton onClick={handleEdit} aria-label="Edit" title="Edit">
            <Icon fontSize="small">edit_icon</Icon>
          </IconButton>
        </div>
        <div className="iconsContainer">
          <IconButton
            aria-label="Delete"
            onClick={handleDelete}
            className={classes.margin}
            title="Delete"
          >
            <DeleteIcon fontSize="small" />
          </IconButton>
        </div>
      </div>
      <div className="branchFooter" >
        {!edit ? (
          <span className="branchButtons">
            <Button
              variant="contained"
              size="small"
              onClick={onEdit}
            > Save </Button>
            <Button
              variant="contained"
              size="small"
              onClick={onCancel}
            > Cancel </Button>
          </span>
          ): <Button size="small" variant="contained" onClick={handleClickBranch}>Open</Button> 
        }
        <TextField
          className="brancheScreen"
          select
          disabled={edit}
          title="Screen"
          value={screens}
          onChange={handleChangeScreens}
        >
        {[1, 2, 3].map(option => (
            <MenuItem key={option} dense={false} value={option}>
              {option}
            </MenuItem>
          ))}
        </TextField>
      </div>
    </div>
  );
};

export default withRouter(Branch);
