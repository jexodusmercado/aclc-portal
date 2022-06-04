import { Disclosure, Transition } from '@headlessui/react'
import React from 'react'

interface ListData {
    id:         number
    person: {
        image:  string
        name:   string
    }
    body:       string
    createdAt:  string
} 

interface IProps {
    lists: ListData[]
}

const Feeds : React.FC<IProps> = ({lists}) => {

    return(
        <>
            <Disclosure>
                <Disclosure.Button> View {lists.length} Comments</Disclosure.Button>

                <Transition
                    enter="transition duration-100 ease-out"
                    enterFrom="transform scale-95 opacity-0"
                    enterTo="transform scale-100 opacity-100"
                    leave="transition duration-75 ease-out"
                    leaveFrom="transform scale-100 opacity-100"
                    leaveTo="transform scale-95 opacity-0"
                >
                    <Disclosure.Panel>

                        <ul className="divide-y divide-gray-200">
                            {lists.map((list) => (
                                <li key={list.id} className="py-4">
                                    <div className="flex space-x-3">
                                        <img className="h-6 w-6 rounded-full" src={list.person.image} alt="" />
                                        <div className="flex-1 space-y-1">
                                            <div className="flex items-center justify-between">
                                                <h3 className="text-sm font-medium">{list.person.name}</h3>
                                                <p className="text-sm text-gray-500">{list.createdAt}</p>
                                            </div>
                                            <p className="text-sm text-gray-500">
                                                {list.body}
                                            </p>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>

                    </Disclosure.Panel>
                </Transition>
            </Disclosure>
        </>
    )

}

export default Feeds