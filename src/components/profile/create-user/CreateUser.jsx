import React, {useState} from "react";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import {createUser} from "../../../api/users";

const CreateUser = (props) =>
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
                    Create User
                </Button>
            </form>
        </div>
    );

    function createAdmin(event)
    {
        event.preventDefault();
        const username = event.target.username.value || "";
        const password = event.target.password.value || "";
        if (username && password)
        {
            setProcessing(true);
            createUser(username, password, (value) =>
            {
                setProcessing(false);
                if (value === "success")
                {
                    props.getUsers();
                    props.setAction("");
                }
            });
        }
    }
};

export default CreateUser;
