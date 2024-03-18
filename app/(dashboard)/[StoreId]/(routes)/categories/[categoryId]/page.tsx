import primsadb from "@/lib/prismadb"
import BillboardForm from "./components/billboards-form"

const page = async ({
  params
}: {
  params: {
    categoryId: string
  }
}) => {

  const category = await primsadb.category.findUnique({
    where: {
      id: params.categoryId
    }
  })

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <BillboardForm initialData={category} />
      </div>
    </div>
  )
}

export default page
