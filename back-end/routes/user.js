const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../model/User');
const router = express.Router();

router.post("/register", async (req, res) => {
    let {username, email, password} = req.body;

	// Clean tout ça parce que les utilisateurs sont toujours stupides
	username = username.trim();
    email = email.trim().toLowerCase();
    password = password.trim();

	// Et on check si l'email existe déjà ou po
	try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: "Email déjà utilisé" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            username,
            email,
            password: hashedPassword
        });

        await newUser.save();
        res.status(201).json({ message: "Utilisateur enregistré avec succès" });
    } catch (error) {
        res.status(500).json({ error: "Erreur lors de l'inscription" });
    }
}
);


router.post("/login", async (req, res) => {
    let {email, password} = req.body;

	// Clean tout ça sinon y en a un qui va venir râler alors qu'il est stupide
	email = email.trim().toLowerCase();
    password = password.trim();



	try {
        const currentUser = await User.findOne({ email });
        if (!currentUser) {
            return res.status(400).json({ error: "Email introuvable" });
        }

        const passwordMatch = await bcrypt.compare(password, currentUser.password);
        if (!passwordMatch) {
            return res.status(400).json({ error: "Mot de passe incorrect" });
        }

        const token = jwt.sign(
            { id: currentUser._id, username: currentUser.username, role: currentUser.role },
            process.env.SECRET,
            { expiresIn: "1h" } // ptite validité là
        );

        res.cookie("token", token, { httpOnly: true, secure: true, maxAge: 3600000 });
        res.json({ token, role: currentUser.role }); // y a un monde j'ai besoin du rôle
    } catch (error) {
        res.status(500).json({ error: "Erreur lors de la connexion" });
    }
}
);

module.exports = router;

