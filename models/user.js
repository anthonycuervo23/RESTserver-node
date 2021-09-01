const { Schema, model } = require('mongoose');

const UserSchema = Schema({
    name: {
        type: String,
        require: [true, 'Name is required']
    },
    email: {
        type: String,
        require: [true, 'Email is required'],
        unique: true
    },
    password: {
        type: String,
        require: [true, 'Password is required']
    },
    img: {
        type: String,
    },
    role: {
        type: String,
        require: true,
        enum: ['ADMIN_ROLE', 'USER_ROLE', 'SALES_ROLE']
    },
    status: {
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        default: false
    },
});


//we need to use a normal function to use this.toObject and arrow functions doesnt work
//desestructuramos el modelo para extraer password y __v y no mostrarlo en la respuesta
UserSchema.methods.toJSON = function() {
    const { __v, password, ...user } = this.toObject();
    return user;
}


module.exports = model('User', UserSchema);
