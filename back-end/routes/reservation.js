const express = require('express');
const authenticate = require('../middleware/auth');
const Reservation = require('../model/Reservation');


const router = express.Router();

const TIME_SLOTS = [
    "12:00 - 13:00", "13:00 - 14:00", "14:00 - 15:00",
    "19:00 - 20:00", "20:00 - 21:00", "21:00 - 22:00"
];

router.post('/reservations', authenticate(), async (req, res) => {
    try {
        const { name, email, date, timeSlot, guests } = req.body;

        if (!TIME_SLOTS.includes(timeSlot)) {
            return res.status(400).json({ error: 'Créneau invalide' });
        }

        const existingReservations = await Reservation.countDocuments({ date, timeSlot });
        if (existingReservations >= 5) {
            return res.status(400).json({ error: 'Créneau complet' });
        }

        const reservation = new Reservation({ name, email, date, timeSlot, guests });
        await reservation.save();
        res.status(201).json(reservation);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erreur lors de la réservation' });
    }
});

router.get('/recup-resa', authenticate('admin'), async (req, res) => {
    try {
        const reservations = await Reservation.find().sort({ date: 1 });
        res.json(reservations);
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la récupération des réservations' });
    }
});

module.exports = router;
