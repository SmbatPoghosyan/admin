import axios from "axios";
import baseUrl from "./index";

export function getAllBranchePlaylists(branchId, setPlaylists)
{
	axios.get(baseUrl + "/playlists/" + branchId, {})
		.then(response =>
		{
			setPlaylists(response.data);
		})
		.catch(error =>
		{
			alert(error.message);
		});
}

export function getPlaylistById(branchId, paylistId, setPlaylist, setFiles)
{
	axios.get(baseUrl + "/playlists/" + branchId + "/" + paylistId, {})
		.then(response =>
		{
			setPlaylist(response.data.playlist);
			setFiles(response.data.files);
		})
		.catch(error =>
		{
			alert(error.message);
		});
}

export function createBranchPlaylist(branchId, playlistInfo, setPlaylists)
{
	axios.post(baseUrl + "/playlists/" + branchId, {
		...playlistInfo
	})
		.then(response =>
		{
			if (setPlaylists)
			{
				getAllBranchePlaylists(branchId, setPlaylists);
			}
		})
		.catch(error =>
		{
			alert(error.message);
		});
}

export function deletePlaylist(playlistId, branchId, setPlaylists, callBack)
{
	axios.delete(
		baseUrl + "/playlists/" + playlistId)
		.then(response =>
		{
			getAllBranchePlaylists(branchId, setPlaylists);
			alert(response.data.message);
		})
		.catch(error =>
		{
			alert(error.message);
		})
		.finally(() =>
		{
			callBack();
		});
}

export function updatePlaylist(playlistId, branchId, playlistInfo, setPlaylists, callBack)
{
	axios.put(baseUrl + "/playlists/" + playlistId, {
		...playlistInfo
	})
		.then(response =>
		{
			getAllBranchePlaylists(branchId, setPlaylists);
			alert(response.data.message);
		})
		.catch(error =>
		{
			console.log(error);
			alert(error.message);
		})
		.finally(() =>
		{
			callBack();
		});
}
