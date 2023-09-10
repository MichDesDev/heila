import { useState } from 'react';
import axios from 'axios';
import chatInputStyles from "./chatInput.module.css";

const ChatInput = ({ user, clickedUser, getUserMessages, getClickedUsersMessages }) => {
	const [textArea, setTextArea] = useState("");
	const userId = user?.user_id;
	const clickedUserId = clickedUser?.user_id;

	const addMessage = async () => {
		const message = {
			timestamp: new Date().toISOString(),
			from_userId: userId,
			to_userId: clickedUserId,
			message: textArea
		};

		try {
			await axios.post('https://react-crud-fkgn.onrender.com/message', { message })
			getUserMessages()
			getClickedUsersMessages()
			setTextArea("")
		} catch (error) {
			console.log(error)
		};
	};


	return (
		<div className={chatInputStyles.chatInput} >
			<textarea value={textArea} onChange={(e) => setTextArea(e.target.value)}/>
			<button className="secondary-button" onClick={addMessage}>Submit</button>
		</div>
	)
}

export default ChatInput;
