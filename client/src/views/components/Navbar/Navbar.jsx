import WhiteLogo from '../../images/heila_white.png';
import ColorLogo from '../../images/heila.png';
import navbarStyles from './navbar.module.css';

const Navbar = ({ authToken, minimal, setShowModal, showModal, setIsSignUp }) => {

	const handleClick = () => {
		setShowModal(true);
		setIsSignUp(false);
	}

	return (
		<nav>
			<div className={navbarStyles.logoContainer}>
				<img
					className={navbarStyles.logo}
					src={minimal ? ColorLogo : WhiteLogo}
					alt="logo"
				/>
			</div>
			{!authToken && !minimal && (
				<button
					// className={navbarStyles.navButton}
					className='secondary-button'
					onClick={handleClick}
					disabled={showModal}
				>
					Log in
				</button>
			)}
		</nav>
	);
}

export default Navbar;
