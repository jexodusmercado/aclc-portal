import Avatar from 'components/Avatar'
import React, { Dispatch, SetStateAction, useRef } from 'react'
import { useSelector } from 'react-redux'
import { getAuthUser } from 'redux/auth/selector'

interface IProps {
    setState:  Dispatch<SetStateAction<string>>
    onSubmit: () => void,
    ref?: React.MutableRefObject<null>
}

const TextArea: React.FC<IProps> = ({onSubmit, setState}) => {
  const user = useSelector(getAuthUser)

  const textArea = useRef(null);

  return (
    <div className="flex items-start space-x-4">
      <div className="flex-shrink-0">
        <Avatar
          name={user.first_name + ' ' + user.last_name}
          avatar={user.image}
          rounded
          height={8}
          width={8}
        />
        {/* <img
          className="inline-block h-10 w-10 rounded-full"
          src="https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
          alt=""
        /> */}
      </div>
      <div className="min-w-0 flex-1">
        <form action="#" className="relative">
          <div className="border border-gray-300 rounded-lg shadow-sm overflow-hidden focus-within:border-indigo-500 focus-within:ring-1 focus-within:ring-indigo-500">
            <label htmlFor="comment" className="sr-only">
              Add your comment
            </label>
            <textarea
              rows={1}
              name="comment"
              id="comment"
              className="block w-full py-3 border-0 resize-none focus:ring-0 sm:text-sm"
              placeholder="Add your comment..."
              onChange={(e) => {
                setState((e.target as any).value)
              }}
              onFocus={(e) => setState((e.target as any).value)}
              ref={textArea}

            />

            {/* Spacer element to match the height of the toolbar */}
            <div className="py-2" aria-hidden="true">
              {/* Matches height of button in toolbar (1px border + 36px content height) */}
              <div className="py-px">
                <div className="h-9" />
              </div>
            </div>
          </div>

          <div className="absolute bottom-0 inset-x-0 pl-3 pr-2 py-2 flex justify-end">
            <div className="flex-shrink-0">
              <button
                type="button"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                onClick={() => {
                  onSubmit();
                  (textArea.current as any).value = null;
                }}
                onFocus={() => setState((textArea.current as any).value)}
              >
                Post
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default TextArea;