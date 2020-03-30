import axios from "axios";
import {apiURL} from "../env";
import AlertMe from "../components/ConfirmAlert/AlertMe";

export function getAllBranches(setBranches)
{
	axios
		.get(apiURL + "/branches/", {})
		.then(response =>
		{
			setBranches(response.data);
		})
		.catch(error =>
		{
			console.error(error.message);
		});
}

export function getBranchById(id, setBranch, setPlaylists, getBack)
{
	axios
		.get(apiURL + "/branches/" + id, {})
		.then(response =>
		{
			setBranch(response.data.branch);
			setPlaylists(response.data.playlists);
		})
		.catch(error =>
		{
			console.error("Wrong Id " + error.message);
			getBack();
		});
}

export function createBranch(name, screens, setBranches, handleClose)
{
	const token = localStorage.getItem("token");
	axios
		.post(apiURL + "/branches/", {
			name,
			screens,
			token
		})
		.then(response =>
		{
			getAllBranches(setBranches);
			handleClose();
			AlertMe(response.data.message);
		})
		.catch(error =>
		{
			handleClose();
			AlertMe(error.message);
		});
}

export function deleteBranch(id, setBranches)
{
	const token = localStorage.getItem("token");
	axios
		.delete(apiURL + "/branches/" + id + "?token=" + token)
		.then(response =>
		{
			getAllBranches(setBranches);
			AlertMe(response.data.message);
		})
		.catch(error =>
		{
			AlertMe(error.message);
		});
}

export function updateBranch(id, name, screens, setBranches)
{
	const token = localStorage.getItem("token");
	axios
		.put(apiURL + "/branches/" + id, {
			name,
			screens,
			token
		})
		.then(response =>
		{
			getAllBranches(setBranches);
			AlertMe(response.data.message);
			localStorage.setItem("screens", screens);
		})
		.catch(error =>
		{
			console.log("errrrr", error.message);
			AlertMe(error.message);
		});
}
