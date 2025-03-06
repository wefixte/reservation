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
app.use(cors({ origin: "*", credentials: true }));

// Routes
app.use('/user', user);
app.use('/reservation', reservation);

// Tester si la route est bien chargée
console.log("Routes disponibles :");
console.log(app._router.stack.filter(r => r.route).map(r => r.route.path));


// MongoDB
database.then(() => {
    console.log('✅ Connecté à MongoDB');
}).catch(err => {
    console.error('❌ Erreur de connexion à MongoDB :', err);
});

// Serveur
app.listen(process.env.PORT || 5000, () => {
    console.log(`🚀 Server lancé sur ${process.env.PORT || 5000}`);
});
