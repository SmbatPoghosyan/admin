import axios from "axios";

export function uploadFile(formData, setFile, setUploadPercentage) {
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
      setFile({
        name: response.data.filename,
        path: "http://localhost:8000/files/" + response.data.filename
      });
    })
    .catch(error => {
      alert(error.message);
    });
}
