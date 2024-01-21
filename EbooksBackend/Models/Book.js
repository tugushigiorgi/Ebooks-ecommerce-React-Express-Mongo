const mongoose = require("mongoose");


const bookSchema = new mongoose.Schema(
    {
        title: { type: String, minlength: 6, required: true },
        description: { type: String, required: true},
        category: { type: String,   required: true },
        price:{type:Number,required:true},
            poster: { type: String, required: true  },
        file :{ type: String, required: true  },
        slug:{type:String, required: true, unique:true}


    },
    { versionKey: false }
);

const book = mongoose.model("book", bookSchema);
module.exports = { book, bookSchema};