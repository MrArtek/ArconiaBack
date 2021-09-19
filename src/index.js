const express = require('express')
const cors = require('cors')

const website = 'http://localhost:3000';
require('dotenv').config()

const PORT = 8000 | process.env.PORT;
const { token, auth, launcher, user } = require('./api/routes');
const app = express();

//Body Parser
app.use(express.urlencoded({ extended: true}))
app.use(express.json())

app.use(cors({origin: website}));
app.use('/api/auth', auth);

app.use('/api/token', token);

app.use('/api/user', user);

app.use('/api/launcher', launcher);

app.listen(PORT, () => {
    console.log(`Server listening on: ${PORT}`)
})