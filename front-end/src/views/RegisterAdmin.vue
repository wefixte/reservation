<script setup>
import { ref } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';

const router = useRouter();
const username = ref('');
const email = ref('');
const password = ref('');
const adminSecret = ref('');
const errorMsg = ref('');

const register = async () => {
  try {
	const response = await axios.post('http://localhost:3000/user/register-admin', {
	  username: username.value,
	  email: email.value,
	  password: password.value,
	  adminSecret: adminSecret.value,
	});

	router.push('/login');
  } catch (error) {
	errorMsg.value = "Erreur lors de l'inscription.";
  }
};

const goToLogin = () => {
  console.log("Navigating to Login");
  router.push('/login');
};

</script>


<template>
	<div class="flex justify-center items-center min-h-screen bg-pink-50">
	  <div class="bg-white p-8 rounded-xl shadow-xl w-96 max-w-sm">
		<h2 class="text-3xl font-bold text-center text-pink-600 mb-6">Inscription Administrateur</h2>
  
		<input v-model="username" type="text" placeholder="Nom" class="w-full p-3 mb-4 border-2 border-pink-300 rounded-lg" />
		<input v-model="email" type="email" placeholder="Email" class="w-full p-3 mb-4 border-2 border-pink-300 rounded-lg" />
		<input v-model="password" type="password" placeholder="Mot de passe" class="w-full p-3 mb-4 border-2 border-pink-300 rounded-lg" />
		<input v-model="adminSecret" type="password" placeholder="Mot de passe Admin" class="w-full p-3 mb-4 border-2 border-pink-300 rounded-lg" />
  
		<button @click="register" class="w-full bg-pink-500 text-white p-3 rounded-lg">S'inscrire</button>
  
		<p v-if="errorMsg" class="text-red-500 text-center mt-4">{{ errorMsg }}</p>

		<div class="text-center mt-4">
			<p class="text-sm text-pink-600 cursor-pointer" @click="goToLogin">
			Déjà un compte ? Connexion
			</p>
		</div>

		</div>
	</div>
  </template>
