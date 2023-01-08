import React from "react"

const Select = ({ items }: Props) => {
  return (
    <select className="transition duration-300 outline-none focus:ring-2 ring-[#19083D] p-3 rounded-2xl text-sm text-slate-500 w-full">
      {items?.map((item, index) => (
        <option key={index} value={item.value || item.number.split(" ").join("-")}>
          {item.number}
        </option>
      ))}
    </select>
  )
}

interface Props {
  items: Item[]
}

interface Item {
  number: string
  value?: string
}

export default Select
