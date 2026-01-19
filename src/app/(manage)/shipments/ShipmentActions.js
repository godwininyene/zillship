'use client'
import { FaReceipt } from "react-icons/fa"
import { useRouter } from "next/navigation"

export default function ShipmentActions({ shipmentId }) {
  const router = useRouter()

  const handleViewInvoice = () => {
    router.push(`/shipments/invoice/${shipmentId}`)
  }

  return (
    <button 
      className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
      onClick={handleViewInvoice}
      title="View Invoice"
    >
      <FaReceipt className="h-4 w-4" />
    </button>
  )
}