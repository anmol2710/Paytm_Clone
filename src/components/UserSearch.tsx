"use client"
import React, { useState, useEffect } from 'react'
import { useRouter } from "next/navigation";
import axios from 'axios';

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"
import { Button } from './ui/button';

interface UserType {
    name: string;
    password: string;
    email: string;
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
        <Card
            className="xl:col-span-2" x-chunk="dashboard-01-chunk-4"
        >
            <CardHeader className="flex flex-row items-center justify-between">
                <div className="grid gap-2">
                    <CardTitle>Users</CardTitle>
                </div>
                <form className="flex sm:flex-initial">
                    <div className="relative">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                            type="search"
                            placeholder="Search Users..."
                            onChange={e => { setFilter(e.target.value) }}
                            className="pl-8 w-[200px] md:w-[400px] lg:w-[300px]"
                        />
                    </div>
                </form>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Users</TableHead>
                            <TableHead className="text-right"></TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {users?.map(user => (
                            <TableRow key={user._id}>
                                <TableCell>
                                    <div className=' flex items-center'>
                                        <div className="rounded-full h-10 w-10 bg-black text-white  flex justify-center mt-1 mr-2">
                                            <div className="flex flex-col justify-center h-full text-lg font-semibold">
                                                {user.name.charAt(0).toUpperCase()}
                                            </div>
                                        </div>
                                        <div>
                                            <div className="font-medium"> {user.name}</div>
                                            <div className="hidden text-sm text-muted-foreground md:inline">
                                                {user.email}
                                            </div>
                                        </div>
                                    </div>
                                </TableCell>
                                <TableCell className="text-right"><Button onClick={() => { router.push("/send?id=" + user._id + "&name=" + user.name) }}> Send </Button></TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    )
}

export default UserSearch