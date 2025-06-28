import type { Dispatch, ReactElement, SetStateAction } from "react";
import { RightArrowIcon } from "../../icons/rightArrowIcon";
import { LeftArrowIcon } from "../../icons/leftArrowIcon";


interface SideBarProps{
    title: string,
    logo: ReactElement; 
    listItems: Record<string, ReactElement>;
    size: 'lg' | 'sm';
    isMd: boolean;
    isOpen: boolean;
    setSideBarStatus: Dispatch<SetStateAction<boolean>>;
    children?: ReactElement; // For profile component; 
    setContentType : Dispatch<SetStateAction<string>>;
}

export function SideBar({title, logo, listItems, size, isMd, isOpen, setSideBarStatus, children, setContentType}:SideBarProps){ 

    
    
    return <div className={`w-full min-h-screen h-full border-r border-stone-100 flex flex-col`}>
        <div className="flex p-2 flex-start items-center pb-4 m-1">
            <div className="text-purple-600 ">{logo}</div>
            {size=='lg'? <div className="text-lg font-bold pl-2">{title}</div>: ''}
        </div>
        <div className="flex flex-col text-stone-800 flex-1">
            {Object.entries(listItems).map(([key, element]) => (
                <ListItem key={key} listname={key} element={element} size={size} setContentType={setContentType}></ListItem>
            ))}
        </div>
        
        {/* Bottom section with profile and sidebar toggle */}
        <div className="mt-auto">
            {/* Profile section - passed as children */}
            {children}
            
            {/* Sidebar toggle */}
            {!isMd && <div className="cursor-pointer m-2 p-2 hover:bg-gray-300 hover:text-purple-600 rounded-lg" onClick={()=>{
                setSideBarStatus(c => !c); 
            }}>
                {isOpen? <LeftArrowIcon/>: <RightArrowIcon/>}
            </div>}
        </div>
    </div>
}


interface ListItemProps{
    listname: string, 
    element: ReactElement, 
    size: 'sm' | 'lg', 
    setContentType : Dispatch<SetStateAction<string>>
}

function ListItem({listname, element, size, setContentType}: ListItemProps){
    const listItemSize = {
        'sm': element, 
        'lg': <div className="flex"><div>{element}</div><div className="ml-2">{listname}</div></div>
    }

    const contentType: Record<string, string> = {
        'All Content' : 'all', 
        'Documents': 'text', 
        'Videos': 'video', 
        'Images': 'image', 
        'Audios': 'audio', 
        'Links': 'link', 
        'Tags': 'tags'
    }

    return <div className="transition duration-100 flex flex-row items-center p-2 m-2 cursor-pointer hover:bg-gray-300 hover:text-purple-600 rounded-lg" onClick={()=>{setContentType(contentType[listname])}}>
        {listItemSize[size]}
    </div>
}