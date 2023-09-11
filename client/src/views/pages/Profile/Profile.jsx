//Styles
import profileStyles from "./profile.module.css";
//Logic
import { useCookies } from "react-cookie";
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from "react";
import axios from "axios";
//Components
const { default: AppHead } = require("../../components/AppHead/AppHead")
const { default: BottomNavbar } = require("../../components/BottomNavbar/BottomNavbar")

const Profile = () => {
	const [ cookies, removeCookie ] = useCookies(['user']);
	const [ user, setUser ] = useState(null);

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

	useEffect(() => {
		getUser();
	}, []);

	let navigate = useNavigate();

	const logout = () => {
		removeCookie('UserId', cookies.UserId);
		removeCookie('AuthToken', cookies.AuthToken);
		navigate('/');
	}

	return (
		<>
			<AppHead />
			{ user &&
			<div className={profileStyles.profile}>
				<div className={profileStyles.imgContainer}>
					<img src={user.url} alt={"photo of " + user.first_name} />
				</div>
				<div className={profileStyles.edit}>
					<h3>{user.first_name}</h3>
					<a href="/profile">edit</a>
				</div>

				<div className={profileStyles.details}>
					<h4>About me:</h4>
					<p>{user.about}</p>
					<h4>Birthday:</h4>
					<p>{user.dob_day}/{user.dob_month}/{user.dob_year}</p>
					<h4>I identify as:</h4>
					<p>{user.gender_id}</p>
					<h4>I am interested in:</h4>
					<p>{user.gender_interest}</p>
				</div>
				<button
				  className={profileStyles.logOut}
				  onClick={logout}
				>
					Logout
				</button>
			</div>}

			{/* <button
				className={profileStyles.logOut}
			>
				Edit Profile (WIP)
			</button> */}
			<BottomNavbar />
		</>
	)
}

export default Profile;
