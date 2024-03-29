"use client"

import Heading from "@/components/heading"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Plus } from "lucide-react"
import { useParams, useRouter } from "next/navigation"
import { CategoryColumn, columns } from "./columns"
import { DataTable } from "@/components/ui/data-table"
import { ApiList } from "@/components/ui/api-list"

interface CategoryClientProps  {
    data: CategoryColumn[]
}

export const CategoryClient:React.FC<CategoryClientProps> = ({data }) => {
    const router = useRouter()
    const params = useParams()
    return (
        <>
            <div className="flex items-center justify-between">
                <Heading title={`Categories (${data.length})`} description="Manage Your Store Categories" />
                <Button onClick={() => router.push(`/${params.StoreId}/categories/new`)}>
                    <Plus className="mr-2 h-4 w-4" />
                    Add New
                </Button>
            </div>
            <Separator />
            <DataTable columns={columns} data={data} SearchKey="name" />
            <Heading 
                title="API"
                description="Api Calls For Categories"
            />
            <Separator />
            <ApiList entityName="categories" entityIdName="categoryId" />
        </>
    )
}