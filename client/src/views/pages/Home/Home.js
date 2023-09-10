import { useState } from "react";
//Styles
import homeStyles from "./home.module.css";
//Components
import Navbar from "../../components/Navbar/Navbar";
import AuthModal from "../../components/AuthModal/AuthModal";

const Home = () => {

	const [ showModal, setShowModal ] = useState(false);
	const [ isSignUp, setIsSignUp ] = useState(true);
	// const [ cookies, setCookie, removeCookie ] = useState(['user']);
	const [ cookies, removeCookie ] = useState(['user']);


	const authToken = cookies.AuthToken;

	const handleClick = () => {
		if (authToken) {
			removeCookie('UserId', cookies.UserId);
			removeCookie('AuthToken', cookies.AuthToken);
			window.location.reload();
			return;
		}
		setShowModal(true);
		setIsSignUp(true);
	};

	return (
		<div>
			<div className={homeStyles.container}>
				<div className={homeStyles.overlay}>
					<Navbar
						authToken={authToken}
						minimal={false}
						setShowModal={setShowModal}
						showModal={showModal}
						setIsSignUp={setIsSignUp}
					/>
					<div className="home">
						<h1 className={homeStyles.primaryTitle} >
							Flirt Connect Love
						</h1>
						<button
							className="primary-button"
							onClick={handleClick}
						>
							{authToken ? 'Signout' : 'Create Account'}
						</button>

						{showModal &&(
							<AuthModal
								setShowModal={setShowModal}
								isSignUp={isSignUp}
							/>
						)}
					</div>
				</div>
			</div>
			<div className="other">
				<h2>Embark an exciting adventure</h2>
				<p>Heila is your passport to an exciting dating adventure.</p>

				<h3>Connect with like-minded individuals</h3>
				<p>Swipe matches who share your interests and values.</p>

				<h3>Become a confident communicator</h3>
				<p>Flirting practice with AI coming soon.</p>
			</div>
		</div>
	)
}

export default Home;
