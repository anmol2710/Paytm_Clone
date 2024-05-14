"use client"
import Loading from '@/components/Loading';
import Navbar from '@/components/Navbar'
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

interface TransactionType {
    amount: number;
    name: string,
    account: string;
    date: string;
    _id: string;
}

interface sessionType {
    data: {
        user: {
            name: string,
            email: string,
            id: string
        }
    },
    status: string
}

export default function Page() {

    const session: sessionType = useSession();
    const router = useRouter()
    const [data, setData] = useState<TransactionType[]>([]);
    const [isLoading, setIsLoading] = useState(true)
    useEffect(() => {

        if (session.status == "unauthenticated") {
            router.push("/signin")
            return
        }

        fetchTransaction()
        setIsLoading(false)
    }, [session.data?.user])

    async function fetchTransaction() {
        if (session.data?.user && session.data?.user.id) {
            const response = await axios.post("api/account/transactions", JSON.stringify({ token: session.data.user.id }))
            const reversed = [...response.data.message].reverse();
            setData(reversed)
        }
    }

    if (isLoading) {
        return <Loading />
    }

    return (
        <div className='w-full pt-10 md:p-10 flex flex-col items-center overflow-auto'>
            <h1 className='text-2xl font-semibold'>Transactions History</h1>
            <div className=' overflow-y-scroll no-scrollbar mt-5 md:mt-10 w-full flex flex-col items-center'>
                {data && data.map(transaction => (
                    <div key={transaction._id} className={` w-[300px] md:w-[400px] h-[100px] m-5 p-5 flex flex-col items-center justify-between ${transaction.amount > 0 ? "bg-green-500" : "bg-red-500"} rounded-lg shadow-red-600 shadow-md`}>
                        <div className=' flex items-center justify-between px-10 w-full'>
                            <p className='text-[20px] font-semibold'>{transaction.name}</p>
                            <p className='text-[20px] font-semibold'>{transaction.amount}</p>
                        </div>
                        <div>
                            <p className=' font-semibold'>{new Date(transaction.date).toLocaleString()}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
