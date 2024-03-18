"use client"

import Heading from "@/components/heading"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Plus } from "lucide-react"
import { useParams, useRouter } from "next/navigation"
import { BillBoardColumn, columns } from "./columns"
import { DataTable } from "@/components/ui/data-table"
import { ApiList } from "@/components/ui/api-list"

interface BillboardClientProps  {
    data: BillBoardColumn[]
}

export const BillboardClient:React.FC<BillboardClientProps> = ({data }) => {
    const router = useRouter()
    const params = useParams()
    return (
        <>
            <div className="flex items-center justify-between">
                <Heading title={`Billboards (${data.length})`} description="Manage Your Store BillBoards" />
                <Button onClick={() => router.push(`/${params.StoreId}/billboards/new`)}>
                    <Plus className="mr-2 h-4 w-4" />
                    Add New
                </Button>
            </div>
            <Separator />
            <DataTable columns={columns} data={data} SearchKey="label" />
            <Heading 
                title="API"
                description="Api Calls For Billboard"
            />
            <Separator />
            <ApiList entityName="billboards" entityIdName="billboardId" />
        </>
    )
}