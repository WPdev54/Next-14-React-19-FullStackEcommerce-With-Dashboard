"use client"

import { ColumnDef } from "@tanstack/react-table"
import { CellAction } from "./cell-actions"
import Image from "next/image"

export type BillBoardColumn = {
  id: string
  label: string
  createdAt: "string"
}

const image = (image:string) => (
  <Image src={image} alt="image" height={20} width={20} />
)

export const columns: ColumnDef<BillBoardColumn>[] = [
  {
    accessorKey: "label",
    header: "Label",
  },
  {
    accessorKey: "createdAt",
    header: "Date",
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction whatisit="" data={row.original} />
  }
]

