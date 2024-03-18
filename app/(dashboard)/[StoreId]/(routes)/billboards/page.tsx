import Heading from "@/components/heading";
import React from "react";
import { BillboardClient } from "./components/client";
import primsadb from "@/lib/prismadb";
import { BillBoardColumn } from "./components/columns";
import {format} from 'date-fns'

const page = async ({
  params
}: {
  params: { StoreId: string }
}) => {

  const billboards = await primsadb.billboard.findMany({
    where: {
      storeId: params.StoreId
    },
    orderBy: {
      createdAt: "desc"
    }
  });


  const formattedBillboards: BillBoardColumn[] = billboards.map(item => ({
    id: item.id,
    label: item.label,
    image: item.imageUrl,
    createdAt: format(item.createdAt, 'MMMM do, yyyy') as unknown as "string"
  }));

  

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <BillboardClient data={formattedBillboards} />
      </div>
    </div>
  );
};


export default page;
