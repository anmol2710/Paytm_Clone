"use client"
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSession } from 'next-auth/react'; // Import Session type
import UserSearch from '@/components/UserSearch';
import { useRouter } from 'next/navigation';
import Loading from '@/components/Loading';

interface UserType {
  name: string;
  email: string;
  id: string;
}

interface sessionType {
  data: {
    user: UserType;
  };
  status: string;
}

export default function Home() {
  const [balance, setBalance] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [session, setSession] = useState<sessionType | null>(null);

  const router = useRouter();
  const { data, status } = useSession();

  useEffect(() => {

    if (status === "unauthenticated") {
      router.push("/signin")
      return
    }

    if (data) {
      const sessionData: sessionType = {
        data: {
          user: data.user as UserType,
        },
        status: status,
      };
      setSession(sessionData);
    }
  }, [data, status, router]);

  useEffect(() => {
    if (session && session.data.user.id) {
      axios.post("/api/account/balance", JSON.stringify({ token: session.data.user.id }))
        .then(response => {
          if (response.data.status) {
            setBalance(response.data.message);
            setIsLoading(false);
          }
        });
    }
  }, [session]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className='w-full p-10'>
      <div className="flex">
        <div className="font-bold text-lg">
          Your balance
        </div>
        <div className="font-semibold ml-4 text-lg">
          Rs {balance}
        </div>
      </div>
      {session?.data?.user?.id && <UserSearch token={session.data.user.id} />}
    </div>
  );
}
