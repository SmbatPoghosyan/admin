import axios from "axios";
import { apiURL } from "../env";
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
	axios
		.post(apiURL + "/branches/", {
			name,
			screens
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
	axios
		.delete(apiURL + "/branches/" + id)
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
	axios
		.put(apiURL + "/branches/" + id, {
			name,
			screens
		})
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
