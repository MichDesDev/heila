//Styles
import matchDisplayStyles from "./matchDisplay.module.css";
//Logic
import axios from "axios";
import { useCookies } from "react-cookie";
import { useState, useEffect } from "react";

const MatchDisplay = ({ matches, setClickedUser }) => {
	const [ matchedProfiles, setMatchedProfiles ] = useState(null);
	const [ cookies ] = useCookies(null);

	const matchedUserIds = matches.map(({ user_id }) => user_id);
	const userId = cookies.UserId;

	const getMatches = async () => {
		try {
			const response = await axios.get('https://react-crud-fkgn.onrender.com/users', {
				params: { userIds: JSON.stringify(matchedUserIds) },
			});
			setMatchedProfiles(response.data);
		} catch (err) {
			console.log(err);
		}
	};

	useEffect(() => {
		getMatches();
	}, [matches]);

	const filteredMatchedProfiles = matchedProfiles?.filter(
		(matchedProfile) =>
			matchedProfile.matches.filter((profile) => profile.user_id === userId)
			.length > 0
	);

	//should create a component to display the data of the matches -- this is very messy atm
	return (
		<div className={matchDisplayStyles.matchesDisplay}>
			{filteredMatchedProfiles?.map((match, _index) => (
				<div
					key={_index}
					className={matchDisplayStyles.matchCard}
					onClick={() => setClickedUser(match)}
				>
					<div className={matchDisplayStyles.imgContainer}>
						<img src={match?.url} alt={match?.first_name + " profile"} />
					</div>
					<div className={matchDisplayStyles.matchDetails}>
						<h2 className={matchDisplayStyles.matchName}>
							{match?.first_name}
						</h2>
						<p className={matchDisplayStyles.matchMessage}>
							Prop message to add...
						</p>
					</div>
				</div>
			))}
		</div>
	);
};

export default MatchDisplay;
