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

// Connexion si jamais t'as déjà un compte
const goToLogin = () => {
  router.push('/login');
};

const goToRegisterAdmin = () => {
  router.push('/register-admin');
};

</script>

<template>
  <div class="flex justify-center items-center min-h-screen bg-pink-50">
    <div class="bg-white p-8 rounded-xl shadow-xl w-96 max-w-sm">
      <h2 class="text-3xl font-bold text-center text-pink-600 mb-6">Inscription</h2>
      
      <input v-model="username" type="text" placeholder="Nom" class="w-full p-3 mb-4 border-2 border-pink-300 rounded-lg focus:ring-2 focus:ring-pink-400 focus:outline-none" />
      
      <input v-model="email" type="email" placeholder="Email" class="w-full p-3 mb-4 border-2 border-pink-300 rounded-lg focus:ring-2 focus:ring-pink-400 focus:outline-none" />
      
      <input v-model="password" type="password" placeholder="Mot de passe" class="w-full p-3 mb-4 border-2 border-pink-300 rounded-lg focus:ring-2 focus:ring-pink-400 focus:outline-none" />
      
      <button @click="register" class="w-full bg-pink-500 text-white p-3 rounded-lg hover:bg-pink-600 focus:outline-none focus:ring-2 focus:ring-pink-400">
        S'inscrire
      </button>
      
      <p v-if="successMsg" class="text-green-500 text-center mt-4">{{ successMsg }}</p>
      <p v-if="errorMsg" class="text-red-500 text-center mt-4">{{ errorMsg }}</p>
      
      <div class="text-center mt-4">
        <p class="text-sm text-pink-600 cursor-pointer" @click="goToLogin">
          Déjà un compte ? Connexion
        </p>
      </div>

      <div class="text-center mt-4">
        <p class="text-sm text-pink-600 cursor-pointer" @click="goToRegisterAdmin">
          Créer un compte administrateur
        </p>
      </div>

    
    </div>
  </div>
</template>
