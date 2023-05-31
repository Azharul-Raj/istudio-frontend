
interface ButtonProps{
    label:string;
    onClick:(e:React.MouseEvent<HTMLButtonElement>)=>void;
    disabled?:boolean;
}

const Button:React.FC<ButtonProps> =({label,onClick,disabled})=>{
    return (
        <button
        onClick={onClick}
        disabled={disabled}
        className="relative disabled:opacity-70 disabled:cursor-not-allowed rounded-lg bg-rose-500 text-white py-3 focus:outline-none px-4 w-full"
        >
            {label}
        </button>
    )
}
export default Button;