import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllQuestions } from "../redux/Slices/ques.slice";


function useQuestions () {

    const authState = useSelector((state) => state.auth);
    const quesState = useSelector((state) => state.ques);

    const dispatch = useDispatch();

    async function loadQuestions(){
        await dispatch(getAllQuestions());
    }

    useEffect(() => {
        loadQuestions();
    }, [authState.token]);

    return [quesState];
}

export default useQuestions;