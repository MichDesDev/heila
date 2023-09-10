function createUser(
	user_id,
	email,
	hashed_password,
	about,
	dob_day,
	dob_month,
	dob_year,
	first_name,
	gender_id,
	gender_interest,
	matches,
	show_gender,
	url
) {
	return {
	user_id,
	email,
	hashed_password,
	about,
	dob_day,
	dob_month,
	dob_year,
	first_name,
	gender_id,
	gender_interest,
	matches,
	show_gender,
	url,
	};
}

module.exports = {
	createUser,
};
