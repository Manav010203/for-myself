"use client"
import { useState } from "react";
import Appbar from "../components/Appbar";
const creatorId="289c4bcd-14c6-4a9b-ab08-671e70efc09b"
export default function StreamView(){
    const [queue,setQueue]= useState()
    const [url,setUrl]= useState('')

    const add_in_queue= async()=>{
   const res= await fetch(`api/stream`,{
        method:"POST",
        body: JSON.stringify({
            creatorId: creatorId  ,
            url:url
        })
    })
    }
    return <div>
        <Appbar/>
        
        Dashboard
        <div className="flex justify-center col-start-3">
            <input className="text-gray-900 p-2 " type="text" value={url}
            onChange={(e)=>{
                setUrl(e.target.value)
            }} placeholder="put your url"></input>
        </div>
        <div className="flex justify-center pt-2 ">

        <button className="border p-2 bg-blue-500 hover:bg-blue-300" onClick={()=>{
            add_in_queue()
        }}>add stream in queue</button>
        </div>
        
        </div>
}