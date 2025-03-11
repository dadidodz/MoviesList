# MoviesList

MoviesList est une application mobile développée en React-Native et utilisant l'API de TMDB. Elle permet de rechercher les derniers films populaires, decouvrir leurs synopsis, note ainsi que leurs acteurs! Mais surtout, elle vous permet d'ajouter les films que vous souhaitez voir à une watchlist, et même, pour les films que vous avez déjà vu, de les ajouter à vos favoris.

## Disclaimer

Tous les tests ont été réalisés avec un compte TMDB personel, tout comme le Token API et le Bearer Token. Ainsi, si vous souhaitez utiliser cette application avec votre compte personnel TMDB, il vous faudra demander une clé API et la renseigner dans un .env à la racine du projet : MoviesList/.env

```ini
# Fichier .env
TMDB_API_KEY=votre_clé_api
TMDB_ACCESS_TOKEN=votre_bearer_token
```

## Documentation

### 📱 Navigation

À l'ouverture de l'application, vous vous retrouver sur la page de login. Il vous faudra donc un compte TMDB pour utiliser l'application. Également, un token API ainsi qu'un bearer token sera nécessaire pour profiter entièrement de l'application.

<p style="text-align: center;">
    <img src="assets/images/LoginScreen.png" width="300" alt="Login screen">
</p>


Après votre connexion, vous vous retrouvez dans l'onglet Accueil. Il est possible naviguer entre 3 onglets, l'Accueil, votre Watchlist et votre Profil.

<p style="text-align: center;">
    <img src="assets/images/Onglets.png" width="300" alt="Onglets">
</p>

### 🎥 Navigation dans les films populaires

Dans l'écran d'accueil, une multitude de films populaires vous est proposée. Vous pouvez faire défiler vers le bas pour les découvrir. 

<p style="text-align: center;">
    <img src="assets/images/HomeScreen.png" width="300" alt="Add task button">
</p>

Une barre de recherche se trouve en haut de l'écran vous permettant de faire une recherche parmi ces films.

<p style="text-align: center;">
    <img src="assets/images/SearchBar.png" width="300" alt="SearchBar">
</p>

### ➕ Ajout à la Watchlist et aux Favoris

Sur la carte de chaque film se trouve deux boutons. Le premier à gauche, un icône de coeur <img src="assets/images/EmptyHeart.png" alt="Heart button">, qui permet d'ajout ce film à votre liste de favoris. Lorsque le coeur est vide ( <img src="assets/images/EmptyHeart.png" alt="Heart button"> ) le film ne fait pas parti de vos favoris, tandis que lorsqu'il est rempli ( <img src="assets/images/FullHeart.png" alt="Heart button"> ), le film se trouve déjà dans vos favoris.

Le second, à droite, icône de liste <img src="assets/images/WatchlistButton.png" alt="Watchlist button">, qui permet d'ajout ce film à votre Watchlist. Lorsque l'icône est gris ( <img src="assets/images/WatchlistButton.png" alt="Watchlist button"> ) le film ne fait pas parti de votre Watchlist, tandis que lorsque c'est un check bleu ( <img src="assets/images/AddedWatchlist.png" alt="AddedWatchlist"> ), le film se trouve déjà dans votre Watchlist.

A savoir, votre watchlist et votre liste de favoris sont synchronisées avec le site de l'API, TMDB. C'est-à-dire que si vous ajoutez un film à vos favoris depuis le site TMDB, ils seront retrouvables dans votre application.

### 📋 Détails d'un film

En cliquant sur le film de votre choix, vous serez redirigé vers l'écran de détails de ce film. Vous y retrouverez différentes informations, comme l'affiche complète du film, le synopsis, les acteurs, les genres, la note ainsi que des films recommandés.

<p style="text-align: center;">
    <img src="assets/images/DetailScreen.png" width="300" alt="Details screen">
</p>

### 👁️ Watchlist

Depuis l'écran d'accueil, l'onglet Watchlist est accessible.
<p style="text-align: center;">
    <img src="assets/images/TabFocusWatchlist.png" alt="Tab focus watchlist">
</p>

Vous retrouvez sur cet écran tous vos films ajoutés à votre Watchlist.
<p style="text-align: center;">
    <img src="assets/images/WatchlistScreen.png" alt="Watchlist screen">
</p>

En faisant un slide sur la gauche sur un film, il vous sera possible de le supprimer de votre Watchlist.
<p style="text-align: center;">
    <img src="assets/images/WatchlistDelete.png" alt="Watchlist delete movie">
</p>

Il vous suffira ensuite d'appuyer sur la croix puis de confirmer votre choix pour que le film sont suppriém de votre Watchlist.
<p style="text-align: center;">
    <img src="assets/images/WatchlistDeleteConfirm.png" width="300" alt="Watchlist delete movie pop-up">
</p>


### ❤️ Favoris

Depuis l'écran d'accueil, l'onglet Profil est également accessible.

<p style="text-align: center;">
    <img src="assets/images/ProfileScreen.png" alt="Profile screen">
</p>

C'est ici que votre liste de favoris est consultable. Elle contient les films que vous avez ajoutés dans votre liste de favoris.

<p style="text-align: center;">
    <img src="assets/images/FavoritesScreen.png" alt="Favorites screen">
</p>

Il suffit d'un slide vers la droite pour revenir à l'écran précédent.


### ❌ Déconnexion

Depuis l'écran Profil il est également possible de se déconnecter de votre compte TMDB ainsi que de l'application. Vous serez alors redirigé vers la page de connexion.
