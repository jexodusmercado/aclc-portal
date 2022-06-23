/* This example requires Tailwind CSS v2.0+ */
import { Fragment, useState } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, SelectorIcon } from '@heroicons/react/solid'
import { classNames } from 'utility'
import { ListWithAvatar } from 'interfaces'
import Avatar from 'components/Avatar'
import { useIsomorphicLayoutEffect } from 'hooks'

interface Props {
    lists: ListWithAvatar[]
    selected: number | undefined
    setSelected: React.Dispatch<React.SetStateAction<number | undefined>>
    name?: string
    className?: string
    placeholderText? : string
    isDisabled?: boolean
}

const SelectMenu: React.FC<Props> = ({selected, setSelected, lists, name, className, placeholderText = "Select..", isDisabled = false}) => {
    const [select, setSelect] = useState<ListWithAvatar | undefined>(undefined)


    useIsomorphicLayoutEffect(() => {
        if(selected){
            const selectedList = lists.find((list) => list.id === selected)
            console.log(selectedList)

            setSelect(selectedList)
        }
    },[selected, setSelected])

    useIsomorphicLayoutEffect(() => {
        if(select) {
            setSelected(select.id)
        }
    },[select])

    return (
        <Listbox value={select} onChange={setSelect} disabled={isDisabled}>
            {({ open }) => (
                <div className={`w-full ${className}`}>
                    { name && <Listbox.Label className="block text-sm font-light text-gray-600">{name}</Listbox.Label>}
                    <div className={`${name ? 'mt-1' : ''} relative`}>
                        <Listbox.Button className="bg-white relative w-full border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default disabled:cursor-not-allowed disabled:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                            <span className="flex items-center space-x-2">
                                {
                                    select?.avatar ? 
                                    <Avatar
                                        name={select?.name ?? ''}
                                        avatar={select.avatar}
                                        rounded
                                        height={9}
                                        width={9}
                                    />
                                    // <img src={select.avatar} alt="" className="flex-shrink-0 h-6 w-6 rounded-full" />
                                    :
                                    null
                                }
                                {
                                    select ?
                                    <span className="block truncate">{select.name ?? 'Select..'}</span>
                                    :
                                    <span className="block truncate">{placeholderText}</span>
                                }
                                
                                
                            </span>
                            <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                                <SelectorIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                            </span>
                        </Listbox.Button>

                        <Transition
                            show={open}
                            as={Fragment}
                            leave="transition ease-in duration-100"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <Listbox.Options className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
                            {lists.map((list, index) => (
                                <Listbox.Option
                                key={index}
                                className={({ active }) =>
                                    classNames(
                                    active ? 'text-white bg-indigo-600' : 'text-gray-900',
                                    'cursor-default select-none relative py-2 pl-3 pr-9'
                                    )
                                }
                                value={list}
                                >
                                {({ selected, active }) => (
                                    <>
                                    <span className={classNames(selected ? 'font-semibold' : 'font-normal', 'block truncate')}>
                                        {list.name}
                                    </span>

                                    {selected ? (
                                        <span
                                        className={classNames(
                                            active ? 'text-white' : 'text-indigo-600',
                                            'absolute inset-y-0 right-0 flex items-center pr-4'
                                        )}
                                        >
                                        <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                        </span>
                                    ) : null}
                                    </>
                                )}
                                </Listbox.Option>
                            ))}
                            </Listbox.Options>
                        </Transition>
                    </div>
                </div>
            )}
        </Listbox>
    )
}

export default SelectMenu