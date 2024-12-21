"use client"
import { useEffect, useState } from "react";
import Appbar from "../components/Appbar";
import { ThumbsUp } from "lucide-react";
import { Button } from "@/components/ui/button";
interface Song {
    id: number;
    url: string;
    upvotes: number;
    haveUpvoted: boolean;
    title:string
  }
const creatorId="c413ee6e-6138-4ca6-b072-c00765f4bbc3"
const REFRESH_TIME = 10*1000;
interface alpha {
    upvotes: number
}
export default function StreamView(){
    const [queue,setQueue]= useState<Song[]>([])
    const [url,setUrl]= useState('')
    const [current,setCurrent]= useState<Song[]>([])

    const RefreshStreams=async()=>{
        const res = await fetch(`/api/stream/?creatorId=${creatorId}`,{
            credentials:"include"
        })
        const json = await res.json();
        setQueue(json.streams);


    }
    useEffect(()=>{
  RefreshStreams();
  const interval = setInterval(RefreshStreams,REFRESH_TIME);
  return ()=>clearInterval(interval)
    },[])

    const add_in_queue= async()=>{
   const res= await fetch(`api/stream`,{
        method:"POST",
        body: JSON.stringify({
            creatorId: creatorId  ,
            url:url
        })
    })
}
    const getVideoId = (url: string): string | null => {
        const match = url.match(/(?:https?:\/\/)?(?:www\.)?youtube\.com\/.*v=([^&]+)/) ||
                      url.match(/(?:https?:\/\/)?youtu\.be\/([^?]+)/);
        return match ? match[1] : null;
      };

    const Thumbnail = (url: string) => {
        const videoId = getVideoId(url);
        return videoId ? `https://img.youtube.com/vi/${videoId}/default.jpg` : '';
      };

    
    
    return <div className="bg-slate-500">
        <Appbar/>
        <div className="flex justify-center pt-4 pl-3">
            <input className="text-gray-900 p-2 " type="text" value={url}
            onChange={(e)=>{
                setUrl(e.target.value)
            }} placeholder="put your url"></input>
            <button className="border p-2 bg-blue-500 hover:bg-blue-300" onClick={()=>{
            add_in_queue()
        }}>add stream in queue</button>
        </div>
        <div className="flex justify-center pt-2 ">

        
        <h2 className="text-2xl font-semibold mb-4 text-gray-100 pr-2 pt-2">Upcoming Songs</h2>
        <ul className="space-y-3">
          {queue.map((song) => (
            <li key={song.id} className="flex items-center gap-3 p-3 bg-gray-800 rounded-lg">
              <img 
              src={Thumbnail(song.url)}
              alt='Thumbnail'
              className='w-12 h-12 rounded-sm object-cover'/>
              <Button
                variant="outline"
                size="sm"
                className="flex items-center space-x-1 bg-gray-800 text-white border-gray-700 hover:bg-gray-700"
              >

                <ThumbsUp className="h-5 w-5" />
                <span>{isNaN(song.upvotes) ? 0 : song.upvotes}</span>
              </Button>
              <span className="flex-grow truncate text-gray-300">{song.title}</span>
            </li>
          ))}
        </ul>
        </div>
        
        </div>
}