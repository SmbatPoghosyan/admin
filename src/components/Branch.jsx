import React, {useEffect, useState} from "react";
import {makeStyles} from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import Icon from "@material-ui/core/Icon";
import {deleteBranch, updateBranch} from "../api/branches";
import Input from "@material-ui/core/Input";
import "./css/branch.css";
import Button from "@material-ui/core/Button";
import {TextField} from "@material-ui/core";
import MenuItem from "@material-ui/core/MenuItem";
import {withRouter} from "react-router";
import Confirmation from "./ConfirmAlert/Confirm";

const useStyles = makeStyles(theme => ({
	margin: {
		margin: theme.spacing(0)
	},
	extendedIcon: {
		marginRight: theme.spacing(0)
	}
}));

const Branch = props =>
{
	const {branch, setBranches} = props;
	const classes = useStyles();
	const [name, setName] = useState(branch.name);
	const [edit, setEdit] = useState(false);
	const [screens, setScreens] = useState(branch.screens);

	useEffect(() =>
	{
		setName(props.branch.name);
		setScreens(props.branch.screens);
	}, [props, edit]);

	const handleDelete = () =>
	{
		Confirmation("Are you sure to delete the branch?", deleteBranch, [branch._id, setBranches]);
	};
	const handleEdit = () =>
	{
		setEdit(true);
	};
	const onEdit = () =>
	{
		updateBranch(branch._id, name, screens, setBranches);
		setEdit(false);

	};
	const onCancel = () =>
	{
		setEdit(false);
	};
	const handleChangeName = event =>
	{
		setName(event.target.value);
	};
	const handleChangeScreens = event =>
	{
		setScreens(event.target.value);
	};
	const handleClickBranch = event =>
	{
		props.history.push(`/branches/${branch._id}`);
	};

	return (
		<div className={`branchContainer ${edit ? "editModeCont" : ""}`}
			 style={{border: `1px solid ${edit ? "#236498" : "#969494"}`}}
		>
			<div className="nameidcont">
				<div className="branchName">
					<Input
						className={`${edit ? "editMode" : ""}`}
						disabled={!edit}
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
						<DeleteIcon fontSize="small"/>
					</IconButton>
				</div>
			</div>
			<div className="branchFooter">
				{edit ? (
					<span className="branchButtons">
						<Button variant="contained" size="small" onClick={onEdit}>
							Save
						</Button>
						<Button variant="contained" size="small" onClick={onCancel}>
							Cancel
						</Button>
					</span>
				) : (
					<Button size="small" variant="contained" onClick={handleClickBranch}>
						Open
					</Button>
				)}
				<TextField
					className={`brancheScreen ${edit ? "editMode" : ""}`}
					select
					disabled={!edit}
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
