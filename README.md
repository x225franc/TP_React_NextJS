
# TP Machine Next

# Pour lancer le projet en 1 seule commande, utilisez :
```
npm run setup
```

## - Énoncé

#### Consommer l’API suivante :
[https://nestjs-pokedex-api.vercel.app](https://nestjs-pokedex-api.vercel.app)

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

| Critère                     | Points |
|------------------------------|--------|
| **Page principale Pokédex**  |        |
| Scroll fetch                 | 2      |
| Filtre par nom               | 2      |
| Filtre par type(s)           | 2      |
| Gestion de la limit          | 1      |
| Qualité de la page           | 3      |
| **Page détail d'un Pokémon** |        |
| Bouton retour                | 1      |
| Infos du Pokémon             | 1      |
| Évolutions                   | 1      |
| Qualité de la page           | 2      |
| **Compétences techniques**   |        |
| Qualité du code              | 3      |
| Logique du code              | 2      |


---