// Api

const BASE_URL = 'https://nestjs-pokedex-api.vercel.app';

// Récupère la liste des Pokémons avec pagination, filtre nom et types
export async function getPokemons({ page = 1, limit = 50, name = '', types = [] } = {}) {
	const params = new URLSearchParams();
	params.append('page', page.toString());
	params.append('limit', limit.toString());
	if (name) params.append('name', name);
		if (Array.isArray(types) && types.length > 0) {
			types.forEach(typeId => params.append('types', String(typeId)));
		}
	const res = await fetch(`${BASE_URL}/pokemons?${params.toString()}`);
	if (!res.ok) throw new Error('Erreur API Pokémon');
	return res.json();
}

// Récupère les détails d'un Pokémon par son pokedexId
export async function getPokemonDetails(pokedexId) {
	if (!pokedexId) throw new Error('pokedexId requis');
	const res = await fetch(`${BASE_URL}/pokemons/${pokedexId}`);
	if (!res.ok) throw new Error('Erreur API Détail Pokémon');
	return res.json();
}

// Récupère la liste des types de Pokémons
export async function getTypes() {
	const res = await fetch(`${BASE_URL}/types`);
	if (!res.ok) throw new Error('Erreur API Types Pokémon');
	return res.json();
}

