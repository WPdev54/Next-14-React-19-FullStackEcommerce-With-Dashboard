import primsadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs"
import { NextResponse } from "next/server"

export async function GET(
    req: Request,
    { params }: { params: { billboardId: string } }
) {
    try {

        if(!params.billboardId){
            return new NextResponse("Storeid Is Required", {status: 400})
        }

        const billboard = await primsadb.store.findUnique({
            where:{
                id:params.billboardId
             },
        })

        return NextResponse.json(billboard)

    } catch (error) {
        console.log('[BILLBOARD_GET]', error)
        return new NextResponse("Internal Error", { status: 500 })
    }
}

export async function PATCH(
    req: Request,
    { params }: { params: { StoreId: string, billboardId: string } }
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

        if(!params.billboardId){
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

        const billboard = await primsadb.billboard.updateMany({
            where:{
                id:params.billboardId,
            },
            data:{
                label,
                imageUrl
            }
        })

        return NextResponse.json(billboard)

    } catch (error) {
        console.log('[BILLBOARD_PATCH]', error)
        return new NextResponse("Internal Error", { status: 500 })
    }
}

export async function DELETE(
    req: Request,
    { params }: { params: { StoreId: string, billboardId: string } }
) {
    try {
        const {userId} = auth()

        if(!userId){
            return new NextResponse("Unauthorized", {status: 401})
        }

        if(!params.billboardId){
            return new NextResponse("StoreId Is Required", {status: 400})
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

        const billboard = await primsadb.billboard.deleteMany({
            where:{
                id:params.billboardId
             },
        })

        return NextResponse.json(billboard)

    } catch (error) {
        console.log('[BILLBOARD_DELETE]', error)
        return new NextResponse("Internal Error", { status: 500 })
    }
}

