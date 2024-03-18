import Navbar from "@/components/navbar"
import primsadb from "@/lib/prismadb"
import { auth } from "@clerk/nextjs"
import { redirect } from "next/navigation"

export default async function Dashboard({
    children,
    params
}:{
    children:React.ReactNode,
    params:{ storeId: string }
}) {
    const {userId} = auth()

    if(!userId){
        redirect('/sign-in')
    }

    const store = await primsadb.store.findFirst({
        where: {
            id:params.storeId,
            userId
        }
    })

    if(!store) {
        redirect('/')
    }

    return(
        <>
            <Navbar />
            {children}
        </>
    )

}