import {  useRef, type Dispatch, type SetStateAction } from "react";
import { ProfileIcon } from "../../icons/profileIcon";

interface ProfileProps {
    size: 'lg' | 'sm';
    showLogout: boolean, 
    setShowLogout: Dispatch<SetStateAction<boolean>>
}

export function Profile({ size,showLogout, setShowLogout }: ProfileProps) {
    
    const profileRef = useRef<HTMLDivElement>(null);

    const handleProfileClick = () => {
        setShowLogout(!showLogout);
    };

    

    return (
        <div className="relative" ref={profileRef}>
            {/* Profile button */}
            <div 
                className="flex flex-row items-center p-2 m-2 cursor-pointer hover:bg-gray-300 hover:text-purple-600 rounded-lg transition duration-100"
                onClick={handleProfileClick}
            >
                {size === 'lg' ? (
                    <div className="flex items-center">
                        <div className="w-6 h-6 bg-purple-600 text-white rounded-full flex items-center justify-center text-sm font-semibold">
                            <ProfileIcon/>
                        </div>
                        <div className="ml-2">Profile</div>
                    </div>
                ) : (
                    <div className="w-6 h-6 bg-purple-600 text-white rounded-full flex items-center justify-center text-sm font-semibold">
                        <ProfileIcon/>
                    </div>
                )}
            </div>
        </div>
    );
}
