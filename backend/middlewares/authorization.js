const { getUserIdFromToken } = require("../config/jwtProvider");
const User = require("../models/user");

module.exports.authorization = async (req, res, next) => {
	try {
		const authHeader = req.headers.authorization || "";
		const token = authHeader.startsWith("Bearer ")
			? authHeader.split(" ")[1]
			: null;
	if (!token) {
			return res.status(401).json({ message: "Token not found" });
	}
		let userId;
		try {
			userId = getUserIdFromToken(token);
		} catch (err) {
			return res.status(401).json({ message: "Invalid token" });
		}
		if (!userId) {
			return res.status(401).json({ message: "Invalid token" });
		}
		const user = await User.findById(userId).select("-password");
		if (!user) {
			return res.status(401).json({ message: "User not found" });
		}
		req.user = user;
		return next();
	} catch (err) {
		return res.status(500).json({ message: err.message || "Auth error" });
	}
};
