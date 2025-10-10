import React from 'react';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import Sidebar from '@/components/dashboard/Sidebar';

interface SheetSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const SheetSidebar = ({ isOpen, onClose }: SheetSidebarProps) => {
  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent side="left" className="w-[17.625rem]">
        <SheetHeader className="hidden">
          <SheetTitle></SheetTitle>
          <SheetDescription></SheetDescription>
        </SheetHeader>
        <Sidebar isSheet={true} closeSheet={onClose} />
      </SheetContent>
    </Sheet>
  );
};

export default SheetSidebar;
