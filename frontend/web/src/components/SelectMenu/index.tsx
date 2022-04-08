/* This example requires Tailwind CSS v2.0+ */
import { Fragment } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, SelectorIcon } from '@heroicons/react/solid'
import { classNames } from 'utility'
import { List } from 'interfaces'



interface Props {
    lists: List[]
    selected: List
    setSelected: React.Dispatch<React.SetStateAction<List>>
    name?: string
    className?: string
}

const SelectMenu: React.FC<Props> = ({selected, setSelected, lists, name, className}) => {

    return (
        <Listbox value={selected} onChange={setSelected}>
            {({ open }) => (
                <div className={`w-full ${className}`}>
                    { name && <Listbox.Label className="block text-sm font-light text-gray-600">{name}</Listbox.Label>}
                    <div className={`mt-1 relative`}>
                        <Listbox.Button className="bg-white relative w-full border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                            <span className="block truncate">{selected.name ?? 'Select..'}</span>
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
                            {lists.map((list) => (
                                <Listbox.Option
                                key={list.id}
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