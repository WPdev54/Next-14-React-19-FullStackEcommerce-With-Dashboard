"use client"

import { useEffect, useState } from "react";
import { Modal } from "../ui/modal";
import { Button } from "../ui/button";
import toast from "react-hot-toast";

interface AlertModalProps {
    isOpen: any;
    onClose: () => void;
    onConfirm: () => void;
    loading: any
}

export const AlertModal: React.FC<AlertModalProps> = ({ isOpen, onClose, onConfirm, loading }) => {
    const [isMounted, setIsMounted] = useState<boolean>(false)

    useEffect(() => {
        setIsMounted(true)
    }, [])

    if(!isMounted) return null



    return(
        <>
            <Modal 
                title="Are You Sure"
                description="This Actions Can Not Be Undone"
                isOpen={isOpen}
                onClose={onClose}
                // customField={true}
            >
                <div className="pt-6 spcae-x-2 gap-3 flex items-center justify-end w-full">
                    <Button disabled={loading} variant={"outline"} onClick={onClose}>
                        Cancel
                    </Button>
                    <Button disabled={loading} variant={"destructive"} onClick={onConfirm}>
                        Delete
                    </Button>
                </div>
            </Modal>
        </>
    )
}