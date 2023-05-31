import {useState} from 'react';
import { FieldValues, useForm } from "react-hook-form";
import useDeleteModal from "../../hooks/useDeleteModal";
import Modal from "./Modal"
import Input from "../Input";
import { ModalProps } from '../../types/data';
import useStore from '../../hooks/useStore';
import axios from 'axios';
import { toast } from 'react-hot-toast';

const DeleteModal:React.FC<ModalProps> =({refresh,setRefresh})=>{
    const deleteModal=useDeleteModal();
    const [isLoading,setIsLoading]=useState(false);
    const id=useStore((state)=>state.modificationId)
    const setId=useStore((state)=>state.setModificationId)

    const {register,formState:{errors},handleSubmit,reset}=useForm<FieldValues>()

    const handleDelete=(data:any)=>{
        console.log(id)
        if(data.delete==="DELETE"){
            setIsLoading(true)
            axios.delete(`/users/${id}`)
            .then(res=>{
                if(res.data?.message==='success'){
                    setId("")
                    toast.success("Successfully deleted");
                    reset();
                    setIsLoading(false)
                    setRefresh(!refresh)
                    deleteModal.onClose()
                }
            })
            .catch(err=>toast.error("Something went wrong"))
        }
        return toast.error("Type DELETE to delete this")
    }
    const bodyContext=(
        <Input
         id="delete"
         label="Type DELETE"
         errors={errors}
         register={register}
         required
        />
    )
    return (
        <Modal
         title="Type DELETE to delete the user"
         actionLabel="Delete"
         isOpen={deleteModal.isOpen}
         onClose={deleteModal.onClose}
         onSubmit={handleSubmit(handleDelete)}
         body={bodyContext}
         disabled={isLoading}
        />
    )
}
export default DeleteModal;