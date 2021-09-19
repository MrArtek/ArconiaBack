const express = require('express')
const cors = require('cors')

const website = 'http://localhost:3000';
require('dotenv').config()

const PORT = 8000 | process.env.PORT;
const login = require('./api/routes/auth');
const launcher = require('./api/routes/launcher');
const user = require('./api/routes/user');
const app = express();

//Body Parser
app.use(express.urlencoded({ extended: true}))
app.use(express.json())

app.use(cors({origin: website}));
app.use('/api/auth', login);

app.use('/api/user', user);

app.use('/api/launcher', launcher);

app.listen(PORT, () => {
    console.log(`Server listening on: ${PORT}`)
})