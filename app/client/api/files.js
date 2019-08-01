import axios from "axios";

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
      }
    })
    .then(response => {
      console.log("kayf", response.data);
      setUploadFileItem({
        ...response.data,
        path: "http://localhost:8000/files/" + response.data.filename
      });
    })
    .catch(error => {
      alert(error.message);
    });
}
