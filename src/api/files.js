import axios from "axios";
import { apiURL } from "../env";
import AlertMe from "../components/ConfirmAlert/AlertMe";
const CancelToken = axios.CancelToken;
export let cancel;

export function uploadFile(formData, setUploadFileItem, setUploadPercentage)
{
	axios
		.post(apiURL + "/upload/", formData, {
			headers: {
				"Content-Type": "multipart/form-data"
			},
			onUploadProgress: progressEvent =>
			{
				setUploadPercentage(
					parseInt(
						Math.round((progressEvent.loaded * 100) / progressEvent.total)
					)
				);
			},
			cancelToken: new CancelToken(function executor(c)
			{
				cancel = c;
			})
		})
		.then(response =>
		{
			console.log("file", response.data);
			setUploadFileItem({
				...response.data,
				path: apiURL + "/files/" + response.data.filename
			});
		})
		.catch(error =>
		{
			if (axios.isCancel(error))
			{
				console.log("Request canceled", error.message);
				AlertMe("Upload canceled");
				setUploadPercentage("");
			} else
			{
				AlertMe(error.message);
			}
		});
}
