//Styles
import swipeButtonStyles from "./swipeButton.module.css";
//Logic
//Components and images
import Heart_Green from "../../images/heart_green.svg";
import X_Red from "../../images/x_red.svg";

const SwipeButton = ({ type, handleClick }) => {

	let backgroundColor;
	let iconImg;

	if (type === "like") {
		backgroundColor = "#FFF";
		iconImg = Heart_Green;
	} else if (type === 'dislike') {
		backgroundColor = "#FFF";
		iconImg = X_Red;
	}

	const handleButtonClick = () => {
		handleClick();
	}

	return (
		<button
			className={swipeButtonStyles.container}
			style={{backgroundColor: backgroundColor}}
			onClick={handleButtonClick}
		>
			<img
				src={iconImg}
				alt="like"
			/>
		</button>
	)
}

export default SwipeButton;
