import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Please provide a username"],
        unique: true,
    },
    email: {
        type: String,
        required: [true, "Please provide an email"],
        unique: true,
    },
    password: {
        type: String,
        required: [true, "Please provide a password"],
    },
    role: {
        type: String,
        default: "user",
        enum: ["user", "manager", "admin"],
    },
    bookmarks: [{type: mongoose.Schema.Types.ObjectId, ref: "Property"}],
}, { timestamps: true });

const UserModel = mongoose.model("User", UserSchema);

export default UserModel;

