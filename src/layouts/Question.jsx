import { useNavigate } from "react-router-dom";
import useUsers from "../hooks/useUsers";
import { useDispatch, useSelector } from "react-redux";
import { currQues } from "../redux/Slices/ques.slice";
import { useEffect, useState } from "react";

// eslint-disable-next-line react/prop-types
function Question({questionId,  question, createdAt, creator}) {

    // const ansState = useSelector((state) => state.ans);
    const ansState = useSelector((state) => state.ans);
    const quesState = useSelector((state) => state.ques);
    const [userState] = useUsers();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [idx, setIdx] = useState();

    async function answer() {
        const res =  await dispatch(currQues(questionId));
        if(res) navigate('/answer');
    }

    function filterquestion() {
        const n = quesState.questionList.length;
        let index = 0;
        for(var i = 0; i < n; i ++){
            if(quesState.questionList[i]._id === questionId){
                index = i; break;
            }
        }
        setIdx(index);
    }

    useEffect(() => {
        filterquestion();
    }, [questionId])

    return (
        <article className="mb-4 w-[70vw] break-inside p-6 bg-gray-700 flex flex-col bg-clip-border">
            <div className="flex pb-6 items-center justify-between">
            <div className="flex">
                {/* <a className="inline-block mr-4" href="#">
                <img className="rounded-full max-w-none w-14 h-14" src="https://randomuser.me/api/portraits/men/33.jpg" />
                </a> */}
                <div className="flex flex-col">
                <div className="flex items-center">
                    <a className="inline-block text-lg font-bold mr-2 text-md" href="#">{userState.userList.find((e) => e._id === creator)?.name}</a>
                </div>
                <div className="text-slate-500 text-sm dark:text-slate-300">
                    {createdAt}
                </div>
                </div>
            </div>
            </div>
            <hr className="bg-white"/>
            {/* <div className="py-4">
            <div className="flex justify-between gap-1 mb-1">
                <a className="flex" href="#">
                <img className="max-w-full rounded-l-lg"
                    src="https://images.pexels.com/photos/2128028/pexels-photo-2128028.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260" />
                </a>
                <a className="flex" href="#">
                <img className="max-w-full rounded-r-lg"
                    src="https://images.pexels.com/photos/6145852/pexels-photo-6145852.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260" />
                </a>
            </div>
            </div> */}
            {/* <h2 className="text-3xl font-extrabold">
            Web Design templates Selection
            </h2> */}
            <div className="py-4">
            <p>
                {question}
            </p>
            </div>
            <div className="w-full">
                <button onClick={answer} className="text-xs hover:bg-gray-500 p-2 rounded-md">ANSWER
                    <span className="ml-3">{ansState.solutionList[idx]?.length}</span>
                </button>
            </div>
        </article>
    )
}

export default Question;