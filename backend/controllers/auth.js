const User = require("../models/user");
const bcrypt = require("bcryptjs");
const { generateToken } = require("../config/jwtProvider");

const registerUser = async (req, res) => {
	try {
	let { firstName, lastName, email, password } = req.body;
		if (!firstName || !lastName || !email || !password) {
			return res.status(400).json({ message: 'All fields are required.' });
		}
	const existingUser = await User.findOne({ email: email });
	if (existingUser) {
		return res.status(400).json({ message: `User Already Exist` });
	}
		password = require("bcryptjs").hashSync(password, 8);
	const userData = new User({
		firstName,
		lastName,
		email,
		password,
	});
	const user = await userData.save();
		const jwt = require("../config/jwtProvider").generateToken(user._id);
		return res.status(200).json({
		message: "Registration Successfully",
		token: jwt,
	});
	} catch (err) {
		console.error('Signup Error:', err);
		return res.status(500).json({ message: err.message || 'Internal Server Error' });
	}
};

const loginUser = async (req, res) => {
	let { email, password } = req.body;
	let user = await User.findOne({ email: email });
	if (!user) {
		return res.status(404).json({ message: `User Not Found` });
	}
	const isPasswordValid = bcrypt.compareSync(password, user.password);
	if (!isPasswordValid) {
		return res.status(401).json({ message: "Invalid Password" });
	}
	const jwt = generateToken(user._id);
	user.password = null;
	res.status(200).json({
		message: "Login Successfully",
		data: user,
		token: jwt,
	});
};

module.exports = { registerUser, loginUser };
