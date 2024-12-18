import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { YT_REGEX } from "../lib/YT-regex";
//@ts-expect-error :ef ef
import youtubesearchapi from "youtube-search-api"
import { prisma } from "../lib/db";

const CreatorSchema = z.object({
    creatorid : z.string(),
    url: z.string()
})
export async function POST(req:NextRequest) {
    try 
    {
        const data = await CreatorSchema.parse(await req.json()) ;
    const isYt = data.url.match(YT_REGEX)
    const videoId = data.url ? data.url.match(YT_REGEX)?.[1]:null
    if(!isYt || !videoId){
        return NextResponse.json({
            message: "invalid url"
        },{
            status:400
        })
    }
    const res = await youtubesearchapi.GetVideoDetails(videoId)
    const thumbnails = res.thumbnail.thumbnails;
    thumbnails.sort((a:{width:number}, b: {width:number})=>
    a.width<b.width ? -1:1);
    const stream = await prisma.stream.create({
        data:{
            userId: data.creatorid,
            url: data.url,
            extractedId:videoId,
            type: "Youtube",
            title: res.title ?? " can't find title",
            smallImg: (thumbnails.length > 1
                ? thumbnails[thumbnails.length - 2].url
                : thumbnails[thumbnails.length - 1].url) ??
              "https://cdn.pixabay.com/photo/2024/02/28/07/42/european-shorthair-8601492_640.jpg",
              largeImg: thumbnails[thumbnails.length - 1].url ??
                "https://cdn.pixabay.com/photo/2024/02/28/07/42/european-shorthair-8601492_640.jpg"
        }
    })
    return NextResponse.json({
        ...stream
    })
}
catch(e){
    return NextResponse.json({
        message :"Erro while adding stream "
    }, {status:411})
}
}