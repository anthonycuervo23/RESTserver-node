
const { Schema, model} = require('mongoose');

const ProductSchema = Schema({

    name: {
        type: String,
        required: [true, 'Product name is required'],
        unique: true
    },
    status: {
        type: Boolean,
        default: true,
        required: true
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    price: {
        type: Number,
        default: 0,
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    },
    description: {
        type: String,
    },
    available: {
        type: Boolean,
        default: true
    }

})

ProductSchema.methods.toJSON = function() {
    const { __v, _id, status,...product } = this.toObject();
    product.id = _id;
    return product;
}



module.exports = model('Product', ProductSchema);