"use client"
import { useRouter } from "next/navigation";
import React, { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { signIn } from "next-auth/react";
import Image from "next/image"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import image from "@/asset/image.png"

export default function Signin() {
    const router = useRouter()
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    async function handleSignin(e: any) {
        e.preventDefault();

        if (password.length < 8) {
            toast.error("Password must be atleast 8 digits")
            return
        }

        const response = await signIn("credentials", {
            email: email,
            password: password,
            redirect: false
        })
        console.log(response)
        router.push("/")
    }

    return (
        <>
            <div className="w-screen min-h-screen flex flex-col md:flex-row items-center justify-around">
                <div className="flex items-center justify-center py-12">
                    <div className="mx-auto grid w-[350px] gap-6">
                        <div className="grid gap-2 text-center">
                            <h1 className="text-3xl font-bold">Sign in</h1>
                            <p className="text-balance text-muted-foreground">
                                Enter your email below to Sign in to your account
                            </p>
                        </div>
                        <div className="grid gap-4">
                            <div className="grid gap-2">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="abc@example.com"
                                    required
                                    onChange={e => { setEmail(e.target.value) }}
                                />
                            </div>
                            <div className="grid gap-2">
                                <div className="flex items-center">
                                    <Label htmlFor="password">Password</Label>
                                </div>
                                <Input
                                    id="password"
                                    type="password"
                                    required
                                    placeholder="********"
                                    onChange={e => { setPassword(e.target.value) }} />
                            </div>
                            <Button type="submit" className="w-full" onClick={handleSignin}>
                                Sign in
                            </Button>
                            <Button variant="outline" className="w-full">
                                Sign in with Google
                            </Button>
                        </div>
                        <div className="mt-4 text-center text-sm">
                            Don&apos;t have an account?{" "}
                            <Link href="/signup" className="underline">
                                Sign up
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="hidden bg-muted lg:flex items-center justify-center">
                    <Image
                        src={image}
                        alt="Image"
                        className=" h-[95%] object-contain dark:brightness-[0.2] dark:grayscale"
                    />
                </div>
            </div>
            <ToastContainer />
        </>
    )
}
