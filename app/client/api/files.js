import axios from "axios";
const CancelToken = axios.CancelToken;
export let cancel;

export function uploadFile(formData, setUploadFileItem, setUploadPercentage) {
  axios
    .post("http://localhost:8000/upload/", formData, {
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
        path: "http://localhost:8000/files/" + response.data.filename
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
