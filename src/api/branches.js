import axios from "axios";
import baseUrl from "./index";
import AlertMe from "../components/ConfirmAlert/AlertMe";

export function getAllBranches(setBranches)
{
	axios
		.get(baseUrl + "/branches/", {})
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
		.get(baseUrl + "/branches/" + id, {})
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
		.post(baseUrl + "/branches/", {
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
		.delete(baseUrl + "/branches/" + id)
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
		.put(baseUrl + "/branches/" + id, {
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
