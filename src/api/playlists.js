import axios from "axios";
import { apiURL } from "../env";
import AlertMe from "../components/ConfirmAlert/AlertMe";

export function getAllBranchePlaylists(branchId, setPlaylists)
{
	axios.get(apiURL + "/playlists/" + branchId, {})
		.then(response =>
		{
			setPlaylists(response.data);
		})
		.catch(error =>
		{
			console.error(error.message);
		});
}

export function getPlaylistById(branchId, paylistId, setPlaylist, setFiles, callBack)
{
	axios.get(apiURL + "/playlists/" + branchId + "/" + paylistId, {})
		.then(response =>
		{
			setPlaylist(response.data.playlist);
			setFiles(response.data.files);
		})
		.catch(error =>
		{
			console.error(error.message);
			callBack();
		});
}

export function createBranchPlaylist(branchId, playlistInfo, setPlaylists, callBack)
{
	axios.post(apiURL + "/playlists/" + branchId, {
		...playlistInfo
	})
		.then(response =>
		{
			if (setPlaylists)
			{
				getAllBranchePlaylists(branchId, setPlaylists);
				AlertMe(response.data.message);
			}
		})
		.catch(error =>
		{
			AlertMe(error.message);
		})
		.finally(() =>
		{
			callBack();
		});
}

export function deletePlaylist(playlistId, branchId, setPlaylists, callBack)
{
	axios.delete(
		apiURL + "/playlists/" + playlistId)
		.then(response =>
		{
			getAllBranchePlaylists(branchId, setPlaylists);
			AlertMe(response.data.message);
		})
		.catch(error =>
		{
			AlertMe(error.message);
		})
		.finally(() =>
		{
			callBack();
		});
}

export function updatePlaylist(playlistId, branchId, playlistInfo, setPlaylists, callBack)
{
	axios.put(apiURL + "/playlists/" + playlistId, {
		...playlistInfo
	})
		.then(response =>
		{
			getAllBranchePlaylists(branchId, setPlaylists);
			AlertMe(response.data.message);
		})
		.catch(error =>
		{
			console.log(error);
			AlertMe(error.message);
		})
		.finally(() =>
		{
			callBack();
		});
}
