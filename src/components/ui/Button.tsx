// Writing type for button first to clearly showcase what this button takes as input
export interface ButtonProps{
    variant: "primary" | "secondary";
    size: 'sm' | 'md' | 'lg';
    text: string;
    startIcon?: React.ReactNode;
    endIcon?: React.ReactNode;
    extraClass ?: string;
    onClick: ()=>void;
    loading ?: boolean;
}

const Variants = {
    'primary': `transition-all duration-100 flex bg-blue-500 p-2 rounded-md m-2 text-white justify-around hover:bg-blue-800`, 
    'secondary': 'transition-all duration-100 flex bg-purple-300 text-purple-600 m-2 p-2 rounded-md justify-around hover:bg-purple-100',
    'default': 'items-center cursor-pointer'
}

const Sizes = {
    "sm": 'text-sm w-28',
    "md": 'text-md w-32',
    "lg": 'text-lg w-40'
}

export const Button = ({variant, size, text, startIcon, endIcon, extraClass, onClick, loading} :ButtonProps)=>{

    return <button className={[Variants[variant], Sizes[size], extraClass, Variants['default'], (loading? 'opacity-45': '')].join(' ')} onClick={onClick} disabled={loading}><div>{startIcon}</div><div>{text}</div><div>{endIcon}</div></button>
}

