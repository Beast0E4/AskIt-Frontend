import { Route, Routes } from "react-router-dom";
import SignIn from "../pages/auth/signin";
import SignUp from "../pages/auth/signup";
import Home from "../pages/Home";

function MainRoutes() {
    return (
        <Routes>
            <Route path="/login" element={<SignIn/>} />
            <Route path="/signup" element={<SignUp/>} />
            <Route path="/" element={<Home/>} />
        </Routes>
    )
}

export default MainRoutes;