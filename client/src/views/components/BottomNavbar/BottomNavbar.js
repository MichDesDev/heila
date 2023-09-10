import bNavbarStyles from "./bNavbar.module.css";
//Images
import Profile_L from "../../images/profile_light.svg"
import Profile_D from "../../images/profile_dark.svg"
import Swipe_L from "../../images/swipe_light.svg"
import Swipe_D from "../../images/swipe_dark.svg"
import Chat_L from "../../images/chat_light.svg"
import Chat_D from "../../images/chat_dark.svg"

const BottomNavbar = ({ theme }) => {
	return (
		<div className={bNavbarStyles.bottomNavbar}>
			<a href="/profile">
				<img
					src={theme === 'light' ? Profile_L : Profile_D}
					alt="Profile"
				/>
			</a>
			<a href="/dashboard">
				<img
					src={theme === 'light' ? Swipe_L : Swipe_D}
					alt="Swipe"
				/>
			</a>
			<a href="/matches">
				<img
					src={theme === 'light' ? Chat_L : Chat_D}
					alt="Chat"
				/>
			</a>
		</div>
	)
}

export default BottomNavbar;
