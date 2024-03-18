"use client"

import { Button } from '@/components/ui/button';
import { useStoreModal } from '@/hooks/use-store-modal';
import React, { useEffect } from 'react';

const SetupPage = () => {
  const onOpen = useStoreModal((state) => state.onOpen)
  const isOpen = useStoreModal((state) => state.isOpen)
  const onClose = useStoreModal((state) => state.onClose)

  useEffect(()=>{
    if(!isOpen) {
      onOpen()
    }
  }, [isOpen,onOpen])

  
  return null
};

export default SetupPage;