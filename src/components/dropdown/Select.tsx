import React from "react"

const Select = ({ items }: Props) => {
  return (
    <select className="w-full rounded-2xl p-3 text-sm text-slate-500 outline-none ring-[#19083D] transition duration-300 focus:ring-2">
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
