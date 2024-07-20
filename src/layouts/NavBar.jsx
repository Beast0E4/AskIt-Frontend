import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../redux/Slices/auth.slice";

function Navbar(){

    const authState = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    function onLogout(){
        dispatch(logout());
        navigate('/login');
    }

    useEffect(() => {
        if(!authState.isLoggedIn) navigate('/login');
    }, []);

    return (
        <div className="navbar bg-base-100 shadow-lg fixed top-0">
            <div className="navbar-start">
                <div className="dropdown">
                <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                    <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M4 6h16M4 12h8m-8 6h16" />
                    </svg>
                </div>
                <ul
                    tabIndex={0}
                    className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow gap-3">
                    <li><Link to={'/'}>Home</Link></li>
                    <li onClick={onLogout}><Link>Logout</Link></li>
                </ul>
                </div>
                <a className="ml-[2rem] text-xl bg-transparent hover:bg-transparent hover:cursor-pointer font-bold">AskIt</a>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    <li><Link to={'/'}>Home</Link></li>
                    <li onClick={onLogout}><Link>Logout</Link></li>
                </ul>
            </div>
            <div className="navbar-end">
                <Link className="mr-[2rem] bg-transparent hover:bg-transparent hover:cursor-pointer" to={'/profile'}>Profile</Link>
            </div>
            </div>
    )
}

export default Navbar;