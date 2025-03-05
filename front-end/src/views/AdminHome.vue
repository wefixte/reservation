<template>
	<div>
	  <h2>Tableau de Bord Administrateur</h2>
	  <div v-if="reservations.length > 0">
		<table>
		  <thead>
			<tr>
			  <th>Nom</th>
			  <th>Date</th>
			  <th>Heure</th>
			  <th>Invités</th>
			</tr>
		  </thead>
		  <tbody>
			<tr v-for="res in reservations" :key="res._id">
			  <td>{{ res.name }}</td>
			  <td>{{ new Date(res.date).toLocaleDateString() }}</td>
			  <td>{{ new Date(res.date).toLocaleTimeString() }}</td>
			  <td>{{ res.guests }}</td>
			</tr>
		  </tbody>
		</table>
	  </div>
	</div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import axios from 'axios';
  
  const reservations = ref([]);
  
  onMounted(async () => {
	  const token = localStorage.getItem('token');
	  try {
		  const { data } = await axios.get('http://localhost:5000/reservation/reservations', {
			  headers: { Authorization: `Bearer ${token}` }
		  });
		  reservations.value = data;
	  } catch (error) {
		  console.error(error);
	  }
  });
  </script>
  