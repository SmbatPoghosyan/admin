import React, {useState} from "react";
import {Link, withRouter} from "react-router-dom";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import {createUser} from "../../api/users";

const Profile = (props) =>
{
  const user = localStorage.getItem("user");
  const [openCreateAdmin, setOpenCreateAdmin] = useState(false);

  return (
    <div style={{width: "100%",display: "flex",flexDirection: "column"}}>
      <div style={{
        padding: "0.5rem",
        height: 30,
        display: "flex",
        alignItems: "center"
      }}>
        <Link to={"/branches"} style={{height: 30}}>
          Home
        </Link>
      </div>
      <div style={{flex: 1, padding: "0.5rem"}}>
        {
          user === "superadmin" ? (
            <Button style={{marginRight: 10}}
              onClick={() => setOpenCreateAdmin(openCreateAdmin => !openCreateAdmin)}
            >
              Create User
            </Button>
          ): null
        }
        <Button>Change Password</Button>
        <div style={{textAlign: "center",height: "100%"}}>
          {
            openCreateAdmin ? (
              <div style={{
                maxWidth: 450,
                margin: "20px auto 0 auto",
                padding: 24,
                border: "1px solid black"
              }}>
                <Typography component="h1" variant="h5">
                  Create User
                </Typography>
                <form noValidate onSubmit={createAdmin}>
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="username"
                    label="Username"
                    name="username"
                    autoFocus
                    autoComplete={"username"}
                  />
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete={"new-password"}
                  />
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                  >
                    Create User
                  </Button>
                </form>
              </div>
            ): null
          }
        </div>
      </div>
    </div>
  );

  function createAdmin(event)
  {
    event.preventDefault();
    const username = event.target.username.value || "";
    const password = event.target.password.value || "";
    if (username && password)
    {
      createUser(username, password, ()=>{},() =>
      {
        props.history.push("/branches");
      });
    }
  };
}

export default withRouter(Profile);
