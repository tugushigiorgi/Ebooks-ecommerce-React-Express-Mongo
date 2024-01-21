const mongoose = require("mongoose");


const cartSchema = new mongoose.Schema(
    {


        userId:  { type: mongoose.Schema.Types.ObjectId, ref: 'User' },

        books: [{ type: mongoose.Schema.Types.ObjectId, ref: 'book' }]

        


   


    },
    { versionKey: false }
);

const cart = mongoose.model("cart", cartSchema);
module.exports = {  cart, cartSchema };