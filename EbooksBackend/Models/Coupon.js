const mongoose = require("mongoose");


const CouponSchema = new mongoose.Schema(
    {
        code: { type: String,  required: true },
        discount: { type: Number, required: true },


    },
    { versionKey: false }
);

const coupon = mongoose.model("coupon", CouponSchema);
module.exports = { coupon, CouponSchema };