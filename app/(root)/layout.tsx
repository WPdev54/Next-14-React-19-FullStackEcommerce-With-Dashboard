import primsadb from "@/lib/prismadb"
import { auth } from "@clerk/nextjs"
import { redirect } from "next/navigation"

export default async function Layout({
    children
}:{
    children:React.ReactNode
}) {
    const {userId} = auth()

    if(!userId) {
        redirect('/sign-in')
    }

    const store = await primsadb.store.findFirst({
        where: {
            userId
        }
    })

    if(store) {
        redirect(`/${store.id}`)
    }

    return (
        <>
            {children}
        </>
    )

}