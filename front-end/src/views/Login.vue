<script setup>
import { ref } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';

const router = useRouter();
const email = ref('');
const password = ref('');
const errorMsg = ref('');

// Fonction de connexion
const login = async () => {
    try {
        const { data } = await axios.post('http://localhost:3000/user/login', {
            email: email.value,
            password: password.value
        });

        localStorage.setItem('token', data.token);

        // Redirection selon le rôle
        if (data.role === 'admin') {
            router.push('/admin-dashboard'); // Page admin
        } else {
            router.push('/client-home'); // Page client
        }
    } catch (error) {
        console.error(error);
        errorMsg.value = "Identifiants incorrects.";
    }
};

// Redirection vers la page d'inscription
const goToRegister = () => {
  router.push('/register');
};
</script>

<template>
  <div class="flex justify-center items-center min-h-screen bg-pink-50">
    <div class="bg-white p-8 rounded-xl shadow-xl w-96 max-w-sm">
      <h2 class="text-3xl font-bold text-center text-pink-600 mb-6">Connexion</h2>
      
      <input v-model="email" type="email" placeholder="Email" class="w-full p-3 mb-4 border-2 border-pink-300 rounded-lg focus:ring-2 focus:ring-pink-400 focus:outline-none" />
      <input v-model="password" type="password" placeholder="Mot de passe" class="w-full p-3 mb-4 border-2 border-pink-300 rounded-lg focus:ring-2 focus:ring-pink-400 focus:outline-none" />
      <button @click="login" class="w-full bg-pink-500 text-white p-3 rounded-lg hover:bg-pink-600 focus:outline-none focus:ring-2 focus:ring-pink-400">
        Se connecter
      </button>
      
      <p v-if="errorMsg" class="text-red-500 text-center mt-4">{{ errorMsg }}</p>
      
      <div class="text-center mt-4">
        <p class="text-sm text-pink-600 cursor-pointer" @click="goToRegister">
          Pas encore de compte ? Inscris-toi
        </p>
      </div>
    </div>
  </div>
</template>
