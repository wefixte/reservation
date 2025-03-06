<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import VueCal from 'vue-cal';
import 'vue-cal/dist/vuecal.css';

const reservations = ref([]);
const timeSlots = ["12:00 - 13:00", "13:00 - 14:00", "14:00 - 15:00", "19:00 - 20:00", "20:00 - 21:00", "21:00 - 22:00"];
const newReservation = ref({ date: '', timeSlot: '', guests: 1 });
const successMsg = ref('');
const errorMsg = ref('');

const fetchReservations = async () => {
    try {
        const { data } = await axios.get('http://localhost:3000/reservation/recup-resa', {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        reservations.value = data;
    } catch (error) {
        console.error('Erreur chargement réservations:', error);
    }
};

const bookTable = async () => {

    const { date, timeSlot, guests } = newReservation.value;

    if (!date || !timeSlot || !guests) {
        console.error("Les champs ne sont pas correctement remplis.");
        errorMsg.value = "Veuillez remplir tous les champs.";
        return;
    }

    try {
        const email = JSON.parse(atob(localStorage.getItem('token').split('.')[1])).email;
        const name = JSON.parse(atob(localStorage.getItem('token').split('.')[1])).username;
        console.log(JSON.parse(atob(localStorage.getItem('token').split('.')[1])));


        const response = await axios.post('http://localhost:3000/reservation/reservations', 
            { name, email, date, timeSlot, guests }, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            });

        console.log("Réponse du serveur:", response);
        successMsg.value = "Réservation réussie !";
    } catch (error) {
        console.error('Erreur de réservation:', error);
        errorMsg.value = error.response?.data?.error || "Erreur de réservation.";
    }
};

onMounted(fetchReservations);
</script>

<template>
  <div class="p-6 max-w-4xl mx-auto">
    <h1 class="text-2xl font-bold mb-4">Réservez votre table</h1>

    <VueCal active-view="month" locale="fr" :disable-views="['years', 'year', 'week', 'day']"/>

    <div class="mt-6">
      <input type="date" v-model="newReservation.date" class="border p-2 mr-2" />
      <select v-model="newReservation.timeSlot" class="border p-2 mr-2">
        <option v-for="slot in timeSlots" :key="slot" :value="slot">{{ slot }}</option>
      </select>
      <input type="number" v-model="newReservation.guests" min="1" class="border p-2 mr-2" />
      <button @click="bookTable" class="bg-blue-500 text-white p-2">Réserver</button>
    </div>

    <p v-if="successMsg" class="text-green-500">{{ successMsg }}</p>
    <p v-if="errorMsg" class="text-red-500">{{ errorMsg }}</p>
  </div>
</template>
