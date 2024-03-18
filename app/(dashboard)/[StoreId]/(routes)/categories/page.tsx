import Heading from "@/components/heading";
import React from "react";
import { CategoryClient } from "./components/client";
import primsadb from "@/lib/prismadb";
import { CategoryColumn } from "./components/columns";
import {format} from 'date-fns'

const page = async ({
  params
}: {
  params: { StoreId: string }
}) => {

  const categories = await primsadb.category.findMany({
    where: {
      storeId: params.StoreId
    },
    include: {
      billboard: true
    },
    orderBy: {
      createdAt: "desc"
    }
  });


  const formattedCategories: CategoryColumn[] = categories.map(item => ({
    id: item.id,
    name: item.name,
    billboardLabel: item.billboard.label,
    createdAt: format(item.createdAt, 'MMMM do, yyyy') as unknown as "string"
  }));

  

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <CategoryClient data={formattedCategories} />
      </div>
    </div>
  );
};


export default page;
