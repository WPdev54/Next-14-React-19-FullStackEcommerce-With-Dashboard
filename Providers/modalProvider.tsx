'use client'

import { AlertModal } from "@/components/Modals/alert-modal"
import { StoreModal } from "@/components/Modals/store-modal"
import { useEffect, useState } from "react"


export const ModalProvider = () => {
    const [isMounted,setIsMounted] = useState<boolean>(false)

    useEffect(()=>{
        setIsMounted(true)
    },[])

    if(!isMounted) {
        return null
    }

    return (<>
    <StoreModal />
    </>  )
}
