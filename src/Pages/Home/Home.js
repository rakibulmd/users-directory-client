import axios from "axios";
import React, { useEffect, useState } from "react";
import Header from "../Shared/Header";
import TableRows from "./TableRows";
import { FaCaretDown, FaCaretUp } from "react-icons/fa";
import { IconContext } from "react-icons";

const Home = () => {
    const [users, setUsers] = useState([]);
    const [message, setMessage] = useState("");
    const handleNameAscending = (event) => {
        event.preventDefault();
        const newUsers = users.sort((a, b) =>
            a.email.toLowerCase() > b.email.toLowerCase() ? 1 : -1
        );
        console.log(newUsers);
        setUsers(newUsers);
        console.log(users);
        setMessage("up");
    };
    const handleNameDescending = (event) => {
        event.preventDefault();
        const newUsers = users.sort((a, b) =>
            a.email.toLowerCase() < b.email.toLowerCase() ? 1 : -1
        );
        console.log(newUsers);
        setUsers(newUsers);
        console.log(users);
        setMessage("down");
    };
    useEffect(() => {
        const getData = async () => {
            const response = await axios.get(
                `https://assessment-project-server.herokuapp.com/customers`
            );

            setUsers(response.data);
        };
        getData();
        console.log("data loaded");
    }, []);

    return (
        <div className="bg-gradient-to-r from-primary to-secondary min-h-screen text-white">
            <Header></Header>
            <div className="text-center text-3xl md:text-5xl mt-12">
                <h2>All Users</h2>
                {/* <h2>{message}</h2> */}
            </div>
            <div class="overflow-x-auto p-5 text-black">
                <table class="table table-zebra w-full">
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
                                            className="text-gray-400 w-4 h-4 inline"
                                        />
                                    </span>
                                    <span className="nameDown">
                                        <FaCaretDown
                                            onClick={handleNameDescending}
                                            className="text-gray-400 w-4 h-4 inline"
                                        />
                                    </span>
                                </span>
                            </th>
                            <th>Email</th>
                            <th>Favorite Color</th>
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
        </div>
    );
};

export default Home;
