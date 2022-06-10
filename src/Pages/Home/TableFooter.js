import React from "react";

const TableFooter = () => {
    return (
        <tfoot>
            <tr>
                <th className="hidden"></th>
                <th>Name</th>
                <th>Position</th>
                <th>State</th>
                <th>Age</th>
                <th>Start Date</th>
                <th>Salary</th>
            </tr>
        </tfoot>
    );
};

export default TableFooter;
