"use client"
import React, { useState, useEffect } from 'react'
import { useRouter } from "next/navigation";
import axios from 'axios';

interface UserType {
    name: string;
    password: string;
    username: string;
    __v: number;
    _id: string;
}

interface propsType {
    token: string
}

const UserSearch: React.FC<propsType> = ({ token }) => {

    const router = useRouter();
    const [Filter, setFilter] = useState("");
    const [users, setUsers] = useState<UserType[]>();

    const fetchUsers = async () => {
        const response = await axios.post("/api/user/bulk", JSON.stringify({ id: token, filter: Filter }))
        setUsers(response.data.users)
    }

    useEffect(() => {
        fetchUsers()
    }, [Filter])

    return (
        <div>
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
                            <button className='bg-[#042e6f] text-white rounded-lg px-10 py-2' onClick={() => { router.push("/send?id=" + user._id + "&name=" + user.name) }}>Send</button>
                        </div>
                    </div>
                </div>))}
            </div>
        </div>
    )
}

export default UserSearch