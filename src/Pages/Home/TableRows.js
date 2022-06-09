import React from "react";

const TableRows = ({ user }) => {
    return (
        <tr>
            <td>{user.profile.name}</td>
            <td>{user.email}</td>
            <td>Blue</td>
        </tr>
    );
};

export default TableRows;
