"use client"
import axios from "axios";
import React, { useState } from 'react'
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { signIn } from "next-auth/react";

export default function Signup() {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [cpassword, setCPassword] = useState("");
    const router = useRouter();

    async function handleSignup(e: any) {
        e.preventDefault();

        if (name.length < 2) {
            toast.error("Please enter a valid name")
            return
        }
        else if (password.length < 8) {
            toast.error("Password must be atleast 8 digits")
            return
        }
        else if (password != cpassword) {
            toast.error("Password should be same")
            return
        }

        const response = await signIn("credentials", {
            name: name,
            email: email,
            password: password,
            redirect: false
        })
        console.log(response)
        router.push("/")
    }

    return (
        <>
            <div className="h-screen flex justify-center flex-col">
                <div className="flex justify-center">
                    <a href="#" className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 ">
                        <div className=" flex flex-col items-center">
                            <div>
                                <div className="text-3xl font-extrabold">
                                    Sign up
                                </div>
                            </div>
                            <div className="pt-2">
                                <label className="block mb-2 text-sm text-black font-semibold pt-4">Name</label>
                                <input type="text" id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Name" onChange={e => { setName(e.target.value) }} required />
                                <label className="block mb-2 text-sm text-black font-semibold pt-4">Email</label>
                                <input type="text" id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="abc@gmail.com" onChange={e => { setEmail(e.target.value) }} required />
                                <label className="block mb-2 text-sm text-black font-semibold pt-4">Password</label>
                                <input type="password" id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="********" onChange={e => { setPassword(e.target.value) }} required />
                                <label className="block mb-2 text-sm text-black font-semibold pt-4">Confirm Password</label>
                                <input type="password" id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="********" onChange={e => { setCPassword(e.target.value) }} required />
                                <button type="button" className="mt-8 w-full text-white bg-gray-800 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2" onClick={handleSignup}>Sign up</button>
                            </div>
                        </div>
                    </a>
                </div>
            </div>
            <ToastContainer />
        </>
    )
}
