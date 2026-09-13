# Dashboard Météo

Petit tableau de bord météo en JavaScript sans framework : on saisit une ville, l'app
interroge l'API OpenWeatherMap et ajoute une carte affichant la température, la description
du temps et l'icône correspondante.

Projet d'apprentissage réalisé pour pratiquer le DOM, `fetch`/`async-await` et le
`sessionStorage`, sans librairie externe (hors Font Awesome pour les icônes).

## Fonctionnalités

- Ajouter une ville et afficher sa météo actuelle (en français, en °C)
- Empêcher les doublons : une ville déjà affichée ne peut pas être ajoutée deux fois
- Réordonner les cartes (monter / descendre) et les supprimer
- Persistance de la liste des villes dans `sessionStorage` : les cartes sont rechargées
  automatiquement au rafraîchissement de la page
- Messages d'erreur pour une ville introuvable, un champ vide ou une coupure réseau

## Lancer le projet

1. Créer un compte gratuit sur [OpenWeatherMap](https://openweathermap.org/api) et récupérer
   une clé API.
2. Ouvrir `script.js` et remplacer `VOTRE_CLE_OPENWEATHERMAP` par cette clé.
3. Ouvrir `index.html` dans un navigateur.

L'appel à l'API se faisant depuis le navigateur, la clé est nécessairement visible côté
client : utiliser une clé dédiée à ce projet, et pas une clé partagée avec autre chose.

## Stack

HTML, CSS, JavaScript (ES6+), API OpenWeatherMap, Font Awesome.

## Limites connues

- Météo instantanée uniquement, pas de prévisions sur plusieurs jours.
- `sessionStorage` : la liste est perdue à la fermeture de l'onglet (choix assumé,
  `localStorage` suffirait à la rendre permanente).
- Pas de mise en page responsive travaillée.

## Licence

MIT — voir [LICENSE](LICENSE).
