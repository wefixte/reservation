<script setup>
import { ref } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';

const router = useRouter();
const email = ref('');
const password = ref('');
const errorMsg = ref('');

const login = async () => {
    try {
        const { data } = await axios.post('http://localhost:3000/user/login', {
            email: email.value,
            password: password.value
        });

        localStorage.setItem('token', data.token);
        router.push('/reservation');
    } catch (error) {
        console.error(error); // Ajoute ça pour voir l'erreur exacte
        errorMsg.value = "Identifiants incorrects.";
    }
};
</script>

<template>
  <div class="flex justify-center items-center h-screen bg-gray-100">
    <div class="bg-white p-6 rounded-lg shadow-lg w-96">
      <h2 class="text-2xl font-bold mb-4">Connexion</h2>
      <input v-model="email" type="email" placeholder="Email" class="w-full p-2 mb-2 border rounded" />
      <input v-model="password" type="password" placeholder="Mot de passe" class="w-full p-2 mb-2 border rounded" />
      <button @click="login" class="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">Se connecter</button>
      <p v-if="errorMsg" class="text-red-500 mt-2">{{ errorMsg }}</p>
    </div>
  </div>
</template>
