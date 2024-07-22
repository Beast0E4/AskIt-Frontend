import { useDispatch } from "react-redux";
import { getUser } from "../redux/Slices/auth.slice";
import UserDetailsModal from "./UserDetailsModal";

// eslint-disable-next-line react/prop-types
function UserLayout({username, profession, userId}) {

    const dispatch = useDispatch();

    async function userView(){
        const res = await dispatch(getUser(userId));
        if(res){
            document.getElementById('userModal').showModal();
        }
    }

    return(
        <div role="button"
            className="flex items-center w-full p-3 leading-tight transition-all rounded-lg outline-none text-start hover:bg-blue-gray-50 hover:bg-opacity-80 hover:text-blue-gray-900 focus:bg-blue-gray-50 focus:bg-opacity-80 focus:text-blue-gray-900 active:bg-blue-gray-50 active:bg-opacity-80 active:text-blue-gray-900">
            {/* <div className="grid mr-4 place-items-center">
                <img alt="emma" src="https://docs.material-tailwind.com/img/face-3.jpg"
                className="relative inline-block h-12 w-12 !rounded-full  object-cover object-center" />
            </div> */}
            <div>
                <h6 onClick={userView}
                className="block font-sans text-base antialiased font-semibold leading-relaxed tracking-normal text-blue-gray-900 hover:underline">
                {username}
                </h6>
                <p className="block font-sans text-sm antialiased font-normal leading-normal text-gray-300">
                {profession}
                </p>
            </div>
            <UserDetailsModal />
        </div>
    )
}

export default UserLayout;