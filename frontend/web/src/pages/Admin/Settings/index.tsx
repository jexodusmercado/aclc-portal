import { Switch } from '@headlessui/react'
import React, { useState } from 'react'
import { Link, NavLink, Outlet } from 'react-router-dom'
import { classNames } from 'utility'



const SettingsPage: React.FC = () => {

    const tabs = [
        { name: 'General', href: '/dashboard/settings', current: true },
        { name: 'School year', href: '/dashboard/settings/school-year', current: false },
    ]


    
    return(
        <main className="flex-1">
            <div className="relative max-w-6xl mx-auto md:px-8 xl:px-0">
                <div className="containerized">
                    <div className="px-4 sm:px-6 md:px-0">
                        <h1 className="leading-6 text-2xl mr-auto">Settings</h1>
                    </div>
                    <div className="px-4 sm:px-6 md:px-0">
                        <div className="py-6">
                            {/* Tabs */}
                            <div className="lg:hidden">
                                <label htmlFor="selected-tab" className="sr-only">
                                    Select a tab
                                </label>
                                <select
                                    id="selected-tab"
                                    name="selected-tab"
                                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                                    defaultValue={tabs.find((tab) => tab.current)!.name}
                                >
                                {
                                    tabs.map((tab) => (
                                        <option key={tab.name}>{tab.name}</option>
                                    ))
                                }
                                </select>
                            </div>
                            <div className="hidden lg:block">
                                <div className="border-b border-gray-200">
                                    <nav className="-mb-px flex space-x-8">
                                    {tabs.map((tab) => (
                                        <NavLink
                                            key={tab.name}
                                            to={tab.href}
                                            className={({isActive}) => classNames(
                                                isActive
                                                ? 'border-blue-500 text-blue-600'
                                                : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700',
                                                'whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm'
                                            )}
                                            end={true}
                                        >
                                            {tab.name}
                                        </NavLink>
                                    ))}
                                    </nav>
                                </div>
                            </div>

                            <Outlet />           
                            
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default SettingsPage