import React from 'react'
import { NavLink } from 'react-router-dom'
import { classNames } from 'utility'
import { IMenu } from 'interfaces'

interface IProp {
    items: IMenu[]
}

const SidebarNavigation : React.FC<IProp> = ({items}) => {
    return (
        <nav className="px-2 space-y-1">
            {items.map((item) => (
                <NavLink
                key={item.name}
                to={item.href}
                className={ ({isActive}) => classNames(
                    isActive ? 'bg-gray-100 text-gray-900' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900',
                    'group flex items-center px-2 py-2 text-sm font-medium rounded-md'
                )}
                end={item.end}
                >
                    {({isActive}) => 
                        <>
                            <item.icon
                                className={classNames(
                                isActive ? 'text-gray-500' : 'text-gray-400 group-hover:text-gray-500',
                                'mr-3 flex-shrink-0 h-6 w-6'
                                )}
                                aria-hidden="true"
                            />
                            {item.name}
                        </>
                    }
                </NavLink>
            ))}
            </nav>
    )
}

export default SidebarNavigation;