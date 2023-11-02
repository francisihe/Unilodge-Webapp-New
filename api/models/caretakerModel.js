import mongoose from "mongoose";

const CaretakerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please provide a name"],
    },
    email: {
        type: String,
        unique: true,
    },
    phone: {
        type: String,
    },
    password: {
        type: String,
        required: [true, "Please provide a password"],
    },
    role: {
        type: String,
        default: "caretaker",
    },
    properties: [{type: mongoose.Schema.Types.ObjectId, ref: "Property"}],
}, { timestamps: true });

const CaretakerModel = mongoose.model("Caretaker", CaretakerSchema);
export default CaretakerModel;