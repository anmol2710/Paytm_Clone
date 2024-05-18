"use client"

import React from 'react'
import { useSession } from 'next-auth/react'

const Page = () => {
    const { data, status } = useSession();
    return (
        <div>{JSON.stringify(data?.user?.id)}</div>
    )
}

export default Page