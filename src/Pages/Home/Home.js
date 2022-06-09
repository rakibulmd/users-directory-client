import React from "react";
import Header from "../Shared/Header";

const Home = () => {
    return (
        <div className="bg-gradient-to-r from-primary to-secondary min-h-screen text-white">
            <Header></Header>
            <div className="text-center text-3xl md:text-5xl mt-12">
                <h2>All Users</h2>
            </div>
        </div>
    );
};

export default Home;
