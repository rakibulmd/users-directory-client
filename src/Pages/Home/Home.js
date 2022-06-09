import axios from "axios";
import React, { useEffect, useState } from "react";
import Header from "../Shared/Header";
import TableRows from "./TableRows";

const Home = () => {
    const [users, setUsers] = useState([]);
    useEffect(() => {
        const getData = async () => {
            const response = await axios.get(
                `https://assessment-project-server.herokuapp.com/customers`
            );

            setUsers(response.data);
        };
        getData();
    }, []);
    if (!users) {
        return <div>Loading</div>;
    }
    console.log(users);
    return (
        <div className="bg-gradient-to-r from-primary to-secondary min-h-screen text-white">
            <Header></Header>
            <div className="text-center text-3xl md:text-5xl mt-12">
                <h2>All Users</h2>
            </div>
            <div class="overflow-x-auto p-5 text-black">
                <table class="table table-zebra w-full">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Job</th>
                            <th>Favorite Color</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* <tr>
                            <td>Cy Ganderton</td>
                            <td>Quality Control Specialist</td>
                            <td>Blue</td>
                        </tr> */}
                        {users.map((user) => (
                            <TableRows key={user._id} user={user}></TableRows>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Home;
