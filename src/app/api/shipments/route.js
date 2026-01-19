import { createShipment, getAllShipments, getShipments } from "@/controllers/shipmentController";

export async function POST(req){  
  return createShipment(req)
}


export async function GET() {
  return getAllShipments()
}
