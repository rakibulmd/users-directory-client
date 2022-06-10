import axios from "axios";
import React from "react";
import { FaCaretDown, FaCaretUp } from "react-icons/fa";

const TableHead = ({ setActiveFilter, activeFilter, setCurrentPage }) => {
    const tableHeaders = [
        "name",
        "position",
        "address",
        "age",
        "startDate",
        "salary",
    ];
    const handleFilter = (object) => {
        // let newUsers;
        // if (object.mode === 1) {
        //     newUsers = users.sort((a, b) =>
        //         a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1
        //     );
        // } else if (object.mode === -1) {
        //     newUsers = users.sort((a, b) =>
        //         a.name.toLowerCase() < b.name.toLowerCase() ? 1 : -1
        //     );
        // }
        // setUsers(newUsers);
        // const getData = async () => {
        //     await axios
        //         .get(
        //             `http://localhost:5000/customers?page=${currentPage}&pagesize=${pageSize}&mode=${object.mode}&sort=${object.filter}`
        //         )
        //         .then((response) => setUsers(response.data))
        //         .catch((error) => console.log(error));
        // };
        // getData();

        setActiveFilter(object.filter + "." + object.mode);
        setCurrentPage(0);
    };
    const createTh = (value) => {
        return (
            <th>
                <span className="flex items-center justify-between">
                    <span>{value}</span>
                    <span className="flex flex-col">
                        <span>
                            <FaCaretUp
                                onClick={() =>
                                    handleFilter({
                                        filter: value,
                                        mode: 1,
                                    })
                                }
                                className={`${
                                    activeFilter === `${value + "." + 1}`
                                        ? "text-gray-900 w-4 h-4 inline"
                                        : "text-gray-400 w-4 h-4 inline"
                                }`}
                            />
                        </span>
                        <span>
                            <FaCaretDown
                                onClick={() =>
                                    handleFilter({
                                        filter: value,
                                        mode: -1,
                                    })
                                }
                                className={`${
                                    activeFilter === `${value + "." + -1}`
                                        ? "text-gray-900 w-4 h-4 inline"
                                        : "text-gray-400 w-4 h-4 inline"
                                }`}
                            />
                        </span>
                    </span>
                </span>
            </th>
        );
    };
    return (
        <thead>
            <tr>
                <th className="hidden"></th>
                {tableHeaders.map((t) => createTh(t))}
            </tr>
        </thead>
    );
};

export default TableHead;
