import React from "react";
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";
import Icon from "@material-ui/core/Icon";

const UsersList = (props) =>
{
    return (
        <div style={styles.container}>
            <p style={styles.headName}>Users List</p>
            <div style={styles.list}>
                <ol style={{padding: 5}}>
                    {
                        props.users?.map((user, i) => (
                            <li key={user._id} style={styles.li}>
                                <span style={{flex: 1}}>
                                    {i + 1}. {user.username}
                                </span>
                                <IconButton
                                    onClick={() => props.handleEdit(user._id, "editUser")}
                                    aria-label="Edit"
                                    title="Edit"
                                    style={{padding: "3px", marginRight: 10}}
                                >
                                    <Icon fontSize="small">edit_icon</Icon>
                                </IconButton>
                                <IconButton
                                    aria-label="Delete"
                                    onClick={() => props.handleDelete(user._id, user.username)}
                                    title="Delete"
                                    style={{padding: "3px"}}
                                >
                                    <DeleteIcon fontSize="small"/>
                                </IconButton>
                            </li>
                        ))
                    }
                </ol>
            </div>
        </div>
    );
};


export default UsersList;

const styles = {
    container: {
        marginRight: 10,
        width: 300,
        maxHeight: "100%",
        border: "1px solid black"
    },
    li: {
        display: "flex",
        alignItems: "center",
        marginBottom: 10,
        paddingBottom: 5,
        borderBottom: "1px solid grey"
    },
    headName: {
        fontSize: "22px",
        padding: "10px 0",
        lineHeight: "normal",
        textAlign: "center"
    },
    list: {
        maxHeight: "calc(100% - 50px)",
        overflowY: "auto",
    }
}
