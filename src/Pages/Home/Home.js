import axios from "axios";
import React, { useEffect, useState } from "react";
import Header from "../Shared/Header";
import TableRows from "./TableRows";
import PaginationBtn from "../../Components/PaginationBtn";
import TableFooter from "./TableFooter";
import TableHead from "./TableHead";

const Home = () => {
    const [users, setUsers] = useState([]);
    const [activeFilter, setActiveFilter] = useState(null);
    const [pageCount, setPageCount] = useState(0);
    const [pageSize, setPageSize] = useState(10);
    const [currentPage, setCurrentPage] = useState(0);
    const [usersCount, setUserCount] = useState(0);
    const [searchValue, setSearchValue] = useState("");

    const handlePageSizeChange = (event) => {
        event.preventDefault();
        setPageSize(event.target.value);
    };

    // const handleSearch = (event) => {
    //     console.log(event.target.value);
    //     setSearchValue(event.target.value);
    //     setCurrentPage(0);
    // };

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
    }, []);
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
            <div className="text-center text-3xl md:text-5xl pt-12 pb-7">
                <h2>All Users</h2>
            </div>
            <div className="flex justify-between items-center px-5">
                <div className="flex justify-start items-center px-5 gap-2">
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
            </div>

            <div className="overflow-x-auto p-5 text-black">
                <p className="text-white md:hidden">
                    ** Scroll Horizontally for full view{" "}
                </p>
                <table className="table table-zebra table-compact w-full">
                    <TableHead
                        activeFilter={activeFilter}
                        setActiveFilter={setActiveFilter}
                        setCurrentPage={setCurrentPage}
                    ></TableHead>
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
                    activeFilter={activeFilter}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                    pageCount={pageCount}
                    setUsers={setUsers}
                    pageSize={pageSize}
                ></PaginationBtn>
            </div>
        </div>
    );
};

export default Home;
