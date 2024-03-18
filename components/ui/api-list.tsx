"use client"

import { useOrigin } from "@/hooks/use-origin"
import { useParams } from "next/navigation"
import { ApiAlert } from "./api-alert"

interface APILISTPROPS {
    entityName: string,
    entityIdName: string
}

export const ApiList: React.FC<APILISTPROPS> = ({entityName, entityIdName}) => {

    const params = useParams()
    const origin = useOrigin()

    const baseUrl = `${origin}/api/${params.StoreId}`

    return(
        <div>
            <ApiAlert title="GET" variant="public" description={`${baseUrl}/${entityName}`} />
            <ApiAlert title="GET" variant="public" description={`${baseUrl}/${entityName}/{${entityIdName}}`} />
            <ApiAlert title="POST" variant="admin" description={`${baseUrl}/${entityName}/new`} />
            <ApiAlert title="PATCH" variant="admin" description={`${baseUrl}/${entityName}/{${entityIdName}}`} />
            <ApiAlert title="DELETE" variant="admin" description={`${baseUrl}/${entityName}/{${entityIdName}}`} />
        </div>
    )
}




