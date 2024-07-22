import { useDispatch, useSelector } from "react-redux";
import useQuestions from "../../hooks/useQuestions";
import { getAllSolutions, getSolutionByQuestion } from "../../redux/Slices/ans.slice";
import { Link } from "react-router-dom";
import { IoMdAdd } from "react-icons/io";
import { useEffect } from "react";
import MyQuestionLayout from "../../layouts/MyQuestionLayout";
import { getUsers } from "./../../redux/Slices/auth.slice";

function MyQuestions() {
    const [quesState] = useQuestions();
    const authState = useSelector((state) => state.auth);

    const dispatch = useDispatch();

    async function loadSolutions(){
        let array = [];
        let n = quesState.questionList.length
        for(let i = 0; i < n; i ++){
            const ans = await dispatch(getSolutionByQuestion(quesState.questionList[i]._id));
            array[i] = ans.payload.data.data;
        }
        await dispatch(getAllSolutions(array));
    }

    async function loadUsers(){
        await dispatch(getUsers());
    }

    useEffect(() => {
        loadSolutions(); loadUsers();
    }, [quesState.questionList])

    return (
        <>
            <div className="w-full flex flex-col items-center my-3 mt-24">
                {authState.userList.length && quesState.questionList?.map((quest) => {
                    if(quest.userId === authState.data._id){
                        let date = quest.createdAt.split('T')[0].split('-');
                        date = date[2] + "-" + date[1] + "-" + date[0];
                        return (<MyQuestionLayout key={quest._id} questionId={quest._id} creator={quest.userId} question={quest.question} createdAt={date}/>)
                    }
                })}
            </div>
            <Link to={'/question'}>
                <button className="btn bg-gray-300 text-black font-bold fixed bottom-10 right-10 hover:bg-gray-400">
                    <IoMdAdd/>
                    ADD QUESTION
                </button>
            </Link>
        </>
    )
}

export default MyQuestions;