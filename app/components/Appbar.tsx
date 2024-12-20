"use client"
import { Music } from "lucide-react";
import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";

export default function Appbar (){
    const session = useSession()
    return <div> 
        <header className="container mx-auto px-4 py-6 flex justify-between items-center border-b-2">
    <Link href="/" className="text-2xl font-bold flex items-center">
      <Music className="mr-2" />
      FanTune
    </Link>
    <nav className="hidden md:flex space-x-4">
      <Link href="#features" className="hover:text-purple-400 transition">Features</Link>
      <Link href="#creators" className="hover:text-purple-400 transition">For Creators</Link>
      <Link href="#fans" className="hover:text-purple-400 transition">For Fans</Link>
    </nav>
            {session.data?.user &&<button className="p-2 border rounded-sm bg-blue-600" onClick={()=>{
           signOut() }}>Logout </button> }
           {! session.data?.user && <button className="p-2 border rounded-sm bg-blue-600" onClick={()=>{signIn()}}> Signin     
             </button>}
        </header>
    </div>
}