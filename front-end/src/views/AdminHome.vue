<template>
	<div class="min-h-screen bg-gray-50 p-6">
	  <h2 class="text-3xl font-semibold text-center text-pink-600 mb-8">Tableau de Bord des admins</h2>
	  
	  <div class="bg-white p-6 rounded-xl shadow-lg max-w-full mx-auto">
		<vue-cal
		:events="events"
		:on-event-click="onEventClick"
		:show-time="true"
		:time-from="8 * 60"
		:time-to="23 * 60"
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
const token = localStorage.getItem('token');

onMounted(async () => {
	try {
		const { data } = await axios.get('http://localhost:3000/reservation/recup-resa', {
			headers: { Authorization: `Bearer ${token}` }
		});


		events.value = data.map(reservation => {
		const [startHour, startMinute] = reservation.timeSlot.split(" - ")[0].split(":");
		
		const startDate = new Date(reservation.date);
		startDate.setHours(parseInt(startHour, 10), parseInt(startMinute, 10));

		return {
			start: startDate,
			end: new Date(startDate.getTime() + 60 * 60 * 1000),
			title: reservation.name,
			guests: reservation.guests,
			description: `Invités: ${reservation.guests}`,
		};
		});

	} catch (error) {
		console.error('Erreur de récupération des réservations:', error);
	}
});

function onEventClick(event) {
	alert(`Réservation de ${event.title} le ${event.start.toLocaleString()}`);
}
</script>

<style scoped>
.vue-cal {
	max-width: 100%;
	margin: 0 auto;
}
</style>
