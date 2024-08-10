const User = require('../models/User');
const bcrypt = require('bcryptjs');


exports.registerUser = async (req, res) => {
  try {
    const { name, email, password, phone, profession } = req.body;
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: 'User already exists' });
    }
    const salt=await bcrypt.genSalt(10);
    const hashedPassword=await bcrypt.hash(password,salt);

    user = new User({ name, email, password: hashedPassword, phone, profession });
    await user.save();
    res.status(201).json({ msg: 'User registered successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }
    
    res.status(200).json({msg:"logged in successfully"});
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
};

exports.getUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password -__v');
    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
};

exports.updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, phone, profession } = req.body;
    let user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }
    user.name = name || user.name;
    user.phone = phone || user.phone;
    user.profession = profession || user.profession;
    await user.save();
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByIdAndDelete(id);
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }
    
    res.json({ msg: 'User removed' });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
};
