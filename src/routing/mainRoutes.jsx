import { Route, Routes } from "react-router-dom";
import SignIn from "../pages/auth/signin";
import SignUp from "../pages/auth/signup";
import Home from "../pages/Home";
import Question from "../pages/createQuestion/Question";
import Profile from "../pages/profile/Profile";
import Answer from "../pages/createAnswer/Answer";
import AnswerPage from "../pages/answers/AnswerPage";
import MyQuestions from "../pages/my questions/MyQuestions";
import Navbar from "../layouts/NavBar";

function MainRoutes() {
    return (
        <Routes>
            <Route path="/login" element={<SignIn/>} />
            <Route path="/signup" element={<SignUp/>} />
            <Route path="/question" element={<Question/>}/>
            <Route path="/profile" element={<Profile/>}/>
            <Route path="/answer" element={<Answer/>}/>
            <Route path="/" element={<><Navbar/><Home/></>} />
            <Route path="/answers" element={<AnswerPage/>}/>
            <Route path="/myquestions" element={<><Navbar/><MyQuestions/></>}/>
        </Routes>
    )
}

export default MainRoutes;