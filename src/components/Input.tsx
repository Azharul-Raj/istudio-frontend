import { FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form';

interface inputsProps {
    id: string;
    label: string;
    type?: string;
    disabled?: boolean;
    required?: boolean;
    register: UseFormRegister<FieldValues>;
    errors: FieldErrors
}

function Input({
    id,
    label,
    type,
    disabled,
    required,
    register,
    errors
}: inputsProps) {
    return (
        <div className="w-full my-1 relative">                        
            <input id={id} disabled={disabled} 
            { ...register(id,{required})}
            placeholder=' '
            type={type}
            className={`
            peer w-full ${label==='Hobbies(separate by comma like gamming,reading)' ? 'p-6':'p-4'} bg-white border-2 rounded-md outline-none focus:outline-none transition disabled:opacity-70 disabled:cursor-not-allowed 
            ${errors[id]? " border-rose-500 focus:border-rose-500 ":"border-neutral-300 focus:border-black"}
            `}
            />
            <label className={`absolute text-md duration-150 transform -translate-y-3 top-3 left-3 z-10 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 ${errors[id]?'text-rose-500':"text-zinc-400"}`} htmlFor="">
                {label}
            </label>
        </div>
    )
}

export default Input;