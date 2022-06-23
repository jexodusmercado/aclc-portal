import React, { Fragment, useState } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { MenuAlt2Icon, BellIcon } from '@heroicons/react/solid'
import { Link, useLocation } from 'react-router-dom'
import Avatar from 'components/Avatar'
import { BASE_URL } from 'services/api'
import { classNames } from 'utility'
import { useUserData, useIsomorphicLayoutEffect } from 'hooks'
import { useActiveSchoolYear } from 'hooks/schoolyear'
import { ActiveSchoolYearState } from 'redux/school-year/types'
import { logoutRequest } from 'redux/auth/action'
import { useDispatch } from 'react-redux'
import { GetActiveSchoolYear } from 'redux/school-year/action'

const userNavigation = [
    { name: 'Your Profile', href: '#' },
    { name: 'Settings', href: '#' },
    { name: 'Sign out', href: 'logout' },
]

interface IProps {
    setSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const Topbar: React.FC<IProps> = ({setSidebarOpen}) => {
    const dispatch              = useDispatch()
    const user                  = useUserData()
    const location              = useLocation()
    const schoolyear            = useActiveSchoolYear()

    const [school, setSchool]   = useState<ActiveSchoolYearState>(schoolyear)

    const handleLogout = () => {
        dispatch(logoutRequest())
    }

    useIsomorphicLayoutEffect(() => {
        setSchool(schoolyear)
    }, [schoolyear])

    useIsomorphicLayoutEffect(() => {
        if(schoolyear.ID === 0){
            dispatch(
                GetActiveSchoolYear()
            )
        }
    }, [location.pathname])

    return (
        <div className="sticky top-0 z-10 flex-shrink-0 flex h-16 bg-white shadow">
            <button
                type="button"
                className="px-4 border-r border-gray-200 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 md:hidden"
                onClick={() => setSidebarOpen(true)}
            >
                <span className="sr-only">Open sidebar</span>
                <MenuAlt2Icon className="h-6 w-6" aria-hidden="true" />
            </button>
            <div className="flex-1 px-4 flex justify-end">
                <div className="ml-4 flex items-center md:ml-6 space-x-2">

                    <span className="text-gray-600 text-sm">
                        S. Y.
                        {
                            school.semester === "First" ? 
                            `${school.school_year} - ${Number(school.school_year) + 1}` :
                            `${Number(school.school_year) - 1} - ${school.school_year}` 
                        }
                    </span>
                
                    <button
                        type="button"
                        className="bg-white p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        <span className="sr-only">View notifications</span>
                        <BellIcon className="h-6 w-6" aria-hidden="true" />
                    </button>
                    
                    {/* Profile dropdown */}
                    <Menu as="div" className="ml-3 relative">
                        <div>
                            <Menu.Button className="items-center text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                            <span className="sr-only">Open user menu</span>
                            <Avatar
                                name={user.first_name + ' ' + user.last_name}
                                avatar={BASE_URL + "/" + user.image}
                                width={8}
                                height={8}
                                rounded
                            />
                            </Menu.Button>
                        </div>
                        <Transition
                            as={Fragment}
                            enter="transition ease-out duration-100"
                            enterFrom="transform opacity-0 scale-95"
                            enterTo="transform opacity-100 scale-100"
                            leave="transition ease-in duration-75"
                            leaveFrom="transform opacity-100 scale-100"
                            leaveTo="transform opacity-0 scale-95"
                        >
                            <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                                {userNavigation.map((item) => (
                                    <Menu.Item key={item.name}>
                                    {({ active }) => (
                                        item.href !== "logout" ?
                                        <Link
                                        to={item.href}
                                        className={classNames(
                                            active ? 'bg-gray-100' : '',
                                            'block px-4 py-2 text-sm text-gray-700'
                                        )}
                                        
                                        >
                                            {item.name}
                                        </Link>
                                        :
                                        <button 
                                        className='block px-4 py-2 text-sm text-gray-700'
                                        onClick={() => handleLogout()}
                                        >
                                            {item.name}
                                        </button>
                                    )}
                                </Menu.Item>
                            ))}
                            </Menu.Items>
                        </Transition>
                    </Menu>

                </div>
            </div>
        </div>
    )
}

export default Topbar