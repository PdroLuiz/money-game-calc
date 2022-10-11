import { useState, DetailedHTMLProps, ButtonHTMLAttributes, MouseEvent } from 'react'
import { BiTrash } from 'react-icons/bi'

export const TrashButton = (props: DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> & { onClick: Function }) => {
  const [focused, setFocused] = useState(false)

  const handleClick = (e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => {
    if (focused) {
      props.onClick(e)
      return
    }
    setFocused(true)
    setTimeout(() => {
      setFocused(false)
    }, 3000)
  }

  return (
    <button {...props}
        onClick={handleClick}
        className={`p-2 ${focused ? 'bg-red-500 text-white rounded' : ''}`}>
      <BiTrash/>
    </button>
  )
}
