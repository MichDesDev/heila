// Function to create a new Match object
function createMatch(user_id_1, user_id_2, timestamp) {
	return {
		user_id_1,
		user_id_2,
		timestamp,
	};
}

module.exports = {
	createMatch,
};
