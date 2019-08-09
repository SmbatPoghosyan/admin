import axios from "axios";
const CancelToken = axios.CancelToken;
export let cancel;

export function uploadFile(formData, setUploadFileItem, setUploadPercentage) {
  axios
    .post("https://mighty-sierra-48879.herokuapp.com/upload/", formData, {
      headers: {
        "Content-Type": "multipart/form-data"
      },
      onUploadProgress: progressEvent => {
        setUploadPercentage(
          parseInt(
            Math.round((progressEvent.loaded * 100) / progressEvent.total)
          )
        );
      },
      cancelToken: new CancelToken(function executor(c) {
        cancel = c;
      })
    })
    .then(response => {
      console.log("kayf", response.data);
      setUploadFileItem({
        ...response.data,
        path: "https://mighty-sierra-48879.herokuapp.com/files/" + response.data.filename
      });
    })
    .catch(error => {
      if (axios.isCancel(error)) {
        console.log("Request canceled", error.message);
        alert("Upload canceled");
        setUploadPercentage("");
      } else {
        alert(error.message);
      }
    });
}
