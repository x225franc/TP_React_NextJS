---

# TP Machine Next

## Énoncé

Consommer l’API suivante :
[https://nestjs-pokedex-api.vercel.app](https://nestjs-pokedex-api.vercel.app)

---

## Pages à réaliser

### Page 1 : Liste des Pokémons

* Afficher les Pokémons par lots de 50 (par défaut)
* Scroll en bas de page → refetch d’un certain nombre supplémentaire selon le paramètre `limit`
* Filtrer par nom du Pokémon
* Filtrer par un ou plusieurs types de Pokémon
* Affichage sous forme de cards contenant :

  * ID
  * Image
  * Nom
  * Types

### Page 2 : Détails d’un Pokémon

* Au clic sur une card, afficher les détails du Pokémon sur :

  * Une autre page
  * Ou une modal
  * Ou tout autre moyen
* Afficher un bouton de retour vers la liste
* Afficher :

  * Nom
  * Image
  * Stats
  * Évolutions du Pokémon

---

## Endpoints API

### /pokemons

| Paramètre | Description                                    |
| --------- | ---------------------------------------------- |
| page      | Numéro de page à récupérer                     |
| limit     | Nombre de Pokémons à récupérer (50 par défaut) |
| typeId    | ID d’un type                                   |
| types     | Tableau d’ID de types                          |
| name      | Nom d’un Pokémon                               |

### /pokemons/:pokedexId

* Aucun paramètre supplémentaire

### /types

* Aucun paramètre

---

## Barème de notation

| Critère                  | Points |
| ------------------------ | ------ |
| Page principale Pokedex  |        |
| Page détail d’un Pokemon |        |
| Compétences techniques   |        |
| Scroll fetch             | 2      |
| Bouton retour            | 1      |
| Qualité du code          | 3      |
| Filtre par nom           | 2      |
| Infos du Pokémon         | 1      |
| Logique du code          | 2      |
| Filtre par type(s)       | 2      |
| Évolutions               | 1      |
| Gestion de la limit      | 1      |
| Qualité de la page       | 2      |
| Qualité de la page       | 3      |

---