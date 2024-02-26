const {Schema, model} = require('mongoose');

const ProductChema = new Schema({
    bookImg: {type: String, required: true},
    bookName: {type: String, required: true},
    bookOwner: {type: String, require: true},
    bookInfo: {type: String, require: true},
    bookFuulInfo: {type: String, require: true}
}, {
    timestamps: true
});

module.exports = model('Product', ProductChema);