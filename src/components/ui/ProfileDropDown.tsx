
import type { Dispatch, SetStateAction } from "react";
import { useNavigate } from "react-router-dom";


export function ProfileDropDown({
    setshowProfileDropDown, 
    showNotification
}: {
    setshowProfileDropDown: Dispatch<SetStateAction<boolean>>,
    showNotification?: (message: string, type?: 'success' | 'error' | 'info', duration?: number, onComplete?: () => void) => void
}) {
    const navigate = useNavigate();
    
    return (
        <div className="fixed md:bottom-14 bottom-26 left-2 bg-white border border-gray-200 rounded-lg shadow-lg p-1 z-50 min-w-max">
            <button 
                className="w-full px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-md transition duration-100 whitespace-nowrap"
                onClick={async () => {
                    try{
                        localStorage.removeItem('token');
                        if (showNotification) {
                            showNotification("Logout Successful!", "success", 2000, () => {
                                navigate('/');
                            });
                        } else {
                            // Fallback if no notification system
                            alert("Logout Successful!");
                            navigate('/');
                        }
                    }
                    catch(e){
                        if (showNotification) {
                            showNotification("Some Error during logout", "error");
                        } else {
                            alert("Some Error during logout");
                        }
                        console.log(e);
                    }
                    setshowProfileDropDown(false);
                }}
            >
                Logout
            </button>
        </div>
    );
}