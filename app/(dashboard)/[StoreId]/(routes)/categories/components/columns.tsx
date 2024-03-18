"use client"

import { ColumnDef } from "@tanstack/react-table"
import { CellAction } from "./cell-actions"
import Image from "next/image"

export type CategoryColumn = {
  id: string
  name: string
  billboardLabel: string
  createdAt: "string"
}

const image = (image:string) => (
  <Image src={image} alt="image" height={20} width={20} />
)

export const columns: ColumnDef<CategoryColumn>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "billboard",
    header: "Billboard",
    cell: ({row}) => row.original.billboardLabel
  },
  {
    accessorKey: "createdAt",
    header: "Date"
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction whatisit="" data={row.original} />
  }
]

