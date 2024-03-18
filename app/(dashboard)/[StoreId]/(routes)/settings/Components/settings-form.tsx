"use client"

import * as z from "zod";

import Heading from "@/components/heading";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Store } from "@prisma/client";
import { Trash } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import toast from "react-hot-toast";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import { AlertModal } from "@/components/Modals/alert-modal";
import { ApiAlert } from "@/components/ui/api-alert";
import { useOrigin } from "@/hooks/use-origin";

interface SettingFormProps {
    initialData: Store
}

const formSchema = z.object({
    name: z.string().min(3).max(100),
})

type SettingFormValues = z.infer<typeof formSchema>

const SettingForm: React.FC<SettingFormProps> = ({
    initialData
}) => {

    const params = useParams()
    const router = useRouter()

    const origin = useOrigin()

    const [open, setOpen] = useState<boolean>(false)
    const [loading, setLoading] = useState<boolean>(false)

    const form = useForm<SettingFormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: initialData
    })

    const onSumbit = async (data: SettingFormValues) => {
        try {
            setLoading(true)
            await axios.patch(`/api/stores/${params.StoreId}`, data)
            router.refresh()
            toast.success("Successfully Updated Store")
        } catch (error) {
            toast.error("Error Updating Store, Pleasse Try Again")
        } finally {
            setLoading(false)
        }
    }

    const onDelete = async () => {
        try {
            setLoading(true)
            await axios.delete(`/api/stores/${params.StoreId}`)
            router.refresh()
            router.push('/')
            toast.success('Successfully Deleted Store')
        } catch (error) {
            toast.error('Make Sure You Remvoed All Products And Categoried First.')
        } finally{
            setLoading(false)
            setOpen(false)
        }
    }

    return (
        <>
        <AlertModal 
            isOpen={open}
            onClose={() => setOpen(false)}
            onConfirm={onDelete}
            loading={loading}
        />
            <div className="flex items-center justify-between">
                <Heading
                    title="Settings"
                    description="Manage Store Preferences"
                />
                <Button
                    disabled={loading}
                    variant={"destructive"}
                    size={"icon"}
                    onClick={() => {setOpen(true)}}
                >
                    <Trash className="h-4 w-4" />
                </Button>
            </div>
            <Separator />
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSumbit)} className="space-y-8 w-full">
                    <div className="grid grid-cols-3 gap-8">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input disabled={loading} placeholder="Store Name" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <Button disabled={loading} className="ml-auto" type="submit">Save Changes</Button>
                </form>
            </Form>
            <Separator />
            <ApiAlert title="NEXT_PUBLIC_API_URL" description={`${origin}/api/${params.StoreId}`} variant="public" />
        </>
    );
};

export default SettingForm;