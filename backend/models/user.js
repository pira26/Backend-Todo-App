'use strict';

const 
    mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    bcrypt = require('bcryptjs');

const UserSchema = new Schema(
    {
        id: Schema.Types.ObjectId,
        firstName: { type: String, required: true, trim: true },
        lastName: { type: String, required: true, trim: true },
        email: { type: String, required: true, trim: true, unique: true, lowercase: true },
        password: { type: String, required: true },
        avatar: { type: String, required: true, trim: true },
        createdAt: { type: Date, default: Date.now }
    }
);

UserSchema.pre('save', async function (next) {
	try {
	  	const salt = await bcrypt.genSalt(10);
	  	const hashedPassword = await bcrypt.hash(this.password, salt);
	  	this.password = hashedPassword;
	  	next();
	} catch (error) {
	  	next(error);
	}
});

UserSchema.methods.isValidPassword = async function (newPassword) {
	try {
		return await bcrypt.compare(newPassword, this.password);
	} catch (error) {
	  	throw new Error(error);
	}
}
  
module.exports = mongoose.model('User', UserSchema);