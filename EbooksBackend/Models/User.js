const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
    {

        email: { type: String, required: true, minlength: 5, unique: true },
        password: { type: String, required: true, minlength: 8 },
        isAdmin: { type: Boolean, required: true},
        balance:{type:Number ,default : 0},
        books: [{ type: mongoose.Schema.Types.ObjectId, ref: 'book' }]




    },
    { versionKey: false }
);

const User = mongoose.model("User", UserSchema);
module.exports = { User, UserSchema };