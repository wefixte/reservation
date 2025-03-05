<template>
	<div class="home-container">
	  <div class="content">
		<h1 class="title">Bienvenue chez Le Gourmet Moderne</h1>
		<p class="intro">Réservez facilement votre table en ligne et gérez vos réservations en toute simplicité.</p>
  
		<div class="buttons-container">
		  <!-- Bouton pour l'inscription -->
		  <router-link to="/register" class="button-register">
			<button>Inscription</button>
		  </router-link>
  
		  <!-- Bouton pour la connexion -->
		  <router-link to="/login" class="button-login">
			<button>Connexion</button>
		  </router-link>
  
		  <!-- Bouton pour l'inscription Admin -->
		  <router-link to="/user/register" class="button-admin">
			<button>Inscription Admin</button>
		  </router-link>
		</div>
	  </div>
	</div>
  </template>
  
  <script setup>
  // Ici, tu peux ajouter la logique si tu souhaites
  // Mais pour le moment, la page est simple et statique
  </script>
  
  <style scoped>
  .home-container {
	background-color: #f3f4f6; /* Couleur de fond agréable */
	height: 100vh;
	display: flex;
	justify-content: center;
	align-items: center;
	font-family: 'Arial', sans-serif;
  }
  
  .content {
	text-align: center;
	background-color: white;
	padding: 30px;
	border-radius: 12px;
	box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
	max-width: 400px;
	width: 100%;
  }
  
  .title {
	font-size: 2.5rem;
	font-weight: bold;
	color: #f68282; /* Une couleur rose douce */
  }
  
  .intro {
	font-size: 1.2rem;
	color: #6b7280; /* Gris doux */
	margin-bottom: 20px;
  }
  
  .buttons-container {
	display: flex;
	flex-direction: column;
	gap: 15px;
  }
  
  button {
	background-color: #f68282; /* Rose doux */
	color: white;
	font-size: 1rem;
	padding: 12px 20px;
	border: none;
	border-radius: 8px;
	cursor: pointer;
	transition: background-color 0.3s ease;
  }
  
  button:hover {
	background-color: #f07d7d; /* Couleur plus foncée lors du survol */
  }
  
  .button-register,
  .button-login,
  .button-admin {
	text-decoration: none;
  }
  
  button:focus {
	outline: none;
  }
  </style>
  