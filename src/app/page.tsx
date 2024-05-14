"use client"
import React, { useEffect, useState } from 'react'

import axios from 'axios';
import Navbar from '@/components/Navbar';
import { useSession } from 'next-auth/react';
import UserSearch from '@/components/UserSearch';
import { useRouter } from 'next/navigation';
import Loading from '@/components/Loading';

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

export default function Home() {
  const router = useRouter()
  const session: sessionType = useSession();

  const [balance, setBalance] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {

    if (session.status == "unauthenticated") {
      router.push('/signin');
      return
    }


    if (session.data?.user && session.data?.user.id) {

      axios.post("/api/account/balance", JSON.stringify({ token: session.data.user.id }))
        .then(response => {
          if (response.data.status) {
            setBalance(response.data.message)
            setIsLoading(false)
          }
        })
    }

  }, [session.data?.user, router, session])

  if (isLoading) {
    return <Loading />
  }

  return (
    <div className=' w-full p-10'>
      <div className="flex">
        <div className="font-bold text-lg">
          Your balance
        </div>
        <div className="font-semibold ml-4 text-lg">
          Rs {balance}
        </div>
      </div>
      {session.data?.user?.id && <UserSearch token={session.data?.user?.id} />}
    </div >
  );
}