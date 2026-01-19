import { getShipment } from "@/controllers/shipmentController";
import EditShipmentForm from "./EditShipmentForm";

const Page = async ({ params }) => {
  const { id } = await params;
  const shipment = await getShipment(id);

  return (
    <div className="bg-white overflow-hidden shadow-sm rounded-2xl p-6">
      <h2 className="text-sm font-semibold mb-4">Edit Shipment Details</h2>
      <EditShipmentForm shipment={shipment} />
    </div>
  );
};

export default Page;
