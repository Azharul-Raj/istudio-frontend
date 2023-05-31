import useDeleteModal from '../hooks/useDeleteModal';
import useStore, { dataProps } from '../hooks/useStore';
import useUpdateModal from '../hooks/useUpdateModal';
import sendEmail from '../libs/sendEmail';
interface TableRowProps{
    data:{
        _id:string;
        name:string;
    email:string;
    phoneNumber:string;
    hobbies:string[]
    }
    id:number;
}

const TableRow:React.FC<TableRowProps> =({data,id})=>{
    const deleteModal=useDeleteModal();
    const updateModal=useUpdateModal()
    // row id states
    const rowId=useStore((state)=>state.id);
    const setRowId=useStore((state)=>state.setId);
    // modification id states
    const setModificationId=useStore((state)=>state.setModificationId);
    const {_id,email,hobbies,name,phoneNumber}=data; 

    const handleData=(data:dataProps)=>{
        sendEmail(data)
    }
    // handle Delete 
    const handleDeleteButton=(id:string)=>{
        deleteModal.onOpen()
        setModificationId(id);
        setRowId("")
    }
    // handleUpdate
    const handleUpdateButton=(id:string)=>{
        updateModal.onOpen()
        setModificationId(id)
        setRowId("")
    }
    return(
        <tr className="bg-white border-b  hover:bg-gray-50">
                <td  className="w-4 p-4">
                    <div  className="flex items-center">
                        <input onChange={()=>setRowId(_id)} checked={rowId===_id} id="checkbox-table-search-1" type={`checkbox`} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500  0 focus:ring-2"/>
                        {/* <label htmlFor="checkbox-table-search-1" className="sr-only">checkbox</label> */}
                    </div>
                </td>
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                    {id+1}
                </th>
                <td className="px-6 py-4">
                    {name}
                </td>
                <td className="px-6 py-4">
                    {email}
                </td>
                <td className="px-6 py-4">
                    {phoneNumber}
                </td>
                <td className="px-6 py-4">
                    {hobbies.map((hobby,i)=><span key={i}>{hobby},</span>)}
                </td>                
                <td className="flex items-center justify-center px-6 py-4 space-x-3">
                   { rowId===_id?
                   <button onClick={()=>handleData(data)} className='p-2 bg-red-600 text-white rounded-lg'>Send Email</button>
                   :
                   <>
                   <button onClick={()=>handleUpdateButton(_id)} className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</button>
                    <button onClick={()=>handleDeleteButton(_id)} className="font-medium text-red-600 dark:text-red-500 hover:underline">Remove</button>
                    </>}
                </td>
            </tr>
    )
}
export default TableRow;