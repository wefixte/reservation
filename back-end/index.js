const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const app = express();
const dotenv = require('dotenv');
const database = require('./config');

const user = require('./routes/user');
const reservation = require('./routes/reservation');

dotenv.config();
require('./cronTache.js');


// Middlewares
app.use(cookieParser());
app.use(bodyParser.json());
app.use(cors({ origin: "http://localhost:5173", credentials: true }));

// Routes
app.use('/user', user);
app.use('/reservation', reservation);

// MongoDB
database.then(() => {
    console.log('✅ Connecté à MongoDB');
}).catch(err => {
    console.error('❌ Erreur de connexion à MongoDB :', err);
});

// Serveur
app.listen(process.env.PORT, () => {
    console.log(`🚀 Server lancé sur ${process.env.PORT}`);
});
