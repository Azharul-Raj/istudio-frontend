import {useState} from 'react'
import { FieldValues, useForm,SubmitHandler } from 'react-hook-form';
import useUpdateModal from "../../hooks/useUpdateModal";
import Modal from "./Modal"
import Input from '../Input';
import { toast } from 'react-hot-toast';

const UpdateModal=()=>{
    const [isLoading,setIsLoading]=useState(false)
    const updateModal=useUpdateModal();
    const {register,formState:{errors},handleSubmit}=useForm<FieldValues>();

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
        let newHobbies;
        if(hobbies){
          newHobbies=  hobbies.split(',')
        }
        let updatesData;
        if(!name && !email && !phoneNumber && !hobbies){
            return toast.error("Please fill at least a field to update the user")
        }
        return toast.success('Ok')
    }
    return(
        <Modal
         title="Leave empty the file you don't want to update"
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