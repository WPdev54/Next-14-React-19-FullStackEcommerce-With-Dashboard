import primsadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs"
import { NextResponse } from "next/server"

export async function POST (
    req: Request,
    {params} : { params: {StoreId:string} }
) {
    try {
        const {userId} = auth()
        const body = await req.json()

        const {label,imageUrl} = body;

        if(!userId){
            return new NextResponse("Unauthorized", {status: 401})
        }

        if(!label){
            return new NextResponse("Name Is Required", {status: 400})
        }

        if(!imageUrl){
            return new NextResponse("ImageUrl Is Required", {status: 400})
        }

        if(!params.StoreId){
            return new NextResponse("Storeid Is Required", {status: 400})
        }

        const storeById = await primsadb.store.findFirst({
            where:{
                id:params.StoreId,
                userId
            }
        })

        if(!storeById){
            return new NextResponse("Store Not Found", {status: 404})
        }

        const billboard = await primsadb.billboard.create({
            data:{
                label,
                imageUrl,
                storeId:params.StoreId
            }
        })

        return NextResponse.json(billboard)

    } catch (error) {
        console.log('[BILLBOARD_POST]', error)
        return new NextResponse("Internal Error" , {status:500})
    }
}


export async function GET  (
    req: Request,
    {params} : { params: {StoreId:string} }
) {
    try {
        if(!params.StoreId){
            return new NextResponse("Storeid Is Required", {status: 400})
        }

        const billboards = await primsadb.billboard.findMany({
           where:{
               storeId:params.StoreId
           }
        })

        return NextResponse.json(billboards )

    } catch (error) {
        console.log('[BILLBOARD_GET]', error)
        return new NextResponse("Internal Error" , {status:500})
    }
}