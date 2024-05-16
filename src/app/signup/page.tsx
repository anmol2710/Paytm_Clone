"use client"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import React, { useState } from 'react'
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { signIn } from "next-auth/react"
import image from "@/asset/image.png"

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
            <div className=" w-screen min-h-screen flex flex-col md:flex-row items-center justify-around">
                <div className="flex items-center justify-center">
                    <div className="mx-auto grid w-[350px] gap-6">
                        <div className="grid gap-2 text-center">
                            <h1 className="text-3xl font-bold">Sign Up</h1>
                            <p className="text-balance text-muted-foreground">
                                Enter your information to create an account
                            </p>
                        </div>
                        <div className="grid gap-4">
                            <div className="grid gap-2">
                                <Label htmlFor="email">Name</Label>
                                <Input
                                    id="name"
                                    type="text"
                                    placeholder="Name"
                                    onChange={e => { setName(e.target.value) }}
                                    required
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="abc@example.com"
                                    onChange={e => { setEmail(e.target.value) }}
                                    required
                                />
                            </div>
                            <div className="grid gap-2">
                                <div className="flex items-center">
                                    <Label htmlFor="password">Password</Label>
                                </div>
                                <Input
                                    id="password"
                                    type="password"
                                    placeholder="********"
                                    onChange={e => { setPassword(e.target.value) }}
                                    required />
                            </div>
                            <div className="grid gap-2">
                                <div className="flex items-center">
                                    <Label htmlFor="password">Confirm Password</Label>
                                </div>
                                <Input
                                    id="password"
                                    type="password"
                                    placeholder="********"
                                    onChange={e => { setCPassword(e.target.value) }}
                                    required />
                            </div>
                            <Button type="submit" className="w-full" onClick={handleSignup}>
                                Create an account
                            </Button>
                            <Button variant="outline" className="w-full">
                                Signup with Google
                            </Button>
                        </div>
                        <div className="mt-4 text-center text-sm">
                            Already have an account?{" "}
                            <Link href="/signin" className="underline">
                                Sign in
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="hidden lg:flex items-center justify-center">
                    <Image
                        src={image}
                        alt="Image"
                        className=" w-[90%] object-contain dark:brightness-[0.2] dark:grayscale"
                    />
                </div>
            </div>
            <ToastContainer />
        </>
    )
}
