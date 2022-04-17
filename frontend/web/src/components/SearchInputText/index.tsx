import SearchIcon from '@heroicons/react/solid/SearchIcon'
import React from 'react'

interface Props {
    state: string
    setState: React.Dispatch<React.SetStateAction<string>>
    onChange: (value: string) => void
    className?: string
}

const SelectInputText: React.FC<Props> = ({state, setState, onChange, className}) => {
    return (
        <div className={`w-full ${className}`}>
            <label htmlFor="search" className="block text-sm font-light text-gray-600">
                Search
            </label>
            <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute  inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <SearchIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                </div>
                <input
                    type="input"
                    name="search"
                    id="search"
                    className="input-text pl-10"
                    onChange={e => setState(e.currentTarget.value)}
                    value={state}
                />
            </div>
        </div>
    )
}

export default SelectInputText