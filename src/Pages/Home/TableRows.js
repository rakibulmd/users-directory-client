import React from "react";

const TableRows = ({ user }) => {
    return (
        <tr className="hover">
            <th className="hidden"></th>
            <td>{user?.name}</td>
            <td>{user?.position}</td>
            <td>{user?.address}</td>
            <td>{user?.age}</td>
            <td>{user?.startDate}</td>
            <td>{user?.salary}</td>
        </tr>
    );
};

export default TableRows;
