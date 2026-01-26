import { getShipment } from "@/controllers/shipmentController"
import InvoiceUI from "./InvoiceUI"

const Page = async ({ params }) => {
  const { id } = await params
  const shipment = await getShipment(id)

  if (!shipment) return null

  return <InvoiceUI shipment={shipment} />
 
}

export default Page
