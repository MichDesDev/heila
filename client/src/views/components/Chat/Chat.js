//Styles
import chatStyles from "./chat.module.css";

const Chat = ({descendingOrderMessages}) => {

	return (
		<>
			<div className={chatStyles.chatDisplay}>
				{descendingOrderMessages.map((message, _index) => (
					<div
						className={chatStyles.messageBlock}
						key={_index}>
						<div>
							<div className={chatStyles.imgContainer}>
								<img
									src={message.img}
									alt={message.name + ' profile'}
								/>
							</div>
							<p className={chatStyles.userName}>
								{message.name}
							</p>
						</div>
						<p className={chatStyles.message}>
							{message.message}
						</p>
					</div>
				))}
			</div>
		</>
	)
};

export default Chat;
