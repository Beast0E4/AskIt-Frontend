import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUsers } from "../redux/Slices/auth.slice";


function useUsers () {

    const authState = useSelector((state) => state.auth);

    const dispatch = useDispatch();

    async function loadUsers(){
        await dispatch(getUsers());
    }

    useEffect(() => {
        loadUsers();
    }, [authState.token]);

    return [authState];
}

export default useUsers;