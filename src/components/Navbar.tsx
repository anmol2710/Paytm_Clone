import React from 'react'
import Image from "next/image"
import logo from "@/asset/image.png"
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const Navbar = () => {
    const router = useRouter();
    function handleLogout() {
        localStorage.removeItem("token");

        router.push("/signin")
    }

    return (
        <div className=' w-[400px] py-5 px-2 bg-[#042e6f] rounded-r-[20px] flex flex-col items-center justify-between gap-[50px]'>
            <div className=' flex flex-col items-center'>
                <Image className=' w-[200px]' src={logo} alt='' />
                <nav className=' w-full px-10'>
                    <ul className=' w-full flex flex-col items-center gap-[10px]'>
                        <li className='text-white w-full text-center p-5 rounded-lg text-2xl font-semibold'><Link href="/">Dashboard</Link></li>
                        <li className='text-white w-full text-center p-5 rounded-lg text-2xl font-semibold'><Link href="/history">History</Link></li>
                    </ul>
                </nav>
            </div>
            <div className=' w-full'>
                <button className='w-full bg-red-600 p-3 rounded-2xl text-white text-xl font-bold' onClick={handleLogout}>Logout</button>
            </div>
        </div>
    )
}

export default Navbar