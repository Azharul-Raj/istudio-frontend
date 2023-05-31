import {useState} from 'react'
import { FieldValues, useForm,SubmitHandler } from 'react-hook-form';
import useUpdateModal from "../../hooks/useUpdateModal";
import Modal from "./Modal"
import Input from '../Input';
import { toast } from 'react-hot-toast';
import axios from 'axios';
import useStore from '../../hooks/useStore';
import { ModalProps } from '../../types/data';

const UpdateModal:React.FC<ModalProps> =({refresh,setRefresh})=>{
    const [isLoading,setIsLoading]=useState(false)
    const updateModal=useUpdateModal();
    const id=useStore((state)=>state.modificationId);
    const setId=useStore((state)=>state.setModificationId);
    const {register,formState:{errors},handleSubmit,reset}=useForm<FieldValues>();

    const bodyContext=(
        <>
        <Input
         id="name"
         label="Name"
         errors={errors}
         register={register}
         key={'1'}         
        />
        <hr />
        <Input
         id="email"
         label="Email"
         errors={errors}
         register={register}
         type="email"
         key={'2'}         
        />
        <hr />
         <Input
         id="phoneNumber"
         label="PhoneNumber"
         errors={errors}
         register={register}
         key={'3'}         
        />
        <hr />
         <Input
         id="hobbies"
         label="Hobbies(separate by comma like gamming,reading)"
         errors={errors}
         register={register}
         key={'4'}         
        />
        </>
    )

    // handleUpdate function
    const handleUpdate:SubmitHandler<FieldValues> =(data)=>{
        const {name,email,phoneNumber,hobbies}=data;
        let updatedData={};
       
        if(!name && !email && !phoneNumber && !hobbies){
            return toast.error("Please fill at least a field to update the user")
        }
        if(name){
            updatedData={...updatedData,name}
        }
        if(email){
            updatedData={...updatedData,email}
        }
        if(phoneNumber){
            updatedData={...updatedData,phoneNumber}
        }
        if(hobbies){
            updatedData={...updatedData,hobbies:hobbies.split(",")}
        }
        setIsLoading(true)
        axios.put(`/users/${id}`,updatedData)
        .then(res=>{
            if(res.data?.message==='success'){
                toast.success("Update success")
                setRefresh(!refresh)
                setIsLoading(false);
                reset()
                setId("")
                updateModal.onClose()
            }
        })
        .catch(err=>{
            toast.error("Something went wrong");
            console.log(err)
        })
    }
    return(
        <Modal
         title="Fill any field that you want to update"
         isOpen={updateModal.isOpen}
         onClose={updateModal.onClose}
         disabled={isLoading}
         actionLabel='Update'
         body={bodyContext}
         onSubmit={handleSubmit(handleUpdate)}
        />
    )
}
export default UpdateModal;