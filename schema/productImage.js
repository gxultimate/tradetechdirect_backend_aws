var mongoose = require('mongoose')
var Schema = mongoose.Schema;
var productImg = new Schema({
    img: { data: Buffer,
         contentType: String ,  id : Array }
},
{
    timestamps: true
});
module.exports = mongoose.model('ProductImg', productImg);