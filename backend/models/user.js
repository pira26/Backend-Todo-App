'use strict';

const 
    mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    bcrypt = require('bcrypt');

const UserSchema = new Schema(
    {
        id: Schema.Types.ObjectId,
        firstname: { type: String, required: true, trim: true },
        lastname: { type: String, required: true, trim: true },
        email: { type: String, required: true, trim: true, unique: true, lowercase: true },
        password: { type: String, required: true },
        avatar: { type: String, required: true, trim: true },
        createdAt: { type: Date, default: Date.now }
    }
);

UserSchema.methods.comparePassword = (password) => {
    return bcrypt.compareSync(password, this.password);
}
  
module.exports = mongoose.model('User', UserSchema);