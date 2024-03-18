import primsadb from '@/lib/prismadb'
import { auth } from '@clerk/nextjs'
import { Settings } from 'lucide-react'
import { redirect } from 'next/navigation'
import SettingForm from './Components/settings-form'

interface SettingsProps {
    params: {
        StoreId: string
    }
}

const page: React.FC<SettingsProps> = async ({ params }) => {

    const { userId } = auth()

    if (!userId) {
        redirect('/sign-in')
    }

    const store = await primsadb.store.findFirst({
        where: {
            id: params.StoreId,
            userId
        }
    })

    if(!store){
        redirect('/')
    }

    return (
        <div className='flex-col'>
            <div className="flex-1 space-y-4 p-8 pt-6">
             <SettingForm initialData={store} />
            </div>
        </div>
    )
}

export default page
