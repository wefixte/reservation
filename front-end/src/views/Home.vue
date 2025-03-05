<script setup>
import { useRouter } from 'vue-router';

const router = useRouter(); 

const goToLogin = () => {
  console.log("Navigating to Login");
  router.push('/login');
};

const goToRegister = () => {
  console.log("Navigating to Register");
  router.push('/register');
};

const goToRegisterAdmin = () => {
  console.log("Navigating to Register Admin");
  router.push('/register-admin');
};
</script>

<template>
  <div class="flex justify-center items-center min-h-screen bg-gray-50">
    <div class="bg-white p-8 rounded-2xl shadow-xl max-w-sm w-full text-center">
      <h1 class="text-4xl font-bold text-pink-600 mb-6">Bienvenue chez Le Gourmet Moderne</h1>
      <p class="text-lg text-gray-600 mb-8">Réservez facilement votre table en ligne et gérez vos réservations en toute simplicité.</p>
      <p class="text-lg text-gray-600 mb-8">Miam miam lol</p>
  
      <div class="space-y-4">

        <button class="w-full bg-pink-600 text-white py-3 rounded-lg hover:bg-pink-500 focus:outline-none focus:ring-2 focus:ring-pink-400" @click="goToRegister">
          Inscription
        </button>
        <button class="w-full bg-pink-600 text-white py-3 rounded-lg hover:bg-pink-500 focus:outline-none focus:ring-2 focus:ring-pink-400" @click="goToLogin">
          Connexion
        </button>
        <button class="w-full bg-pink-600 text-white py-3 rounded-lg hover:bg-pink-500 focus:outline-none focus:ring-2 focus:ring-pink-400" @click="goToRegisterAdmin">
          Inscription Admin
        </button>
      </div>
    </div>
  </div>
</template>
