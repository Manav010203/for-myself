"use client"
import { signIn, signOut, useSession } from "next-auth/react";

export default function Appbar (){
    const session = useSession()
    return <div>
        <div className="flex justify-between">
        <div>
            Practicing 
        </div>
        <div>
            {session.data?.user &&<button className="p-2 border rounded-sm" onClick={()=>{
           signOut() }}>Logout </button> }
           {! session.data?.user && <button className="p-2 border rounded-sm" onClick={()=>{signIn()}}> Signin      </button>}
        </div>
        
        </div>
    </div>
}