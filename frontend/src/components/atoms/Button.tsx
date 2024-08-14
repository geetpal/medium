import { MouseEvent } from "react";

interface ButtonLabel {
    label: string;
    onClick: (e: MouseEvent<HTMLButtonElement>)=> void
    className?: string
 
}

export const Button = ({label, className, onClick}: ButtonLabel) =>{
    return <div className="w-full"><button type="button" 
    onClick={onClick}
    className={`text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 ${className}`}>{label}</button>
</div>
}