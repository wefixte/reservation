const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const authenticate = require('../middleware/auth');
const Reservation = require('../model/Reservation');
const router = express.Router();

router.post('/reservations', authenticate, async (req, res) => {

	try {
		const { name, email, date, time, guests } = req.body;
		
		// On va faire gaffe à la date
		const reservationDate = new Date(date);
		if (isNaN(reservationDate.getTime()) || reservationDate < new Date()) {
            return res.status(400).json({ error: 'Date invalide ou déjà passée' });
        }

		// check les places
		const existingReservations = await Reservation.countDocuments({ date });
        if (existingReservations >= 10) {
            return res.status(400).json({ error: 'Créneau complet' });
        }
		const reservation = await Reservation.create({ name, email, date, guests });
        res.status(201).json(reservation);

    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la réservation' });
    }

});

	
router.get('/reservations', authenticate, async (req, res) => {

	try {
        if (req.user.role !== 'admin') {
            return res.status(403).json({ error: 'Accès refusé' });
        }

        const reservations = await Reservation.find().sort({ date: 1 }); // tri par date
        res.json(reservations);
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la récupération des réservations' });
    }

  });

  router.get('/reservations', authenticate('admin'), async (req, res) => {
    try {
        const reservations = await Reservation.find().sort({ date: 1 });
        res.json(reservations);
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la récupération des réservations' });
    }
});

router.post('/reservations', authenticate('client'), async (req, res) => {
    try {
        const { name, email, date, time, guests } = req.body;
        const reservationDate = new Date(date);

        if (isNaN(reservationDate.getTime()) || reservationDate < new Date()) {
            return res.status(400).json({ error: 'Date invalide ou déjà passée' });
        }

        const existingReservations = await Reservation.countDocuments({ date });
        if (existingReservations >= 10) {
            return res.status(400).json({ error: 'Créneau complet' });
        }

        const reservation = await Reservation.create({ name, email, date, guests });
        res.status(201).json(reservation);
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la réservation' });
    }
});



  module.exports = router;
  