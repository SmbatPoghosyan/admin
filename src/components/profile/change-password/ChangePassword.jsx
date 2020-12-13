import React, {useState} from "react";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import {updateUser} from "../../../api/users";

const ChangePassword = (props) =>
{
    const [processing, setProcessing] = useState(false);

    return (
        <div style={{
            maxWidth: 450,
            margin: "0 auto",
            padding: 24,
            border: "1px solid black"
        }}>
            <Typography component="h1" variant="h5">
                Change Password
            </Typography>
            <form noValidate onSubmit={changePassword}>
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="oldpassword"
                    label="Old password"
                    name="oldpassword"
                    autoFocus
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
                    autoComplete={"new-password"}
                />
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
                    disabled={processing}
                    type="submit"
                    variant="contained"
                    color="primary"
                >
                    Change password
                </Button>
            </form>
        </div>
    );

    function changePassword(event)
    {
        event.preventDefault();
        const oldpassword = event.target.oldpassword.value || "";
        const password = event.target.password.value || "";

        if (oldpassword && password)
        {
            setProcessing(true);
            updateUser(props.id, {password, oldpassword}, (value) =>
            {
                setProcessing(false);
                if (value === "success")
                {
                    props.setAction("");
                }
            });
        }
    };
};

export default ChangePassword;
