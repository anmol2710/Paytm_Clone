import React, { useState, useEffect } from 'react'

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import axios from 'axios';

interface PropsType {
    token: String
}

interface TransactionType {
    amount: number;
    name: string,
    account: string;
    date: string;
    _id: string;
}

const Transactions: React.FC<PropsType> = ({ token }) => {

    const [transactiondata, setTransactionData] = useState<TransactionType[]>([]);

    useEffect(() => {
        fetchTransaction()
    }, [])

    async function fetchTransaction() {
        const response = await axios.post("api/account/transactions", JSON.stringify({ token }))
        const reversed = [...response.data.message].reverse();
        setTransactionData(reversed)
    }

    return (
        <Card x-chunk="dashboard-01-chunk-5">
            <CardHeader>
                <CardTitle>Recent Transactions</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-8">
                {transactiondata.map(transaction => (
                    <>
                        <div className="flex items-center gap-4" key={transaction._id}>
                            <div className="grid gap-1">
                                <p className="text-sm font-medium leading-none">
                                    {transaction.name}
                                </p>
                                <p className="text-sm text-muted-foreground">
                                    {new Date(transaction.date).toLocaleString()}
                                </p>
                            </div>
                            <div className="ml-auto font-medium">₹{transaction.amount}</div>
                        </div>
                    </>
                ))}
            </CardContent>
        </Card>

    )
}

export default Transactions