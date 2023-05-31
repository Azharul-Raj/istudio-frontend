import { create } from "zustand";

export interface dataProps {
  _id: string;
  name: string;
  email: string;
  phoneNumber: string;
  hobbies: string[];
}

interface StoreProps {
  id: string;
  setId: (value: string) => void;
  modificationId: string;
  setModificationId: (value: string) => void;
  refresh:boolean;
  setRefresh:(value:boolean)=>void;
}

const useStore = create<StoreProps>((set) => ({
  id: "",
  setId: (value) => set(() => ({ id: value })),
  modificationId: "",
  setModificationId: (value) => set(() => ({ modificationId: value })),
  refresh:false,
  setRefresh:(value)=>set(()=>({refresh:!value}))
}));

export default useStore;
