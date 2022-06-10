import React from "react";
import CreateTable from "../../Components/CreateTable";
const TableHead = ({ setActiveFilter, activeFilter, setCurrentPage }) => {
    const tableHeaders = [
        "name",
        "position",
        "address",
        "age",
        "startDate",
        "salary",
    ];

    return (
        <thead>
            <tr>
                <th className="hidden"></th>
                {tableHeaders.map((value, i) => (
                    <CreateTable
                        key={i}
                        value={value}
                        setCurrentPage={setCurrentPage}
                        activeFilter={activeFilter}
                        setActiveFilter={setActiveFilter}
                    ></CreateTable>
                ))}
            </tr>
        </thead>
    );
};

export default TableHead;
