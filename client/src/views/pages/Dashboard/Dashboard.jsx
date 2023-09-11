//Styles
import dashboardStyles from "./dashboard.module.css";
//Logic
import {useEffect, useState} from 'react';
import {useCookies} from 'react-cookie';
import axios from 'axios';
//Components
import AppHead from "../../components/AppHead/AppHead";
import ProfileCard from "../../components/ProfileCard/ProfileCard";
import BottomNavbar from "../../components/BottomNavbar/BottomNavbar";

const Dashboard = () => {
	const [user, setUser] = useState(null);
	const [genderedUsers, setGenderedUsers] = useState(null);
	const [dislikedUsers, setDislikedUsers] = useState([]);
	const [cookies, setCookie, removeCookie] = useCookies(['user']);

	const userId = cookies.UserId


	const getUser = async () => {
		try {
			const response = await axios.get('https://react-crud-fkgn.onrender.com/user', {
				params: {userId}
			})
			setUser(response.data)
		} catch (error) {
			console.log(error)
		}
	}
	const getGenderedUsers = async () => {
		try {
			const response = await axios.get('https://react-crud-fkgn.onrender.com/gendered-users', {
				params: {gender: user?.gender_interest}
			})
			setGenderedUsers(response.data)
		} catch (error) {
			console.log(error)
		}
	}

	useEffect(() => {
		getUser()
	}, [])

	useEffect(() => {
		if (user) {
			getGenderedUsers()
		}
	}, [user])

	const updateMatches = async (matchedUserId) => {
		try {
			await axios.put('https://react-crud-fkgn.onrender.com/addmatch', {
				userId,
				matchedUserId
			})
			getUser()
		} catch (err) {
			console.log(err)
		}
	}


	const swiped = (swipedUserId) => {
			updateMatches(swipedUserId)
			console.log("liked", swipedUserId);
	}

	const disliked = (swipedUserId) => {
		setDislikedUsers((prev) => [...prev, swipedUserId]);
	}

	const matchedUserIds = user?.matches.map(({user_id}) => user_id).concat(userId)

	const filteredGenderedUsers = genderedUsers?.filter(genderedUser => !matchedUserIds.includes(genderedUser.user_id));

	let theme = 'dark';

	return (
		<>
			<AppHead theme={theme} />
			<div className={dashboardStyles.cardContainer}>
			{user && (filteredGenderedUsers?.map((filteredUser) =>
				<ProfileCard
					className={dashboardStyles.card}
					user={filteredUser}
					key={filteredUser.user_id}
					onSwipeRight={() => swiped(filteredUser.user_id)}
					onSwipeLeft={() => disliked(filteredUser.user_id)}
				/>
			))}
			</div>
			<BottomNavbar theme={theme} />
		</>
	)
}

export default Dashboard;

