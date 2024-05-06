import React from 'react'
import Image from "next/image"
import logo from "@/asset/image.png"
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { FaHome } from "react-icons/fa";
import { FaHistory } from "react-icons/fa";



const Navbar = () => {
    const pathname = usePathname();
    const router = useRouter();
    function handleLogout() {
        localStorage.removeItem("token");

        router.push("/signin")
    }

    return (
        <>
            <div className=' hidden w-[400px] py-5 px-2 bg-[#042e6f] rounded-r-[20px] md:flex flex-col items-center justify-between gap-[50px]'>
                <div className=' flex flex-col items-center'>
                    <Image className=' w-[200px]' src={logo} alt='' />
                    <nav className=' w-full px-10'>
                        <ul className=' w-full flex flex-col items-center gap-[10px]'>
                            <li className={`text-white w-full text-center p-5 rounded-lg text-2xl font-semibold ${pathname === "/" ? "bg-[#7C55E7]" : ""}`}><Link href="/" className=' flex gap-2 items-center'> <FaHome /> Dashboard</Link></li>
                            <li className={`text-white w-full text-center p-5 rounded-lg text-2xl font-semibold ${pathname === "/history" ? "bg-[#7C55E7]" : ""}`}><Link href="/history" className=' flex gap-2 items-center'> <FaHistory /> History</Link></li>
                        </ul>
                    </nav>
                </div >
                <div className=' w-full'>
                    <button className='w-full bg-red-600 p-3 rounded-2xl text-white text-xl font-bold' onClick={handleLogout}>Logout</button>
                </div>
            </div >
            <div className=' md:hidden w-screen bg-[#042e6f] flex items-center justify-evenly text-white p-2'>
                <Link href={"/"} className={` flex flex-col items-center p-3 text-xl font-semibold ${pathname === "/" ? "bg-[#7C55E7]" : ""} rounded-lg`}>
                    <FaHome />
                    Dashboard
                </Link>
                <Link href={"/history"} className={` flex flex-col items-center p-3 text-xl font-semibold ${pathname === "/history" ? "bg-[#7C55E7]" : ""} rounded-lg`}>
                    <FaHistory />
                    History
                </Link>
            </div>
        </>
    )
}

export default Navbar