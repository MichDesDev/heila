//Styles
import chatStyles from "./chat.module.css";

const Chat = ({ ascendingOrderMessages, userName }) => {

	const formatTimestamp = (timestamp) => {
		const date = new Date(timestamp);
		const day = date.getDate();
		const month = date.toLocaleString('default', { month: 'short' });
		const hours = date.getHours();
		const minutes = date.getMinutes();

		return `${day}/${month} at ${hours}:${minutes}`;
	}


	return (
		<>
		{userName && (
			<div className={chatStyles.chat}>
				{ascendingOrderMessages.map((message, _index) => (
					<div className={chatStyles.messageBlock} key={_index} >
						<span className={chatStyles[message.name === userName ? "userMessageInfo" : "matchMessageInfo"]}>
							{message.name === userName ? " " : message.name} {formatTimestamp(message.timestamp)}
						</span>
						<p className={chatStyles[message.name === userName ? "userMessage" : "matchMessage"]}>
							{message.message}
						</p>
					</div>
				))}
			</div>
			)}
		</>
	)
};

export default Chat;
