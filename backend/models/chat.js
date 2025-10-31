const mongoose = require("mongoose");
const chatSchema = mongoose.Schema(
	{
		chatName: {
			type: String,
			required: true,
			trim: true,
		},
		isGroupChat: {
			type: Boolean,
			default: false,
		},
		users: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "User",
			},
		],
		latestMessage: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Message",
		},
		groupAdmin: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
		},
	},
	{
		timestamps: true,
	}
);

// Prevent duplicate group names (case-insensitive) across all group chats
chatSchema.index(
	{ isGroupChat: 1, chatName: 1 },
	{ unique: true, partialFilterExpression: { isGroupChat: true }, collation: { locale: "en", strength: 2 } }
);

const Chat = mongoose.model("Chat", chatSchema);
module.exports = Chat;
