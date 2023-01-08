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
        <div className="top-0 right-0 flex min-h-screen w-[80%] flex-col items-center rounded-2xl p-5 pt-32">
          <p className="text-2xl font-bold">Booking Review & Confirmation</p>
          <div className="mb-3 w-full">
            <p>
              Ticket number : <span className="mb-10 text-sm font-bold">XD14NFBA33</span>
            </p>
          </div>
          <div className="mb-3 w-[300px] overflow-x-auto lg:w-full">
            <table border={2} className="w-full border-2">
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
                  <td className="border-b-2 border-r-2 p-3">Premier</td>
                  <td className="border-b-2 border-r-2 p-3 text-right">MATIC 2.000</td>
                  <td className="border-b-2 border-r-2 p-3 text-right">1</td>
                  <td className="border-b-2 p-3 text-right">MATIC 2.000</td>
                </tr>
                <tr>
                  <td colSpan={3} className="border-r-2 border-b-2 p-3">
                    <p>Something</p>
                    <p className="text-sm text-gray-400">
                      Note: Tickets once purchased cannot be refunded
                    </p>
                  </td>
                  <td className="border-b-2 p-3 text-right"></td>
                </tr>
                <tr>
                  <td colSpan={3} className="border-r-2 p-3">
                    <p className="font-bold">Grand Total</p>
                  </td>
                  <td className="p-3 text-right font-bold">MATIC 2.000</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="w-full">
            <Button content="" className="mb-2 rounded-lg bg-primary p-3 px-10 text-white">
              Confirm
            </Button>
          </div>
        </div>
      </div>
    </AppLayout>
  )
}

export default Index
