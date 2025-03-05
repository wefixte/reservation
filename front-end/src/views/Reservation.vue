<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import VueCal from 'vue-cal';
import 'vue-cal/dist/vuecal.css';

const reservations = ref([]);

const fetchReservations = async () => {
    try {
        const { data } = await axios.get('http://localhost:5000/reservation', {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        reservations.value = data.map(r => ({
            start: new Date(r.date),
            end: new Date(r.date),
            title: `${r.name} - ${r.guests} pers.`
        }));
    } catch (error) {
        console.error("Erreur de récupération des réservations");
    }
};

onMounted(fetchReservations);
</script>

<template>
  <div class="p-6">
    <h2 class="text-2xl font-bold mb-4">Réservations</h2>
    <VueCal :events="reservations" />
  </div>
</template>
