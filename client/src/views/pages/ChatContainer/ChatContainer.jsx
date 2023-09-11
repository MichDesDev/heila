//Styles
import chatContainerStyles from "./chatContainer.module.css";
//Logic
import axios from "axios";
import { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
//Components
import AppHead from "../../components/AppHead/AppHead";
import MatchDisplay from "../../components/MatchDisplay/MatchDisplay";
import ChatDisplay from "../../components/ChatDisplay/ChatDisplay";
import BottomNavbar from "../../components/BottomNavbar/BottomNavbar";
//Images
import Back_Light from "../../images/back_light.svg";


const ChatContainer = () => {
	const [ clickedUser, setClickedUser ] = useState(null);

	//this could be in a mvc model //needs to be refactored
	const [ user, setUser ] = useState(null);
	const [ genderedUsers, setGenderedUsers ] = useState(null)
	const [ cookies ] = useCookies(['user']);

	const userId = cookies.UserId;

	const getUser = async () => {
		try {
			const response = await axios.get('https://react-crud-fkgn.onrender.com/user', {
				params: { userId }
			})
			setUser(response.data);
		} catch (err) {
			console.log(err);
		};
	};

	const getGenderedUsers = async () => {
		try {
			const response = await axios.get('https://react-crud-fkgn.onrender.com/gendered-users', {
				params: {gender: user?.gender_interest}
			})
			setGenderedUsers(response.data);
		} catch (err) {
			console.log(err);
		}
	};

	useEffect(() => {
		getUser();
	}, []);

	useEffect(() => {
		if (user) {
			getGenderedUsers();
		}
	}, [user]);
	//till here


	return (
		<>
		<AppHead />
		{ user &&
			<div
				className={chatContainerStyles.chatContainer}
			>
				{clickedUser &&
				<div className={chatContainerStyles.backContainer}>
					<button
					  className={chatContainerStyles.back}
					  onClick={() => setClickedUser(null)}
					>
						<img
						  src={Back_Light}
						  alt="back button"
						/>
					</button>
				</div>
				}
				{!clickedUser && <MatchDisplay matches={user.matches} setClickedUser={setClickedUser} />}

				{clickedUser && <ChatDisplay user={user} clickedUser={clickedUser} />}
			</div>
		}
		<BottomNavbar />
		</>
	)
}

export default ChatContainer;
