//Styles
import onboardingStyles from "./onboarding.module.css";
//Logic
import { useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import axios from "axios";
//Components
import AppHead from "../../components/AppHead/AppHead";

const OnBoarding = () => {
	const [ cookies ] = useCookies(['user']);
	const [ formData, setFormData ] = useState({
		user_id: cookies.UserId,
		first_name: "",
		dob_day: "",
		dob_month: "",
		dob_year: "",
		show_gender: false,
		gender_id: "man",
		gender_interest: "woman",
		url: "",
		about: "",
		matches: [],
		disliked: [],
	})

	let navigate = useNavigate();

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const response = await axios.put('https://react-crud-fkgn.onrender.com/user', {formData})
			const success = response.status === 200;
			if (success) navigate('/dashboard');
		} catch (err) {
			console.log(err);
		}
	}

	const handleChange = (e) => {
		const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
		const name = e.target.name;

		setFormData((prevState) => ({
			...prevState,
			[name] : value
		}))
	}

	return (
		<>
			<AppHead />
			<div
				className={onboardingStyles.onboarding}
			>
				<h2>CREATE ACCOUNT</h2>
				<form onSubmit={handleSubmit}>

						<label htmlFor="first_name" className={onboardingStyles.descr}>First Name</label>
						<input
							type="text"
							id="first_name"
							name="first_name"
							placeholder="First Name"
							required={true}
							value={formData.first_name}
							onChange={handleChange}
						/>

						<label className={onboardingStyles.descr}>Birthday</label>
						<div className={onboardingStyles.multipleInputContainer}>
							<input
								type="number"
								id="dob_day"
								name="dob_day"
								placeholder="DD"
								required={true}
								value={formData.dob_day}
								onChange={handleChange}
							/>
							<input
								type="number"
								id="dob_month"
								name="dob_month"
								placeholder="MM"
								required={true}
								value={formData.dob_month}
								onChange={handleChange}
							/>
							<input
								type="number"
								id="dob_year"
								name="dob_year"
								placeholder="YYYY"
								required={true}
								value={formData.dob_year}
								onChange={handleChange}
							/>
						</div>

						<label className={onboardingStyles.descr}>Gender</label>
						<div className={onboardingStyles.multipleInputContainer}>
							<input
								type="radio"
								id="man-gender-identity"
								name="gender_id"
								value="man"
								onChange={handleChange}
								checked={formData.gender_id === 'man'}
							/>
							<label htmlFor="man-gender-identity">Man</label>

							<input
								type="radio"
								id="woman-gender-identity"
								name="gender_id"
								value="woman"
								onChange={handleChange}
								checked={formData.gender_id === 'woman'}
							/>
							<label htmlFor="woman-gender-identity">Woman</label>

							<input
								type="radio"
								id="more-gender-identity"
								name="gender_id"
								value="other"
								onChange={handleChange}
								checked={formData.gender_id === 'more'}
							/>
							<label htmlFor="more-gender-identity">Other</label>
						</div>

						<label htmlFor="show-gender" className={onboardingStyles.descr}>Show gender on my profile</label>
						<input
							type="checkbox"
							id="show-gender"
							name="show_gender"
							onChange={handleChange}
							checked={formData.show_gender}
						/>

						<label htmlFor="show-gender" className={onboardingStyles.descr}>Show me</label>
						<div className={onboardingStyles.multipleInputContainer}>
							<input
								type="radio"
								id="man-gender-interest"
								name="gender_interest"
								value="man"
								onChange={handleChange}
								checked={formData.gender_interest === 'man'}
							/>
							<label htmlFor="man-gender-interest">Man</label>
							<input
								type="radio"
								id="woman-gender-interest"
								name="gender_interest"
								value="woman"
								onChange={handleChange}
								checked={formData.gender_interest === 'woman'}
							/>
							<label htmlFor="woman-gender-interest">Woman</label>
							<input
								type="radio"
								id="everyone-gender-interest"
								name="gender_interest"
								value="everyone"
								onChange={handleChange}
								checked={formData.gender_interest === 'everyone'}
							/>
							<label htmlFor="everyone-gender-interest">Everyone</label>
						</div>

						<label htmlFor="about" className={onboardingStyles.descr}>About Me</label>
						<input
							type="text"
							id="about"
							name="about"
							required={true}
							placeholder="I like long walks..."
							value={formData.about}
							onChange={handleChange}
						/>

						<label htmlFor="url" className={onboardingStyles.descr}>Profile Photo</label>
						<input
							type="url"
							name="url"
							id="url"
							onChange={handleChange}
							required={true}
						/>
						<div className={onboardingStyles.photoContainer}>
							{formData.url && <img src={formData.url} alt="profile pic preview" />}
						</div>

						<input type="submit" className={onboardingStyles.descr} value="CREATE ACCOUNT" />
				</form>
			</div>
		</>
	)
}

export default OnBoarding;
