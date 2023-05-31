import emailjs from '@emailjs/browser';
import { dataProps } from '../hooks/useStore';
import { toast } from 'react-hot-toast';

const sendEmail=(data:dataProps)=>{
    const name=`name:${data.name}`
    const email=`email:${data.email}`
    const phone=`phone:${data.phoneNumber}`
    const hobbies=`hobbies:${data.hobbies}`
const templateParams = {
    message:'Here is your data',
    name: name,
    email:email,
    phoneNumber:phone,
    hobbies:hobbies,
    to_email:'info@redpositive.in'
};
emailjs.send(`${import.meta.env.VITE_SERVICE_ID}`,`${import.meta.env.VITE_TEMPLATE_ID}`, templateParams, `${import.meta.env.VITE_PUBLIC_KEY}`)
	.then((response) => {
        if(response){
            toast.success("Email sent successfully");
        }
       
	}, (err) => {
	   toast.error('FAILED...');
    console.log(err)
	});
}
export default sendEmail;