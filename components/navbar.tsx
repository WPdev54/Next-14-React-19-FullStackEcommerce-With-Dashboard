import { UserButton, auth } from "@clerk/nextjs";
import MainNav from '@/components/mainnav'
import StoreSwitcher from "@/components/store-switcher";
import { redirect } from "next/navigation";
import primsadb from "@/lib/prismadb";

const Navbar = async () => {
    const {userId} = auth()

    if(!userId) {
        redirect('/sign-in')
    }

    const stores = await primsadb.store.findMany({
        where: {
            userId
        }
    })

  return (
    <div className="border-b font-semibold">
        <div className="flex h-16 items-center px-4">
            <StoreSwitcher items={stores} />
            <MainNav className="mx-6"  />
            <div className="ml-auto flex items-center spcae-x-4">
                <UserButton afterSignOutUrl="/" />
            </div>
        </div>
    </div>
  )
}

export default Navbar;
