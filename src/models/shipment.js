import mongoose from "mongoose";
const ShipmentSchema = new mongoose.Schema({
    // Basic Information
    tracking_number: {
        type: String,
        unique: true
    },

    // Sender Information
    sender_name: {
        type: String,
        required: [true, "Sender name is required"]
    },
    sender_email: {
        type: String,
        required: [true, "Sender email is required"],
        lowercase: true,
        trim: true
    },
    sender_phone: {
        type: String,
        required: [true, "Sender phone is required"]
    },
    sender_address: {
        type: String,
        required: [true, "Sender address is required"]
    },
    sender_origin: {
        type: String,
        required: [true, "Origin location is required"]
    },

    // Receiver Information
    receiver_name: {
        type: String,
        required: [true, "Receiver name is required"]
    },
    receiver_email: {
        type: String,
        required: [true, "Receiver email is required"],
        lowercase: true,
        trim: true
    },
    receiver_phone: {
        type: String,
        required: [true, "Receiver phone is required"]
    },
    receiver_address: {
        type: String,
        required: [true, "Receiver address is required"]
    },
    receiver_destination: {
        type: String,
        required: [true, "Destination location is required"]
    },

    // Shipment Information
    quantity: {
        type: Number,
        required: [true, "Quantity is required"],
        min: 1
    },
    weight: {
        type: Number,
        min: 0
    },

    dimensions: {
        type: String,
    },
    photo: {
        type: String,
    },
    description: {
        type: String,
    },

    // Shipment Mode/Type
    // shipment_type: {
    //     type: String,
    //     enum: ['Air Freight', 'Sea Freight', 'Road Transport', 'Express', 'Standard'],
    //     default: 'Standard'
    // },

    // Payment Information
    payment_method: {
        type: String,
        enum: {
            values: ['Receiver Pays', 'Sender Pays', 'Third Party'],
            message: 'Payment method is either: Receiver Pays, Sender Pays or Third Party. Got {VALUE}'
        },
        required: [true, "Payment method is required"],

    },

    // Cost Information
    shipping_cost: {
        type: Number,
        required: [true, "Shipping cost is required"],
    },
    clearance_cost: {
        type: Number,
        required: [true, "Clearance cost is required"],
    },
    total_cost: {
        type: Number,
    },

    // Dates
    shipped_date: {
        type: Date,
        required: [true, "Shipped date is required"]
    },
    expected_date: {
        type: Date,
        required: [true, "Expected delivery date is required"]
    },
    pickup_date: {
        type: Date,
        required: [true, "Pickup date is required"]
    },


    // Status
    status: {
        type: String,
        enum: ['Order Confirmed', 'Picked by Courier', 'On The Way', 'Custom Hold', 'Delivered'],
        default: 'Picked by Courier'
    },

    // Carrier Information
    carrier: {
        type: String,
        default: 'ZillShip Logistics Services'
    },

}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

// Virtual for shipment histories
ShipmentSchema.virtual('histories', {
    ref: 'ShipmentHistory',
    foreignField: 'shipmentId',
    localField: '_id',
    options: { sort: { createdAt: -1 } }
});

// Virtual for calculating total automatically
ShipmentSchema.pre('save', async function () {
    if (this.shipping_cost && this.clearance_cost) {
        this.total_cost = this.shipping_cost + this.clearance_cost;
    }
    // Generate tracking number ONLY when creating a new record
    if (this.isNew && !this.tracking_number) {
        const prefix = 'ZS';
        const random = Math.floor(100000000 + Math.random() * 900000000);
        this.tracking_number = `${prefix}${random}`;
    }
});

// Method to update status with history
ShipmentSchema.methods.updateStatus = async function (newStatus, userId, notes = null) {
    const oldStatus = this.status;
    this.status = newStatus;
    this.updated_by = userId;

    // Create history entry
    const ShipmentHistory = mongoose.model('ShipmentHistory');
    await ShipmentHistory.create({
        shipmentId: this._id,
        old_status: oldStatus,
        new_status: newStatus,
        updated_by: userId,
        notes: notes
    });

    return this.save();
};


// Indexes for better query performance
// ShipmentSchema.index({ tracking_number: 1 });
export default mongoose.models.Shipment ||
    mongoose.model("Shipment", ShipmentSchema);