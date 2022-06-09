import axios from "axios";
import React, { useEffect, useState } from "react";
import Header from "../Shared/Header";
import TableRows from "./TableRows";
import { FaCaretDown, FaCaretUp } from "react-icons/fa";
import PaginationBtn from "../../Components/PaginationBtn";
import TableFooter from "../../Components/TableFooter";

const Home = () => {
    const [users, setUsers] = useState([]);
    const [activeFilter, setActiveFilter] = useState(null);
    const [pageCount, setPageCount] = useState(0);
    const [pageSize, setPageSize] = useState(10);
    const [currentPage, setCurrentPage] = useState(0);
    const [usersCount, setUserCount] = useState(0);

    const handlePageSizeChange = (event) => {
        event.preventDefault();
        setPageSize(event.target.value);
    };

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
        const getData = async () => {
            await axios
                .get(
                    `http://localhost:5000/customers?page=${currentPage}&pagesize=${pageSize}&mode=${object.mode}&sort=${object.filter}`
                )
                .then((response) => setUsers(response.data))
                .catch((error) => console.log(error));
        };
        getData();
        setActiveFilter(object.filter + object.mode);
    };

    // const handleNameDescending = (object) => {
    //     const newUsers = users.sort((a, b) =>
    //         a.name.toLowerCase() < b.name.toLowerCase() ? 1 : -1
    //     );
    //     setUsers(newUsers);
    //     setActiveFilter(object.filter + object.mode);
    // };

    useEffect(() => {
        const getData = async () => {
            await axios
                .get(
                    `http://localhost:5000/customers?page=${currentPage}&pagesize=${pageSize}`
                )
                .then((response) => setUsers(response.data))
                .catch((error) => console.log(error));
        };
        getData();
    }, [currentPage, pageSize]);
    useEffect(() => {
        const get = async () => {
            const { data } = await axios.get(
                `http://localhost:5000/customerCount`
            );
            const pageCountValue = Math.ceil(data.count / pageSize);
            setPageCount(pageCountValue);
            setUserCount(data.count);
            if (pageCountValue <= currentPage) {
                setCurrentPage(pageCount - 1);
            }
        };
        get();
    }, [pageSize, setPageCount, setUserCount, currentPage, pageCount]);

    return (
        <div className="bg-gradient-to-r from-primary to-secondary min-h-screen text-white">
            {/* <Header></Header> */}
            <div className="text-center text-3xl md:text-5xl pt-12">
                <h2>All Users</h2>
            </div>
            <div className="flex justify-start items-center px-5 py-3 gap-2">
                <span>Show</span>
                <select
                    onChange={handlePageSizeChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-700 block w-24 p-2.5"
                >
                    <option>10</option>
                    <option>25</option>
                    <option>50</option>
                </select>
                <span>entries</span>
            </div>
            <div className="overflow-x-auto p-5 text-black">
                <table className="table table-zebra table-compact w-full">
                    <thead>
                        <tr>
                            <th className="hidden"></th>
                            <th className="flex items-center justify-between">
                                <span>Name</span>
                                <span className="flex flex-col">
                                    <span>
                                        <FaCaretUp
                                            onClick={() =>
                                                handleFilter({
                                                    filter: "name",
                                                    mode: 1,
                                                })
                                            }
                                            className={`${
                                                activeFilter === "name1"
                                                    ? "text-gray-900 w-4 h-4 inline"
                                                    : "text-gray-400 w-4 h-4 inline"
                                            }`}
                                        />
                                    </span>
                                    <span>
                                        <FaCaretDown
                                            onClick={() =>
                                                handleFilter({
                                                    filter: "name",
                                                    mode: -1,
                                                })
                                            }
                                            className={`${
                                                activeFilter === "name-1"
                                                    ? "text-gray-900 w-4 h-4 inline"
                                                    : "text-gray-400 w-4 h-4 inline"
                                            }`}
                                        />
                                    </span>
                                </span>
                            </th>
                            <th>Position</th>
                            <th>State</th>
                            <th>Age</th>
                            <th>Start Date</th>
                            <th>Salary</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user, i) => (
                            <TableRows key={i} user={user}></TableRows>
                        ))}
                    </tbody>
                    <TableFooter></TableFooter>
                </table>
            </div>
            <div className="p-5 lg:flex justify-between">
                <div>
                    <p className="text-xl">
                        Showing {`${pageSize * currentPage + 1} `} to{" "}
                        {`${
                            pageSize * (currentPage + 1) <= usersCount
                                ? pageSize * (currentPage + 1)
                                : usersCount
                        } `}{" "}
                        of {usersCount} entries{" "}
                    </p>
                </div>
                <PaginationBtn
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                    pageCount={pageCount}
                ></PaginationBtn>
            </div>
        </div>
    );
};

export default Home;
