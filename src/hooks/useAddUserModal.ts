import { create } from "zustand";

interface AddUserProps{
    isOpen:boolean;
    onOpen:()=>void;
    onClose:()=>void;
}

const useAddUserModal=create<AddUserProps>((set)=>({
    isOpen:false,
    onOpen:()=>set({isOpen:true}),
    onClose:()=>set({isOpen:false})
}))
export default useAddUserModal;