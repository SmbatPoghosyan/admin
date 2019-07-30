import axios from "axios";

export function createPlaylistFile(formData, setFiles, setUploadPercentage) {
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
      }
    })
    .then(response => {
      console.log("kayf", response.data);
      setFiles({
        name: response.data.filename,
        path: response.data.destination
      });
    })
    .catch(error => {
      alert(error.message);
    });
}
