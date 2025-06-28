export function Overlay({visiblity}: {visiblity: 'hidden' | 'block'}){
    return <div className={`${visiblity} absolute top-0 h-full w-full backdrop-blur-sm z-50 overflow-hidden`}></div>
}