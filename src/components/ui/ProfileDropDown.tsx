
import type { Dispatch, SetStateAction } from "react";

import { useNavigate } from "react-router-dom";


export function ProfileDropDown({setshowProfileDropDown}: {setshowProfileDropDown: Dispatch<SetStateAction<boolean>>}) {
    const navigate = useNavigate();
    return (
        <div className="fixed md:bottom-14 bottom-26 left-2 bg-white border border-gray-200 rounded-lg shadow-lg p-1 z-50 min-w-max">
            <button 
                className="w-full px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-md transition duration-100 whitespace-nowrap"
                onClick={async () => {
                    try{
                        localStorage.removeItem('token');
                        alert("Logout Successfull!!")
                        navigate('/login')
                    }
                    catch(e){
                        alert("Some Error during logout")
                        console.log(e)
                    }
                    setshowProfileDropDown(false);
                }}
            >
                Logout
            </button>
        </div>
    );
}