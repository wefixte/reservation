<script setup>
import { ref } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';

const router = useRouter();
const username = ref('');
const email = ref('');
const password = ref('');
const errorMsg = ref('');
const successMsg = ref('');

const register = async () => {
    try {
      await axios.post('http://localhost:3000/user/register', {
            username: username.value,
            email: email.value,
            password: password.value
        });

        successMsg.value = "Inscription réussie ! Vous pouvez vous connecter.";
        setTimeout(() => router.push('/login'), 2000);
    } catch (error) {
        errorMsg.value = "Erreur lors de l'inscription.";
    }
};
</script>

<template>
  <div class="flex justify-center items-center h-screen bg-gray-100">
    <div class="bg-white p-6 rounded-lg shadow-lg w-96">
      <h2 class="text-2xl font-bold mb-4">Inscription</h2>
      <input v-model="username" type="text" placeholder="Nom" class="w-full p-2 mb-2 border rounded" />
      <input v-model="email" type="email" placeholder="Email" class="w-full p-2 mb-2 border rounded" />
      <input v-model="password" type="password" placeholder="Mot de passe" class="w-full p-2 mb-2 border rounded" />
      <button @click="register" class="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600">S'inscrire</button>
      <p v-if="successMsg" class="text-green-500 mt-2">{{ successMsg }}</p>
      <p v-if="errorMsg" class="text-red-500 mt-2">{{ errorMsg }}</p>
    </div>
  </div>
</template>
