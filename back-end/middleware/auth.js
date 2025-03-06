const jwt = require('jsonwebtoken');

module.exports = function authenticate() {
    return (req, res, next) => {
        const token = req.header('Authorization');
        if (!token) {
            return res.status(401).json({ error: 'Accès refusé. Aucun token fourni.' });
        }

        try {
            const decoded = jwt.verify(token.replace('Bearer ', ''), process.env.JWT_SECRET);
            req.user = decoded;
            next();
        } catch (err) {
            res.status(403).json({ error: 'Token invalide.' });
        }
    };
};
