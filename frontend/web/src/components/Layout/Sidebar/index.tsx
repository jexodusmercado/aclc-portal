import { IMenu } from 'interfaces';
import React from 'react'
import SidebarNavigation from '../SidebarNavigation';
import Logo from 'assets/images/aclc.jpeg'

interface IProps {
    menu: IMenu[]
}

const Sidebar: React.FC<IProps> = ({menu}) => {
    return(
        <div className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0">
            <div className="flex flex-col flex-grow border-r border-gray-200 pt-5 bg-white overflow-y-auto">
                <div className="flex items-center flex-shrink-0 px-4">
                    <img
                        className="h-16 w-auto"
                        src={Logo}
                        alt="AMA Computer Learning Center - Mabalacat"
                    />
                </div>
                
                <div className="mt-5 flex-grow flex flex-col">
                    <SidebarNavigation 
                        items={menu}
                    />
                </div>
            
            </div>
        </div>

    )
}

export default Sidebar;