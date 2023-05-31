import emailjs from '@emailjs/browser';
import { dataProps } from '../hooks/useStore';
import { toast } from 'react-hot-toast';

const sendEmail=(data:dataProps)=>{
    console.log(import.meta.env.VITE_PUBLIC_KEY)
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
    to_email:'azharulislam.raj512@gmail.com'
};
console.log(templateParams)
emailjs.send(`${import.meta.env.VITE_SERVICE_ID}`,`${import.meta.env.VITE_TEMPLATE_ID}`, templateParams, `${import.meta.env.VITE_PUBLIC_KEY}`)
	.then((response) => {
	   toast.success("Email sent successfully")
	}, (err) => {
	//    toast.error('FAILED...', err);
    console.log(err)
	});
}
export default sendEmail;