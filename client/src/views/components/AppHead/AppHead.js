//Component styles
import appHeadStyles from "./appHead.module.css";
//Images
import WhiteLogo from '../../images/heila_white.png';
import ColorLogo from '../../images/heila.png';

const AppHead = () => {

	let theme = "dark";

	return (
		<div className={appHeadStyles.container}>
			<img
				className={appHeadStyles.logo}
				src={theme === 'light' ? ColorLogo : WhiteLogo}
				alt="Heila logo"
			/>
		</div>
	)
}

export default AppHead;
