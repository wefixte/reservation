<template>
	<div class="min-h-screen bg-gray-50 p-6">
	  <h2 class="text-3xl font-semibold text-center text-pink-600 mb-8">Tableau de Bord des admins</h2>
	  
	  <div class="bg-white p-6 rounded-xl shadow-lg max-w-full mx-auto">
		<vue-cal
		  :events="events"
		  :event-click="onEventClick"
		  :show-time="true"
		  :disable-dates="disableDates"
		  :event-color="getEventColor"
		  class="rounded-xl shadow-md"
		/>
	  </div>
	</div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import axios from 'axios';
  import VueCal from 'vue-cal';
  import 'vue-cal/dist/vuecal.css';
  
  const events = ref([]);
  const disableDates = ref([]);
  const token = localStorage.getItem('token');
  
  onMounted(async () => {
	try {
	  const { data } = await axios.get('http://localhost:3000/reservation/reservations', {
		headers: { Authorization: `Bearer ${token}` }
	  });
  
	  events.value = data.map(reservation => ({
		start: new Date(reservation.date),
		end: new Date(reservation.date),
		title: reservation.name,
		guests: reservation.guests,
		description: `Invités: ${reservation.guests}`,
	  }));
  
	  const today = new Date();
	  disableDates.value = data.map(reservation => {
		const reservationDate = new Date(reservation.date);
		return reservationDate < today ? reservationDate.toISOString().split('T')[0] : null;
	  }).filter(Boolean);
  
	} catch (error) {
	  console.error('Erreur de récupération des réservations:', error);
	}
  });

  function onEventClick(event) {
	alert(`Réservation de ${event.title} le ${event.start}`);
  }

  function getEventColor(event) {
	return event.guests > 5 ? 'red' : 'green';
  }
  </script>
  
  <style scoped>
  .vue-cal {
	max-width: 100%;
	margin: 0 auto;
  }
  </style>
  