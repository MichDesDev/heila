import { useState } from "react";
//Styles
import homeStyles from "./home.module.css";
//Components
import Navbar from "../../components/Navbar/Navbar";
import AuthModal from "../../components/AuthModal/AuthModal";
//Images
import explore from "../../images/explore.jpg";
import connect from "../../images/connect.jpg";
import texting from "../../images/texting.jpg";

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
							Flirt. Connect. Love.
						</h1>
						<p className={homeStyles.description}>Find charming like-minded people to share beautiful experiences</p>
						<button
							className="primary-button"
							onClick={handleClick}
						>
							{authToken ? 'Signout' : 'Start swiping'}
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
			<section className={homeStyles.secondSection}>
				{/* adventure block */}
				<div className={homeStyles.columns}>
					<div className={homeStyles.colTxt}>
						<div>
							<h2>Embark an exciting adventure</h2>
							<p>Whether you're looking for an open relationship, a committed one or simply to meet potential partners this is your opportunity to begin an adventure you will remember for your lifetime!</p>
							<button
								className="secondary-button"
								style={{ marginTop: '24px' }}
								onClick={handleClick}
							>
							join the club
							</button>
						</div>
					</div>
					<div>
						<img
							src={explore}
							alt="people dating"
							className={homeStyles.colImg}
						/>
					</div>
				</div>
				{/* connect block */}
				<div className={homeStyles.columns}>
					<div>
						<img
							src={connect}
							alt="people dating"
							className={homeStyles.colImg}
						/>
					</div>
					<div className={homeStyles.colTxt}>
						<div>
							<h2>Connect with like-minded individuals</h2>
							<p>Increase your chances of meeting potential partners that share your interests and passions. Heila empowers you to meet people you can truly connect with.</p>
							<button
								className="secondary-button"
								style={{ marginTop: '24px' }}
								onClick={handleClick}
							>
							Start swiping
							</button>
						</div>
					</div>
				</div>
				{/* communicate block */}
				<div className={homeStyles.columns}>
					<div className={homeStyles.colTxt}>
						<div>
							<h2>Become a confident communicator</h2>
							<p>We are developing an AI model that suggests you how to create meaningful connections with your matches. It takes away the boredom of replicating conversations you may have over and over again when meeting new people.</p>
							<button
								className="secondary-button"
								style={{ marginTop: '24px' }}
								onClick={handleClick}
							>
							Flirt like a pro
							</button>
						</div>
					</div>
					<div>
						<img
							src={texting}
							alt="people dating"
							className={homeStyles.colImg}
						/>
					</div>
				</div>
			</section>
		</div>
	)
}

export default Home;
