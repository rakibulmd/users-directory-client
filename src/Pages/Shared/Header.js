import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
    return (
        <div className="bg-transparent text-white">
            <div className="container mx-auto">
                <div className="navbar">
                    <div className="">
                        <div className="dropdown">
                            <label
                                tabindex="0"
                                className="btn btn-ghost btn-circle"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-6 w-6"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        stroke-width="2"
                                        d="M4 6h16M4 12h16M4 18h7"
                                    />
                                </svg>
                            </label>
                            <ul
                                tabindex="0"
                                className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 text-primary rounded-box w-52"
                            >
                                <li>
                                    <Link to="/">Homepage</Link>
                                </li>
                                <li>
                                    <Link to="/">Portfolio</Link>
                                </li>
                                <li>
                                    <Link to="/">About</Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="navbar-center">
                        <Link
                            to="/"
                            className="btn btn-ghost text-xl uppercase"
                        >
                            User Directory
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Header;
