import mongoose from "mongoose";
const shipmentHistorySchema = new mongoose.Schema({
    shipmentId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Shipment",
        required:[true, 'Shipment history must belong to a shipment']
        
    },
    location:{
        type:String,
        required:[true, 'Please provide location']
    },
    date:{
        type:Date,
       default:Date.now()
    },
    time:{
        type:String,
        default: () => {
            const now = new Date();
            return now.toTimeString().split(' ')[0]; // "H:i:s" format
        }
    },
     status: {
        type: String,
          required: [true, "Status is required"],
        enum:{
            values:['Order Confirmed', 'Picked by Courier', 'On The Way', 'Custom Hold', 'Delivered'],
             message: 'Status is either: Order Confirmed, Picked by Courier, On The Way, Custom Hold or Delivered. Got {VALUE}'
        },
      
    },
    remark:String
},{
     timestamps: true,
})

// const ShipmentHistory = mongoose.model('ShipmentHistory', shipmentHistorySchema);
// export default ShipmentHistory

export default mongoose.models.ShipmentHistory ||
    mongoose.model("ShipmentHistory", shipmentHistorySchema);