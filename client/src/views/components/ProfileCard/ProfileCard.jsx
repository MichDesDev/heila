//Styles
import SwipeButton from "../SwipeButton/SwipeButton";
import profileCardStyles from "./profileCard.module.css";
//Logic
//React
import { useState } from "react";

const ProfileCard = ({ user, onSwipeLeft, onSwipeRight }) => {

	const handleDislikeClick = () => {
		onSwipeLeft();
	  };

	  const handleLikeClick = () => {
		onSwipeRight();
	  };


	return (
		<div
			className={profileCardStyles.profileCard}
			style={{ backgroundImage: 'url(' + user.url + ')' }}
		>
			<h3 className={profileCardStyles.profileName}>
				{user.first_name}, {25}
			</h3>
			<div className={profileCardStyles.likeButtons}>
				<SwipeButton
					onClick={onSwipeLeft}
					type={'dislike'}
				/>
				<SwipeButton
					onClick={onSwipeRight}
					type={'like'}
				/>
			</div>
		</div>
	)
}

export default ProfileCard;
