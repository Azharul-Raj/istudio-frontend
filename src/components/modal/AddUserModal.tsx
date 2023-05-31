import useAddUserModal from "../../hooks/useAddUserModal";
import {useForm,FieldValues,SubmitHandler, set} from 'react-hook-form'
import Input from "../Input";
import Modal from "./Modal"
import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-hot-toast";
import useStore from "../../hooks/useStore";
import { ModalProps } from "../../types/data";


const AddUserModal:React.FC<ModalProps> =({refresh,setRefresh})=>{
    const userModal=useAddUserModal();
    const [isLoading,setIsLoading]=useState(false);
    // const setRefresh=useStore((state)=>state.setRefresh)
    // const refresh=useStore((state)=>state.refresh)
    

    const {register,handleSubmit,formState:{errors},reset}=useForm<FieldValues>({
        defaultValues:{
            name:"",
            email:"",
            phoneNumber:"",
            hobbies:[]
        }
    })

    const bodyContext=(
        <>
        <Input
         id="name"
         label="Name"
         errors={errors}
         register={register}
         required
         key={'1'}         
        />
        <hr />
        <Input
         id="email"
         label="Email"
         errors={errors}
         register={register}
         type="email"
         required
         key={'2'}         
        />
        <hr />
         <Input
         id="phoneNumber"
         label="PhoneNumber"
         errors={errors}
         register={register}
         required
         key={'3'}         
        />
        <hr />
         <Input
         id="hobbies"
         label="Hobbies(separate by comma like gamming,reading)"
         errors={errors}
         register={register}
         required
         key={'4'}         
        />
        </>
    )

    // onSubmit
    const onSubmit:SubmitHandler<FieldValues> =(data)=>{
        const hobbies=data.hobbies.split(",")
        setIsLoading(true)
        axios.post(`/users`,{...data,hobbies:hobbies})
        .then(res=>{
            console.log(res.data)
            if(res?.data?.message==='success'){
                setIsLoading(false)
                reset()
                toast.success('Data saved successfully')
                setRefresh(!refresh)
                userModal.onClose();                
            }
        })
        .catch(err=>console.log(err))
        console.log(data)
    }
    return(
        <Modal
         title="Add User"
         isOpen={userModal.isOpen}
         onClose={userModal.onClose}
         actionLabel="SAVE"
         body={bodyContext}
         onSubmit={handleSubmit(onSubmit)}
         key={'userModal'}
         disabled={isLoading}
        />
    )
}

export default AddUserModal;