import React, {useEffect, useState} from "react";
import {Link, withRouter} from "react-router-dom";
import Button from "@material-ui/core/Button";
import CreateUser from "./create-user/CreateUser";
import ChangePassword from "./change-password/ChangePassword";
import UsersList from "./users-list/UsersList";
import {deleteUser, getAllUsers} from "../../api/users";
import Confirmation from "../ConfirmAlert/Confirm";
import EditUser from "./edit-user/EditUser";

const Profile = (props) =>
{
    const user = localStorage.getItem("user");
    const [action, setAction] = useState("");
    const [users, setUsers] = useState([]);
    const [editUserId, setEditUserId] = useState("");

    useEffect(() =>
    {
        getUsers();
    }, []);

    return (
        <div style={styles.container}>
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
            <div style={styles.bodyContainer}>
                <div>
                    <span style={{fontWeight: 800}}>{user}:</span>
                    <Button style={{marginLeft: 10}}
                            onClick={() => setAction(action => "changePassword")}>
                        Change Password
                    </Button>
                    {user === "superadmin" ? (
                        <Button style={{marginLeft: 10}}
                                onClick={() => setAction(action => "createUser")}>
                            Create User
                        </Button>
                    ) : null}
                </div>
                <div style={styles.body}>
                    {user === "superadmin" ? (
                        <UsersList
                            users={users}
                            handleEdit={handleEditUser}
                            handleDelete={handleDeleteUser}
                        />
                    ) : null}
                    <div style={{textAlign: "center", flex: 1}}>
                        {action === "createUser" ? (
                            <CreateUser
                                key={"createUser"}
                                setAction={setAction}
                                getUsers={getUsers}
                            />
                        ) : null}
                        {action === "changePassword" ? (
                            <ChangePassword
                                key={"changePassword"}
                                id={localStorage.getItem("id")}
                                setAction={setAction}
                            />
                        ) : null}
                        {action === "editUser" && editUserId ? (
                            <EditUser
                                key={`editUser-${editUserId}`}
                                id={editUserId}
                                user={users.find(user => user._id === editUserId)}
                                getUsers={getUsers}
                                setAction={setAction}
                            />
                        ) : null}
                    </div>
                </div>
            </div>
        </div>
    );


    function handleDeleteUser(id, username)
    {
        Confirmation(`Are you sure to delete the user: ${username}?`, deleteUser, [id, getUsers]);
    }

    function handleEditUser(id, action)
    {
        setEditUserId(id);
        setAction(action);
    }

    function getUsers()
    {
        if (user === "superadmin")
        {
            getAllUsers((value, json) =>
            {
                if (value === "success")
                {
                    setUsers(users => json.data);
                }
            });
        }
    }
}

export default withRouter(Profile);

const styles = {
    container: {
        width: "100%",
        display: "flex",
        flexDirection: "column"
    },
    bodyContainer: {
        flex: 1,
        padding: 10,
        display: "flex",
        flexDirection: "column",
        overflow: "hidden"
    },
    body: {
        display: "flex",
        flex: 1,
        paddingTop: 10,
        overflow: "hidden"
    }
}
