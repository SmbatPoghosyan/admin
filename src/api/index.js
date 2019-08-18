let baseUrl = "http://localhost:8000";

if (process.env.NODE_ENV === "production") {
  baseUrl = "https://mighty-sierra-48879.herokuapp.com";
}

export default baseUrl;
