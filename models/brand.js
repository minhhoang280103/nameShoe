"use strict";
const mongoose = require('mongoose');

//khai báo Collection 
const Brand = mongoose.Schema(
    {
        brandName: { type: String },
        img_prod: { type:String },
        des_brand: { type: String },
        name_prod:{type: String}
    },
    {versionKey: false, timestamps: true}
);

Brand.statics.objectId = function(id) {
    return mongoose.Types.ObjectId(id);
};

//xuất Brand
module.exports = {
    Brand: mongoose.model("brand", Brand)
};