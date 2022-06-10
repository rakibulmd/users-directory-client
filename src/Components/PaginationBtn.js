import axios from "axios";
import React, { useEffect } from "react";

const PaginationBtn = ({
    currentPage,
    setCurrentPage,
    pageCount,
    activeFilter,
    setUsers,
    pageSize,
}) => {
    const handlePageChange = (number) => {
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
        setCurrentPage(number);
    };
    useEffect(() => {
        if (activeFilter) {
            const getData = async () => {
                await axios
                    .get(
                        `https://assessment-project-server.herokuapp.com/customers?page=${currentPage}&pagesize=${pageSize}&mode=${
                            activeFilter?.split(".")[1]
                        }&sort=${activeFilter?.split(".")[0]}`
                    )
                    .then((response) => setUsers(response.data))
                    .catch((error) => console.log(error));
            };
            getData();
        } else if (!activeFilter) {
            const getData = async () => {
                await axios
                    .get(
                        `https://assessment-project-server.herokuapp.com/customers?page=${currentPage}&pagesize=${pageSize}
                    }&sort=${activeFilter?.split(".")[0]}`
                    )
                    .then((response) => setUsers(response.data))
                    .catch((error) => console.log(error));
            };
            getData();
        }
    }, [currentPage, pageSize, activeFilter, setUsers]);
    return (
        <>
            <div className="btn-group flex py-3 mb-12">
                <button
                    disabled={currentPage === 0}
                    onClick={() => setCurrentPage(currentPage - 1)}
                    className="btn btn-success text-black hover:bg-primary hover:text-white"
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
                        onClick={() => handlePageChange(number)}
                        key={number}
                    >
                        {number + 1}
                    </button>
                ))}
                <button
                    disabled={currentPage + 1 === pageCount}
                    onClick={() => setCurrentPage(currentPage + 1)}
                    className="btn  btn-success hover:bg-primary hover:text-white text-black"
                >
                    Next
                </button>
            </div>
        </>
    );
};

export default PaginationBtn;
