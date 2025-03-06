const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../model/User');
const router = express.Router();

router.post("/register", async (req, res) => {
    let { username, email, password } = req.body;

    // Nettoyer les données (enlever espaces superflus)
    username = username.trim();
    email = email.trim().toLowerCase();
    password = password.trim();

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: "Email déjà utilisé" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            username,
            email,
            password: hashedPassword,
            role: 'client',  // Par défaut, le rôle est 'client'
        });

        await newUser.save();
        res.status(201).json({ message: "Utilisateur enregistré avec succès" });
    } catch (error) {
        res.status(500).json({ error: "Erreur lors de l'inscription" });
    }
});

// Route de login
router.post("/login", async (req, res) => {
    let { email, password } = req.body;

    // Nettoyer les données (enlever espaces superflus)
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

        // Générer le token JWT
        const token = jwt.sign(
            { id: currentUser._id, username: currentUser.username, role: currentUser.role, email: currentUser.email },
            process.env.JWT_SECRET, // Clé secrète définie dans .env
            { expiresIn: '1h' }  // Le token expire après 1 heure, tu peux ajuster ce délai
        );

        // Renvoi du token au frontend
        res.json({ 
            token, 
            role: currentUser.role, 
            email: currentUser.email 
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erreur lors de la connexion" });
    }
});

// Register version admin
router.post("/register-admin", async (req, res) => {
    let { username, email, password, adminSecret } = req.body;

    username = username.trim();
    email = email.trim().toLowerCase();
    password = password.trim();

    // Vérification du secret admin
    if (adminSecret !== process.env.ADMIN_SECRET) {
        return res.status(403).json({ error: "Mot de passe administrateur incorrect" });
    }

    try {
        // Vérifier si l'email est déjà utilisé
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: "Email déjà utilisé" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            username,
            email,
            password: hashedPassword,
            role: 'admin',  // Ici, on crée un admin
        });

        await newUser.save();
        res.status(201).json({ message: "Administrateur inscrit avec succès" });
    } catch (error) {
        res.status(500).json({ error: "Erreur lors de l'inscription" });
    }
});

module.exports = router;
