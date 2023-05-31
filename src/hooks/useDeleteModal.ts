import { create } from "zustand";

interface DeleteModalProps{
    isOpen:boolean;
    onOpen:()=>void;
    onClose:()=>void;
}

const useDeleteModal=create<DeleteModalProps>((set)=>({
    isOpen:false,
    onOpen:()=>set({isOpen:true}),
    onClose:()=>set({isOpen:false})
}))
export default useDeleteModal;