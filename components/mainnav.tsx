'use client'

import { cn } from "@/lib/utils"
import Link from "next/link"
import { useParams, usePathname } from "next/navigation"

const Mainnav = ({
    className,
    ...props
}: React.HTMLAttributes<HTMLElement>) => {

    const pathname = usePathname()
    const params = useParams()
    console.log(params)

    const routes = [
        {
            href: `/${params.StoreId}`,
            label: 'Overview',
            active: pathname === `/${params.StoreId}`,
        },
        {
            href: `/${params.StoreId}/settings`,
            label: 'Settings',
            active: pathname === `/${params.StoreId}/settings`,
        },
        {
            href: `/${params.StoreId}/billboards`,
            label: 'Billboards',
            active: pathname === `/${params.StoreId}/billboards`,
        },
        {
            href: `/${params.StoreId}/categories`,
            label: 'Categories',
            active: pathname === `/${params.StoreId}/categories`,
        },
    ]

    return (
        <nav
            className={cn('flex items-center font-semibold space-x-4 lg:space-x-6', className)}
        >
            {routes.map((r) => (
               <div className="group">
                 <Link key={r.href} className={cn('',r.active && 'text-violet-950')} href={r.href}>{r.label}</Link>
                <div className={cn('w-0 h-[2px] bg-blue-950 group-hover:w-full transition-all duration-300',r.active && 'w-full')} />
               </div>
            ))}
        </nav>
    )
}

export default Mainnav
