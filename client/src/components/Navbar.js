import WhiteLogo from '../images/heila_white.png';
import ColorLogo from '../images/heila.png';

const Navbar = ({ authToken, minimal, setShowModal, showModal, setIsSignUp }) => {

	const handleClick = () => {
		setShowModal(true);
		setIsSignUp(false);
	}



	return (
		<nav>
			<div className="logo-container">
				<img
					className="logo"
					src={minimal ? ColorLogo : WhiteLogo}
					alt="logo"
				/>
			</div>
			{!authToken && !minimal && (
				<button
					className="nav-button"
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
