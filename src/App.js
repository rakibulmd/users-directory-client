import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./Pages/Home/Home";
import Footer from "./Pages/Shared/Footer";
import Header from "./Pages/Shared/Header";

function App() {
    return (
        <div>
            <Routes>
                <Route path="/" element={<Home></Home>}></Route>
                <Route path="/home" element={<Home></Home>}></Route>
            </Routes>
        </div>
    );
}

export default App;
