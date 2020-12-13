import React, {useState} from "react";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import {updateUser} from "../../../api/users";

const EditUser = (props) =>
{
    const [processing, setProcessing] = useState(false);
    const [enableChangePassword, setEnableChangePassword] = useState(false);

    const [userName, setUserName] = useState(props.user?.username || "");
    const [password, setPassword] = useState("");
    const [oldPassword, setOldPassword] = useState("");


    const changeObj = {};

    if (userName !== props.user?.username)
    {
        changeObj.username = userName;
    }

    if (enableChangePassword && oldPassword && password)
    {
        changeObj.oldpassword = oldPassword;
        changeObj.password = password;
    }

    return (
        <div style={{
            maxWidth: 450,
            margin: "0 auto",
            padding: 24,
            border: "1px solid black"
        }}>
            <Typography component="h1" variant="h5">
                Edit User
            </Typography>
            <form noValidate onSubmit={editUser}>
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="username"
                    label="Username"
                    name="username"
                    autoFocus
                    onChange={(e) => setUserName(e.target.value)}
                    value={userName}
                    autoComplete={"username"}
                />
                <div style={{margin: "10px 0"}}>
                    <label>Change Password </label>
                    <input
                        id={"enableChangePassword"}
                        type={"checkbox"}
                        value={enableChangePassword}
                        onChange={(e) => setEnableChangePassword(e.target.checked)}/>
                </div>
                {enableChangePassword ? (
                    <>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="oldpassword"
                            label="Old password"
                            name="oldpassword"
                            autoFocus
                            value={oldPassword}
                            onChange={(e) => setOldPassword(e.target.value)}
                            autoComplete={"old-password"}
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
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            autoComplete={"new-password"}
                        />
                    </>
                ) : null}
                <Button
                    disabled={processing}
                    onClick={() => props.setAction("")}
                    variant="contained"
                    color="primary"
                    style={{marginRight: 10}}
                >
                    Cancel
                </Button>
                <Button
                    disabled={processing || !Object.keys(changeObj).length}
                    type="submit"
                    variant="contained"
                    color="primary"
                >
                    Edit User
                </Button>
            </form>
        </div>
    );

    function editUser(event)
    {
        event.preventDefault();

        setProcessing(true);
        updateUser(props.id, changeObj, (value) =>
        {
            setProcessing(false);
            if (value === "success")
            {
                props.getUsers();
                props.setAction("");
            }
        });
    }
};

export default EditUser;
