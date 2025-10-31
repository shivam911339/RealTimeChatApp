import { createSlice } from "@reduxjs/toolkit";

const myChatSlice = createSlice({
	name: "myChat",
	initialState: {
		chat: [],
		selectedChat: null,
		newMessageRecieved: [],
	},
	reducers: {
		addMyChat: (state, action) => {
			state.chat = action.payload;
		},
		addSelectedChat: (state, action) => {
			state.selectedChat = action.payload;
			const newMessageRecieved = state.newMessageRecieved.filter(
				(message) => message.chat._id !== action.payload._id
			);
			state.newMessageRecieved = newMessageRecieved;
			localStorage.setItem(
				"notifications",
				JSON.stringify(state.newMessageRecieved)
			);
		},
		addNewChat: (state, action) => {
			const isExistChat = state.chat.find(
				(chat) => chat._id === action.payload._id
			);
			if (!isExistChat) {
				state.chat = [action.payload, ...state.chat];
			}
		},
		deleteSelectedChat: (state, action) => {
			if (
				state.selectedChat &&
				state.selectedChat._id === action.payload
			) {
				state.selectedChat = null;
			}
			const allChat = state.chat.filter(
				(chat) => chat._id !== action.payload
			);
			state.chat = allChat;
		},
		addNewMessageRecieved: (state, action) => {
			if (!state.newMessageRecieved.includes(action.payload)) {
				state.newMessageRecieved = [
					action.payload,
					...state.newMessageRecieved,
				];
				localStorage.setItem(
					"notifications",
					JSON.stringify(state.newMessageRecieved)
				);
			}
		},
		removeNewMessageRecieved: (state, action) => {
			const newMessageRecieved = state.newMessageRecieved.filter(
				(message) => message.chat._id !== action.payload.chat._id
			);
			state.newMessageRecieved = newMessageRecieved;
			localStorage.setItem(
				"notifications",
				JSON.stringify(state.newMessageRecieved)
			);
		},
		setNewMessageRecieved: (state, action) => {
			state.newMessageRecieved = action.payload || [];
		},
	},
});

export const {
	addMyChat,
	addSelectedChat,
	addNewChat,
	deleteSelectedChat,
	addNewMessageRecieved,
	removeNewMessageRecieved,
	setNewMessageRecieved,
} = myChatSlice.actions;
export default myChatSlice.reducer;
