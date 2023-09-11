const express = require('express');
const { MongoClient } = require('mongodb');
const { v4: uuidv4 } = require('uuid');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const bcrypt = require('bcrypt');
require('dotenv').config();

const uri = process.env.URI;
const port = process.env.PORT || 8000;

const app = express();
app.use(cors());
app.use(express.json());

//check heila api
app.get('/', (req, res) => {
	res.json('heila to my app!');
});

// Signup to MongoDB
app.post('/signup', async (req, res) => {
	const client = new MongoClient(uri);

	const { email, password } = req.body;

	const generatedUserId = uuidv4();
	const hashedPassword = await bcrypt.hash(password, 10);

	try {
		await client.connect();
		const database = client.db('app-data');
		const users = database.collection('users');

		const existingUser = await users.findOne({email});
		if (existingUser) {
			return res.status(409).send("User already exist. Please login.");
		}

		const sanitizedEmail = email.toLowerCase();

		const data = {
			user_id: generatedUserId,
			email: sanitizedEmail,
			hashed_password: hashedPassword
		};

		const insertedUser = await users.insertOne(data);

		// to make it more secure you would need also a secret key
		const token = jwt.sign(insertedUser, sanitizedEmail, {
			expiresIn: 60 * 24,
		})

		res.status(201).json({ token, userId: generatedUserId });

	} catch (err) {
		console.log(err);
	} finally {
		await client.close();
	}

});

//login
app.post('/login', async (req, res) => {
	const client = new MongoClient(uri);
	const { email, password } = req.body;

	try {
		await client.connect();
		const database = client.db('app-data');
		const users = database.collection('users');

		const user = await users.findOne({ email });

		const correctPassword = await bcrypt.compare(password, user.hashed_password);

		if (user && correctPassword) {
			const token = jwt.sign(user, email, {
				expiresIn: 60 * 24
			})
			res.status(201).json({ token, userId: user.user_id })
		}
		res.status(400).send('Invalid credentials');

	} catch (err) {
		console.log(err);
	} finally {
		await client.close();
	}
})

// get unique user
app.get('/user', async (req, res) => {
	const client = new MongoClient(uri);
	const userId = req.query.userId;

	try {
		await client.connect();
		const database = client.db('app-data');
		const users = database.collection('users');

		const query = { user_id: userId };
		const user = await users.findOne(query);
		if (user) {
			res.json(user);
		} else {
			 res.status(404).send({ message: 'User not found'});
		}
	} catch (err) {
		console.log('Error while fetching user:', err);
		res.status(500).send({ message: 'Internal server error'});
	} finally {
		await client.close();
	}
})

// add liked user
app.put('/addmatch', async (req, res) => {
	const client = new MongoClient(uri);
	const { userId, matchedUserId } = req.body;

	try {
		await client.connect();
		const database = client.db('app-data');
		const users = database.collection('users');

		const query = { user_id: userId };
		const updateDocument = {
			$push: { matches: {user_id: matchedUserId}},
		}
		const user = await users.updateOne(query, updateDocument)
		res.send(user);
	} finally {
		await client.close();
	}
})

// add disliked user
app.put('/addswipeleft', async (req, res) => {
	const client = new MongoClient(uri);
	const { userId, dislikedUserId } = req.body;

	try {
		await client.connect();
		const database = client.db('app-data');
		const users = database.collection('users');

		const query = { user_id: userId };
		const updateDocument = {
			$push: { disliked: {user_id: dislikedUserId}},
		}
		const user = await users.updateOne(query, updateDocument)
		res.send(user);
	} finally {
		await client.close();
	}
})

// Get all Users by userIds in the Database
app.get('/users', async (req, res) => {
	const client = new MongoClient(uri);
	const userIds = JSON.parse(req.query.userIds);

	try {
		await client.connect();
		const database = client.db('app-data');
		const users = database.collection('users');

		const pipeline =
			[
				{
					'$match': {
						'user_id': {
							'$in': userIds
						}
					}
				}
			];

		const foundUsers = await users.aggregate(pipeline).toArray();

		res.json(foundUsers);

	} finally {
		await client.close();
	}
});



app.get('/gendered-users', async (req, res) => {
	const client = new MongoClient(uri);
	const gender = req.query.gender;

	try {
		await client.connect();
		const database = client.db('app-data');
		const users = database.collection('users');
		const query = {gender_id: {$eq: gender}};
		const foundUsers = await users.find(query).toArray();
		res.json(foundUsers);

	} finally {
		await client.close();
	}
});

// update user in DB while onboarding
app.put('/user', async (req, res) => {
	const client = new MongoClient(uri);
	const formData = req.body.formData;

	try {
		await client.connect();
		const database = client.db('app-data');
		const users = database.collection('users');

		const query = {user_id: formData.user_id};

		const updateDocument = {
			$set: {
				first_name: formData.first_name,
				dob_day: formData.dob_day,
				dob_month: formData.dob_month,
				dob_year: formData.dob_year,
				show_gender: formData.show_gender,
				gender_id: formData.gender_id,
				gender_interest: formData.gender_interest,
				url: formData.url,
				about: formData.about,
				matches: formData.matches,
				disliked: formData.disliked
			}
		}

		const insertedUser = await users.updateOne(query, updateDocument);

		res.json(insertedUser);

	} finally {
		await client.close();
	}
});

// Get Messages by from_userId and to_userId
app.get('/messages', async (req, res) => {
	const {userId, correspondingUserId} = req.query;
	const client = new MongoClient(uri);

	try {
		await client.connect();
		const database = client.db('app-data');
		const messages = database.collection('messages');

		const query = {
			from_userId: userId, to_userId: correspondingUserId
		}
		const foundMessages = await messages.find(query).toArray();
		res.send(foundMessages);
	} finally {
		await client.close();
	}
})

// Add a Message to our Database
app.post('/message', async (req, res) => {
	const client = new MongoClient(uri);
	const message = req.body.message;

	try {
		await client.connect();
		const database = client.db('app-data');
		const messages = database.collection('messages');

		const insertedMessage = await messages.insertOne(message);
		res.send(insertedMessage);
	} finally {
		await client.close();
	}
})

app.listen(port, () => console.log("Server running on port: " + port));
