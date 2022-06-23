import React, { Fragment } from 'react'
import { XIcon } from '@heroicons/react/solid';
import { Transition, Dialog } from '@headlessui/react';
import SidebarNavigation from '../SidebarNavigation';
import { IMenu } from 'interfaces';
import DialogTransition from './DialogTransition';

interface IProps {
    sidebarOpen:    boolean
    setSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>
    menu:           IMenu[]

}

const MobileSidebar: React.FC<IProps> = ({sidebarOpen, setSidebarOpen, menu}) => {
    return (
        <DialogTransition sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen}>
            <div className="flex-shrink-0 flex items-center px-4">
                <img
                    className="h-8 w-auto"
                    src="https://tailwindui.com/img/logos/workflow-logo-indigo-600-mark-gray-800-text.svg"
                    alt="Workflow"
                />
            </div>

            <div className="mt-5 flex-1 h-0 overflow-y-auto">
                <SidebarNavigation 
                    items={menu}
                />
            </div>
        </DialogTransition>
                    
    )
}

export default MobileSidebar;