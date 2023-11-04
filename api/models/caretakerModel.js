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
    avatar: {
        type: String,
        default: "https://png.pngtree.com/png-clipart/20200701/original/pngtree-character-default-avatar-png-image_5407167.jpg",
    },
    properties: [{ type: mongoose.Schema.Types.ObjectId, ref: "Property" }],
}, { timestamps: true });

const CaretakerModel = mongoose.model("Caretaker", CaretakerSchema);
export default CaretakerModel;