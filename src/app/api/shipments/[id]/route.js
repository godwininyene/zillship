import { updateShipment } from "@/controllers/shipmentController";
export async function PATCH(req, context) {
  return updateShipment(req, context);
}
