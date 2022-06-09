import React from "react";

const PaginationBtn = ({ currentPage, setCurrentPage, pageCount }) => {
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
                        onClick={() => setCurrentPage(number)}
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
