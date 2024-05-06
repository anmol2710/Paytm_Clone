"use client"
import Navbar from '@/components/Navbar';
import axios from 'axios';
import { useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Send() {
    const [loading, setLoading] = useState(true);
    const [id, setId] = useState('');
    const [name, setName] = useState('');
    const [amount, setAmount] = useState(0);

    const searchParams = useSearchParams();

    useEffect(() => {
        const fetchSearchParams = async () => {
            const id = searchParams.get('id');
            const name = searchParams.get('name');

            if (id && name) {
                setId(id);
                setName(name);
                setLoading(false);
            }
        };

        fetchSearchParams();
    }, [searchParams]);

    async function handleTransfer() {
        if (amount <= 0) {
            toast.error("Amount must be greater than 0")
            return
        }
        const response = await axios.post("/api/account/transfer", JSON.stringify({ amount, name, to: id, from: localStorage.getItem("token") }))
        if (response.data.status) {
            toast.success(response.data.message)
        }
        else {
            toast.error(response.data.message)
        }
    }

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className=" w-screen h-screen flex flex-col-reverse md:flex-row justify-between bg-gray-100">
            <Navbar />
            <div className="h-full w-full flex flex-col items-center justify-center">
                <div
                    className="border h-min text-card-foreground max-w-md p-4 space-y-8 w-80 md:w-96 bg-white shadow-lg rounded-lg"
                >
                    <div className="flex flex-col space-y-1.5 p-6">
                        <h2 className="text-3xl font-bold text-center">Send Money</h2>
                    </div>
                    <div className="p-6">
                        <div className="flex items-center space-x-4">
                            <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center">
                                <span className="text-2xl text-white">{name?.charAt(0).toUpperCase()}</span>
                            </div>
                            <h3 className="text-2xl font-semibold">{name}</h3>
                        </div>
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <label
                                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                    htmlFor="amount"
                                >
                                    Amount (in Rs)
                                </label>
                                <input
                                    onChange={(e) => {
                                        setAmount(parseFloat(e.target.value));
                                    }}
                                    type="number"
                                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                                    id="amount"
                                    placeholder="Enter amount"
                                />
                            </div>
                            <button onClick={handleTransfer} className=" justify-center rounded-md text-sm font-medium ring-offset-background transition-colors h-10 px-4 py-2 w-full bg-green-500 text-white">
                                Initiate Transfer
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
}
