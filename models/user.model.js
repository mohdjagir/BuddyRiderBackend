const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  firstname: String,
  lastname:String,
  email: { type: String, unique: true },
  phone:String,
  password: String,
  otp:Number
});

userSchema.pre('save', async function () {
  if (this.isModified('password'))
    this.password = await bcrypt.hash(this.password, 10);
});

userSchema.methods.comparePassword = function (inputPassword) {
  return bcrypt.compare(inputPassword, this.password);
};

module.exports = mongoose.model('users', userSchema);
