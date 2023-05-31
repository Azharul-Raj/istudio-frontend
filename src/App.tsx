import {useEffect,useState} from 'react';
import axios from 'axios';
import toast from 'react-hot-toast'
import Button from "./components/Button"
import AddUserModal from "./components/modal/AddUserModal"
import useAddUserModal from "./hooks/useAddUserModal"
import TableRow from './components/TableRow';
import "./App.css"
import useStore from './hooks/useStore';
import DeleteModal from './components/modal/DeleteModal';
import UpdateModal from './components/modal/UpdateModal';

axios.defaults.baseURL="http://locahost:3001";

function App() {
  const addModal=useAddUserModal();
  const [refresh,setRefresh]=useState(false);
  const[dataList,setDataList]=useState([])
  useEffect(()=>{
    axios.get(`http://localhost:3001/users`)
    .then(res=>{
      console.log(res.data)
      setDataList(res.data?.data)
    })
    .catch(err=>toast.error('something went wrong'))
  },[refresh])
 
  return (
    <>
     <AddUserModal refresh={refresh} setRefresh={setRefresh}/>
     <DeleteModal refresh={refresh} setRefresh={setRefresh}/>
     <UpdateModal/>
      {/* Table */}
      <div className="mx-[5%]">
<div className="relative overflow-x-auto shadow-md sm:rounded-lg">
    <table className="w-full text-sm text-left text-gray-500 ">
        <thead className="text-xs text-gray-200 uppercase bg-gray-900">
            <tr>
                <th scope="col" className="p-4">
                    Select
                </th>
                <th scope="col" className="px-6 py-3">
                    id
                </th>
                <th scope="col" className="px-6 py-3">
                    Name
                </th>
                <th scope="col" className="px-6 py-3">
                    Email
                </th>
                <th scope="col" className="px-6 py-3">
                    Phone
                </th>
                <th scope="col" className="px-6 py-3">
                    Hobbies
                </th>               
                <th scope="col" className="px-6 py-3">
                    Action
                </th>
            </tr>
        </thead>
        <tbody>
          {
            dataList.map((data,i)=><TableRow id={i} data={data} key={i} />)
          }
        </tbody>
    </table>
</div>

      {/* Table */}
     <Button
      label="Add User"
      onClick={addModal.onOpen}
     />
     </div>
    </>
  )
}

export default App
