import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "../src/pages/Home";
// import OpenRoute from "./components/core/Auth/OpenRoute"
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Navbar from "./components/common/Navbar";

function App() {
  return (
    <div className=" w-screnn min-h-screen bg-richblack-900 flex flex-col font-inter">
    <Navbar/>
    <Routes>
    <Route path="/" element={<Home/>} />
    <Route path="signup" element={ <Signup/>} />
    <Route path="login" element={<Login/> } />
    </Routes>
      
    </div>
  );
}

export default App;
