//Styles
import chatInputStyles from "./chatInput.module.css";
//Logic
import { useState } from 'react';
import axios from 'axios';
//Components
import Send_Green from "../../images/send_green.svg"

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
			<textarea
			  className={chatInputStyles.text}
			  value={textArea}
			  onChange={(e) => setTextArea(e.target.value)}
			  autoFocus={true}
			/>
			<button
			  className={chatInputStyles.send}
			  onClick={addMessage}
			>
				<img
				  src={Send_Green}
				  alt="submit"
				/>
			</button>
		</div>
	)
}

export default ChatInput;
