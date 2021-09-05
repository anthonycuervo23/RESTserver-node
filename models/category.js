
const { Schema, model} = require('mongoose');

const CategorySchema = Schema({

    name: {
        type: String,
        required: [true, 'Category name is required'],
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
    }

})

CategorySchema.methods.toJSON = function() {
    const { __v, _id, status,...category } = this.toObject();
    category.id = _id;
    return category;
}



module.exports = model('Category', CategorySchema);