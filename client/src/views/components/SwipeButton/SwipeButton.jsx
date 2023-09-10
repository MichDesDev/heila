//Styles
import swipeButtonStyles from "./swipeButton.module.css";
//Logic
//Components and images
import Heart_Green from "../../images/heart_green.svg";
import X_Red from "../../images/x_red.svg";

const SwipeButton = ({ type }) => {

	let backgroundColor;
	let iconImg;

	if (type === "like") {
		backgroundColor = "#FFF";
		iconImg = Heart_Green;
	} else if (type === 'dislike') {
		backgroundColor = "#FFF";
		iconImg = X_Red;
	}

	return (
		<div
			className={swipeButtonStyles.container}
			style={{backgroundColor: backgroundColor}}
		>
			<img
				src={iconImg}
				alt="like"
			/>
		</div>
	)
}

export default SwipeButton;
