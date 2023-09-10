// Function to create a new Message object
function createMessage(
	timestamp,
	from_userId,
	to_userId,
	message,
) {
	return {
		timestamp,
		from_userId,
		to_userId,
		message,
	};
}

module.exports = {
	createMessage,
};
