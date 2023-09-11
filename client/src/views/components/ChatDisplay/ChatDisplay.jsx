//Logic
import { useEffect, useState } from "react";
import axios from "axios";
//Components
import Chat from "../Chat/Chat";
import ChatInput from "../ChatInput/ChatInput";


const ChatDisplay = ({ user, clickedUser }) => {
	const userId = user?.user_id;
	const clickedUserId = clickedUser?.user_id;
	const [ usersMessages, setUsersMessages ] = useState(null);
	const [ clickedUsersMessages, setClickedUsersMessages ] = useState(null);

	const getUsersMessages = async () => {
		try {
			const response = await axios.get('https://react-crud-fkgn.onrender.com/messages', {
			params: {userId: userId, correspondingUserId: clickedUserId}
			})
			setUsersMessages(response.data);
		} catch (err) {
			console.log(err);
		}
	};

	const getClickedUsersMessages = async () => {
		try {
			const response = await axios.get('https://react-crud-fkgn.onrender.com/messages', {
			params: {userId: clickedUserId, correspondingUserId: userId}
			})
			setClickedUsersMessages(response.data);
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		getUsersMessages();
		getClickedUsersMessages();
	}, []);

	const messages = [];

	usersMessages?.forEach(message => {
		const formattedMessage = {};
		formattedMessage['name'] = user?.first_name;
		formattedMessage['img'] = user?.url;
		formattedMessage['message'] = message.message;
		formattedMessage['timestamp'] = message.timestamp;
		messages.push(formattedMessage);
	});

	clickedUsersMessages?.forEach(message => {
		const formattedMessage = {};
		formattedMessage['name'] = clickedUser?.first_name;
		formattedMessage['img'] = clickedUser?.url;
		formattedMessage['message'] = message.message;
		formattedMessage['timestamp'] = message.timestamp;
		messages.push(formattedMessage);
	});

	const ascendingOrderMessages = messages?.sort((b,a) => a.timestamp.localeCompare(b.timestamp));

	return (
		<>
			<Chat ascendingOrderMessages={ascendingOrderMessages}/>
			<ChatInput
			  user={user}
			  clickedUser={clickedUser}
			  getUserMessages={getUsersMessages}
			  getClickedUsersMessages={getClickedUsersMessages}
			/>
		</>
	)
}

export default ChatDisplay;
