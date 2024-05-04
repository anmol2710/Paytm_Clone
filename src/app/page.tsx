"use client"
import React, { useEffect, useState } from 'react'
import { useRouter } from "next/navigation";
import axios from 'axios';
import Navbar from '@/components/Navbar';

interface UserType {
  name: string;
  password: string;
  username: string;
  __v: number;
  _id: string;
}


export default function Home() {
  const router = useRouter();
  const [balance, setBalance] = useState(0);
  const [Filter, setFilter] = useState("");
  const [users, setUsers] = useState<UserType[]>();

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      router.push("/signin")
    }
    else {
      fetchBalance()
    }
  }, [router])

  const fetchBalance = async () => {
    const response = await axios.post("/api/account/balance", JSON.stringify({ token: localStorage.getItem("token") }))
    if (response.data.status) {
      setBalance(response.data.message)
    }
  }

  useEffect(() => {
    fetchUsers()
  }, [Filter])

  const fetchUsers = async () => {
    const response = await axios.post("/api/user/bulk", JSON.stringify({ id: localStorage.getItem("token"), filter: Filter }))
    await setUsers(response.data.users)
  }

  return (
    <div className=' w-screen h-screen flex bg-[#00baf2]'>
      <Navbar />
      <div className=' w-full p-10'>
        <div className="flex">
          <div className="font-bold text-lg">
            Your balance
          </div>
          <div className="font-semibold ml-4 text-lg">
            Rs {balance}
          </div>
        </div>

        <div className="font-bold mt-6 text-lg">
          Users
        </div>
        <div className="my-2">
          <input onChange={(e) => {
            setFilter(e.target.value)
          }} type="text" placeholder="Search users..." className="w-full px-2 py-1 border rounded border-slate-200"></input>
        </div>
        <div>
          {users && users.map(user => (<div key={user._id}>
            <div className="flex justify-between">
              <div className="flex">
                <div className="rounded-full h-12 w-12 bg-[#042e6f] text-white text-xl flex justify-center mt-1 mr-2">
                  <div className="flex flex-col justify-center h-full text-xl">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                </div>
                <div className="flex flex-col justify-center h-ful">
                  <div className=' text-lg'>
                    {user.name}
                  </div>
                </div>
              </div>

              <div className="flex flex-col justify-center h-ful">
                <button className='bg-[#042e6f] text-white rounded-lg px-10 py-2' onClick={() => { router.push("/send?id=" + user._id + "&name=" + user.name) }}>Send Money</button>
              </div>
            </div>
          </div>))}
        </div>
      </div >
    </div>
  );
}