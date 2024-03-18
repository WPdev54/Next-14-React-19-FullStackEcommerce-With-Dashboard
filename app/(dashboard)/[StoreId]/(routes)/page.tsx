import primsadb from '@/lib/prismadb'
import React from 'react'

interface DashboardPageProps {
  params: {StoreId:string}
}

const page: React.FC<DashboardPageProps> = async ({
  params
}) => {
  const store = await primsadb.store.findFirst({
    where : {
      id:params.StoreId
    }
  })
  return (
    <div className='text-xl'>
      Active Store : {store?.name}
    </div>
  )
}

export default page
