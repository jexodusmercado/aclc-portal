import { Listbox, Transition } from '@headlessui/react';
import { SelectorIcon, CheckIcon } from '@heroicons/react/solid';
import { ListWithAvatar } from 'interfaces';
import React, { Fragment } from 'react'
import { classNames } from 'utility';

interface IProps {
    list: ListWithAvatar[]
    selectedAvatars : ListWithAvatar[]
    setSelectedAvatars: React.Dispatch<React.SetStateAction<ListWithAvatar[]>>
    className?: string
    placeholderText?: string
}


const MultipleSelectMenu: React.FC<IProps> = ({list, selectedAvatars, setSelectedAvatars, className, placeholderText = "Select.." }) => {

    return (
        <Listbox value={selectedAvatars} onChange={setSelectedAvatars} multiple>
            {({ open }) => (
                <>
                    <div className={`mt-1 w-full relative ${className}`}>
                        <Listbox.Button className="relative w-full bg-white border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                            <div className='flex flex-wrap space-x-2'>
                                {
                                    !selectedAvatars.length &&
                                    <>
                                        <span className="flex items-center">
                                            <span className="ml-3 block truncate text-gray-400">{placeholderText}</span>
                                        </span>
                                        <span className="ml-3 absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                                            <SelectorIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                                        </span>
                                    </>
                                }
                                
                                {
                                    selectedAvatars.map((selected, index) => (
                                        <div key={index}>
                                            <span className="inline-flex rounded-full items-center py-0.5 pl-2.5 pr-2.5 text-sm font-medium bg-indigo-100 text-blue-700">
                                                <img src={selected.avatar} alt="" className="flex-shrink-0 h-6 w-6 rounded-full" />
                                                <span className="ml-3 block truncate">{selected.name}</span>
                                                <button
                                                    type="button"
                                                    className="flex-shrink-0 ml-0.5 h-4 w-4 rounded-full inline-flex items-center justify-center text-blue-400 hover:bg-indigo-200 hover:text-blue-500 focus:outline-none focus:bg-blue-500 focus:text-white"
                                                    onClick={(e) => {
                                                        e.preventDefault()
                                                        setSelectedAvatars(selectedAvatars.filter(avatar => avatar.id !== selected.id))
                                                    }}
                                                >
                                                    <svg className="h-2 w-2" stroke="currentColor" fill="none" viewBox="0 0 8 8">
                                                        <path strokeLinecap="round" strokeWidth="1.5" d="M1 1l6 6m0-6L1 7" />
                                                    </svg>
                                                </button>
                                            </span>
                                            <span className="ml-3 absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                                                <SelectorIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                                            </span>
                                        </div>
                                    ))
                                }
                            </div>
                            
                        </Listbox.Button>

                        <Transition
                        show={open}
                        as={Fragment}
                        leave="transition ease-in duration-100"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                        >
                        <Listbox.Options className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-56 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
                            {list.map((item, index) => (
                            <Listbox.Option
                                key={index}
                                className={({ active }) =>
                                classNames(
                                    active ? 'text-white bg-indigo-600' : 'text-gray-900',
                                    'cursor-default select-none relative py-2 pl-3 pr-9'
                                )
                                }
                                value={item}
                            >
                                {({ selected, active }) => (
                                <>
                                    <div className="flex items-center">
                                        <img src={item.avatar} alt="" className="flex-shrink-0 h-6 w-6 rounded-full" />
                                        <span
                                            className={classNames(selected ? 'font-semibold' : 'font-normal', 'ml-3 block truncate')}
                                        >
                                            {item.name}
                                        </span>
                                    </div>

                                    {
                                        selected ? (
                                        <span
                                            className={classNames(
                                            active ? 'text-white' : 'text-indigo-600',
                                            'absolute inset-y-0 right-0 flex items-center pr-4'
                                            )}
                                        >
                                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                        </span>
                                        ) : null
                                    }
                                </>
                                )}
                            </Listbox.Option>
                            ))}
                        </Listbox.Options>
                        </Transition>
                    </div>
                </>
            )}
        </Listbox>
    )
}

export default MultipleSelectMenu;