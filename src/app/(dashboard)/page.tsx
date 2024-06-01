import React from 'react';
import axios from 'axios';
import UserSearch from '@/components/UserSearch';
import Transactions from '@/components/Transactions';

import {
  DollarSign,
} from "lucide-react"

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import { getServerSession } from 'next-auth';
import { authOption } from '@/lib/authOptions';
import { redirect } from 'next/navigation';


export default async function Dashboard() {

  let balance = 0
  const session = await getServerSession(authOption)
  
  if(!session){
    redirect("/signin")
  }
  const token = session.user.id

  if (token) {
    const response = await axios.post(`${process.env.WEBSITE_URL}/api/account/balance` , {token})

    if(response.data.status){
      balance = response.data.message;
    }
  }


  return (
    <div className="flex min-h-screen w-full flex-col">
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
          <Card x-chunk="dashboard-01-chunk-0">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Balance
              </CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">₹{balance}</div>
            </CardContent>
          </Card>
        </div>
        <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
          {token && <UserSearch token={token} />}
          {token && <Transactions token={token} />}
        </div>
      </main>
    </div>
  )
}
