import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { currQues } from "../redux/Slices/ques.slice";
import { useEffect, useState } from "react";
import { getUser } from "../redux/Slices/auth.slice";
import UserDetailsModal from "./UserDetailsModal";

// eslint-disable-next-line react/prop-types
function Question({questionId,  question, createdAt, creator}) {

    // const ansState = useSelector((state) => state.ans);
    const ansState = useSelector((state) => state.ans);
    const quesState = useSelector((state) => state.ques);
    const authState = useSelector((state) => state.auth);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [idx, setIdx] = useState();
    const [userIdx, setUserIdx] = useState();
    const [name, setName] = useState("");

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

    function findName(){
        const nm = authState.userList.findIndex((e) => e._id === creator);
        setUserIdx(nm);
        setName(authState.userList[nm].name);
    }

    async function userView() {
        const res = await dispatch(getUser(authState.userList[userIdx]._id));
        if(res){
            document.getElementById('userModal').showModal();
        }
    }

    async function onView() {
        const res =  await dispatch(currQues(questionId));
        if(res) navigate('/answers');
    }

    useEffect(() => {
        filterquestion(); findName();
    }, [questionId, authState.userList.length])

    return (
        <article className="mb-4 w-full break-inside p-6 bg-gray-700 flex flex-col bg-clip-border">
            <div className="flex pb-6 items-center justify-between">
            <div className="flex">
                {/* <a className="inline-block mr-4" href="#">
                <img className="rounded-full max-w-none w-14 h-14" src="https://randomuser.me/api/portraits/men/33.jpg" />
                </a> */}
                <div className="flex flex-col">
                <div className="flex items-center">
                    <a onClick={userView} className="inline-block text-lg font-bold mr-2 text-md hover:cursor-pointer hover:underline">{name}</a>
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
            <div className="w-full flex gap-4">
                <button onClick={answer} className="text-xs hover:bg-gray-500 p-2 rounded-md">Add answer
                    <span className="ml-3">{ansState.solutionList[idx]?.length}</span>
                </button>
                <button onClick={onView} className="font-medium text-xs text-white hover:underline">View Answers</button>
            </div>
            <UserDetailsModal />
        </article>
    )
}

export default Question;