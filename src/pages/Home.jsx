import { IoMdAdd } from "react-icons/io";
import Navbar from "../layouts/NavBar";
import { Link } from "react-router-dom";
import Question from "../layouts/Question";
import useQuestions from "../hooks/useQuestions";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getAllSolutions, getSolutions } from "../redux/Slices/ans.slice";

function Home() {

    const [quesState] = useQuestions();
    const dispatch = useDispatch();

    async function loadSolutions(){
        let array = [];
        let n = quesState.questionList.length
        for(let i = 0; i < n; i ++){
            const ans = await dispatch(getSolutions(quesState.questionList[i]._id));
            array[i] = ans.payload.data.data;
        }
        await dispatch(getAllSolutions(array));
    }

    useEffect(() => {
        loadSolutions();
    }, [quesState.questionList])

    return (
        <>
            <Navbar/>
            <div className="w-full flex flex-col items-center my-3 mt-24">
                {quesState.questionList?.map((quest) => {
                    let date = quest.createdAt.split('T')[0].split('-');
                    date = date[2] + "-" + date[1] + "-" + date[0];
                    return (<Question key={quest._id} questionId={quest._id} creator={quest.userId} question={quest.question} createdAt={date}/>)
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

export default Home;