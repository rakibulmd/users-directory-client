import axios from "axios";
import React, { useEffect, useState } from "react";
import Header from "../Shared/Header";
import TableRows from "./TableRows";
import { FaCaretDown, FaCaretUp } from "react-icons/fa";

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

    const handleNameAscending = (event) => {
        event.preventDefault();
        const newUsers = users.sort((a, b) =>
            a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1
        );
        setUsers(newUsers);
        setActiveFilter("nameAscending");
    };

    const handleNameDescending = (event) => {
        event.preventDefault();
        const newUsers = users.sort((a, b) =>
            a.name.toLowerCase() < b.name.toLowerCase() ? 1 : -1
        );
        setUsers(newUsers);
        setActiveFilter("nameDescending");
    };

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
            <div class="overflow-x-auto p-5 text-black">
                <table class="table table-zebra table-compact w-full">
                    <thead>
                        <tr>
                            <th
                                id="#name"
                                className="flex items-center justify-between"
                            >
                                <span>Name</span>
                                <span className="flex flex-col">
                                    <span className="nameUp">
                                        <FaCaretUp
                                            onClick={handleNameAscending}
                                            className={`${
                                                activeFilter === "nameAscending"
                                                    ? "text-gray-900 w-4 h-4 inline"
                                                    : "text-gray-400 w-4 h-4 inline"
                                            }`}
                                        />
                                    </span>
                                    <span className="nameDown">
                                        <FaCaretDown
                                            onClick={handleNameDescending}
                                            className={`${
                                                activeFilter ===
                                                "nameDescending"
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
                        {/* <tr>
                            <td>Cy Ganderton</td>
                            <td>Quality Control Specialist</td>
                            <td>Blue</td>
                        </tr> */}
                        {users.map((user, i) => (
                            <TableRows key={i} user={user}></TableRows>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="btn-group flex justify-center py-3 mb-12">
                <button
                    disabled={currentPage === 0}
                    onClick={() => setCurrentPage(currentPage - 1)}
                    className="btn btn-secondary text-black hover:bg-primary hover:text-white"
                >
                    Previous
                </button>
                {[...Array(pageCount).keys()].map((number) => (
                    <button
                        className={
                            currentPage === number
                                ? "btn  bg-primary border-white border-2 hover:bg-primary text-white hover:text-white hover:border-white"
                                : "btn bg-white border-0 text-black hover:bg-white/50"
                        }
                        onClick={() => setCurrentPage(number)}
                        key={number}
                    >
                        {number + 1}
                    </button>
                ))}
                <button
                    disabled={currentPage + 1 === pageCount}
                    onClick={() => setCurrentPage(currentPage + 1)}
                    className="btn  btn-secondary hover:bg-primary hover:text-white text-black"
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default Home;
