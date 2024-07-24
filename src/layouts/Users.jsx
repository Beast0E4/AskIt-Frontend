import { useSelector } from "react-redux";
import UserLayout from "./UserLayout";

function Users() {

    const authState = useSelector((state) => state.auth);

    return (
        <div className="relative flex flex-col text-white bg-transparent w-[25vw]">
            <nav className="flex w-full flex-col gap-1 p-2 font-sans text-base font-normal text-blue-gray-700 my-3 border-white border-[1px]">
                {authState.userList?.map((user) => {
                    return (<UserLayout key={user._id} userId={user._id} username={user.name} profession={user.profession}/>)
                })}
            </nav>
        </div>
    )
}

export default Users;