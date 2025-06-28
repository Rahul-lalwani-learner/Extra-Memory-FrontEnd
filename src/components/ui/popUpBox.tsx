import type { ReactElement } from "react";

interface PopupProps{
    children : ReactElement
}
export function PopUpBox({children}: PopupProps){
    return <div className="fixed flex h-full w-full justify-center items-center z-100 overflow-hidden">
        <div className="border border-stone-300 rounded-lg m-2 p-2 bg-white shadow-lg">
            {children}
        </div>
    </div>
}