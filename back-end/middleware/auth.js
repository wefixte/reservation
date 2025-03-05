const jwt = require('jsonwebtoken');

const authenticate = (roleRequired = 'client') => {
    return (req, res, next) => {
        const token = req.headers['authorization']?.split(' ')[1];
        if (!token) {
            return res.status(401).json({ error: 'Token manquant ou invalide' });
        }

        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                return res.status(403).json({ error: 'Token invalide ou expiré' });
            }

            req.user = decoded; // On ajoute l'utilisateur décodé à la requête
            if (req.user.role !== roleRequired && roleRequired !== 'any') {
                return res.status(403).json({ error: 'Accès interdit' });
            }

            next(); // Si tout est ok, on passe à la suite
        });
    };
};

module.exports = authenticate;
