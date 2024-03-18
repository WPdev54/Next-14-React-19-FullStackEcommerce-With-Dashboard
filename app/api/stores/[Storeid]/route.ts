import primsadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs"
import { NextResponse } from "next/server"

export async function PATCH(
    req: Request,
    { params }: { params: { Storeid: string } }
) {
    try {
        const {userId} = auth()
        const body = await req.json()

        const {name} = body;

        if(!userId){
            return new NextResponse("Unauthorized", {status: 401})
        }

        if(!name){
            return new NextResponse("Name Is Required", {status: 400})
        }

        if(!params.Storeid){
            return new NextResponse("Storeid Is Required", {status: 400})
        }

        const store = await primsadb.store.updateMany({
            where:{
                id:params.Storeid,
                userId
            },
            data:{
                name
            }
        })

        return NextResponse.json(store)

    } catch (error) {
        console.log('[STORES_PATCH]', error)
        return new NextResponse("Internal Error", { status: 500 })
    }
}

export async function DELETE(
    req: Request,
    { params }: { params: { Storeid: string } }
) {
    try {
        const {userId} = auth()

        if(!userId){
            return new NextResponse("Unauthorized", {status: 401})
        }

        if(!params.Storeid){
            return new NextResponse("Storeid Is Required", {status: 400})
        }

        const store = await primsadb.store.deleteMany({
            where:{
                id:params.Storeid,
                userId
            },
        })

        return NextResponse.json(store)

    } catch (error) {
        console.log('[STORES_DELETE]', error)
        return new NextResponse("Internal Error", { status: 500 })
    }
}