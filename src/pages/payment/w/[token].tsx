import axios from "axios"
import { useQRCode } from "next-qrcode"
import React, { SetStateAction } from "react"
import nextId from "react-id-generator"
import Button from "../../../components/button/Button"
import AppLayout from "../../../components/layout/AppLayout"
import OrganizerLayout from "../../../components/layout/OrganizerLayout"

declare global {
  interface Window {
    snap: any
  }
}

const Index = ({ data }: any) => {
  const handleClick = () => {
    if (typeof window !== "undefined")
      window.snap.pay(data, {
        onSuccess: function (result: any) {
          /* You may add your own implementation here */
          alert("payment success!")
          console.log(result)
        },
        onPending: function (result: any) {
          /* You may add your own implementation here */
          alert("wating your payment!")
          console.log(result)
        },
        onError: function (result: any) {
          /* You may add your own implementation here */
          alert("payment failed!")
          console.log(result)
        },
        onClose: function () {
          /* You may add your own implementation here */
          alert("you closed the popup without finishing the payment")
        },
      })
  }

  return (
    <AppLayout>
      <div className="flex items-center justify-center font-poppins">
        <div className="flex flex-col items-center min-h-screen rounded-2xl top-0 right-0 w-[80%] pt-32 p-5">
          <p className="text-2xl font-bold">Booking Review & Confirmation</p>
          <div className="w-full mb-3">
            <p>
              Ticket number : <span className="font-bold text-sm mb-10">XD14NFBA33</span>
            </p>
          </div>
          <div className="lg:w-full w-[300px] mb-3 overflow-x-auto">
            <table border={2} className="border-2 w-full">
              <thead>
                <tr>
                  <th className="border-b-2 border-r-2 p-3 text-left">Ticket Category</th>
                  <th className="border-b-2 border-r-2 p-3 text-right">Cost per tiket</th>
                  <th className="border-b-2 border-r-2 p-3 text-right">Quantity</th>
                  <th className="border-b-2 p-3 text-right">Total</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border-b-2 p-3 border-r-2">Premier</td>
                  <td className="border-b-2 p-3 border-r-2 text-right">MATIC 2.000</td>
                  <td className="border-b-2 p-3 border-r-2 text-right">1</td>
                  <td className="border-b-2 p-3 text-right">MATIC 2.000</td>
                </tr>
                <tr>
                  <td colSpan={3} className="p-3 border-r-2 border-b-2">
                    <p>Something</p>
                    <p className="text-sm text-gray-400">
                      Note: Tickets once purchased cannot be refunded
                    </p>
                  </td>
                  <td className="p-3 text-right border-b-2"></td>
                </tr>
                <tr>
                  <td colSpan={3} className="p-3 border-r-2">
                    <p className="font-bold">Grand Total</p>
                  </td>
                  <td className="p-3 text-right font-bold">MATIC 2.000</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="w-full">
            <Button content="" className="rounded-lg p-3 bg-primary text-white mb-2 px-10">
              Confirm
            </Button>
          </div>
        </div>
      </div>
    </AppLayout>
  )
}

export default Index
