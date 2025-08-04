const User = require('../models/user.model');
const generateToken = require('../utils/generateToken');

exports.register = async (req, res) => {
  const { firstname, lastname,email,phone, password,otp } = req.body;
  const exists = await User.findOne({ email });
  if (exists) return res.status(400).json({ message: 'User exists' });

  const user = await User.create({ firstname, lastname,email,phone, password,otp,token });
  res.status(201).json({
    id: user._id,
    email: user.email,
    token: generateToken(user._id), 
  });
};

exports.login = async (req, res) => {
  const { email, password } = req.body; 

  const user = await User.findOne({ email });
  if (!user || !(await user.comparePassword(password))) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  res.json({
    id: user._id,
    email: user.email,
    token: generateToken(user._id),
  });
};
