const api = `https://pokeapi.co/api/v2/pokemon?&limit=40`;
const pokeCards = document.getElementById("poke-cards");
let pokemons = [];

const types = [
  { type: "fire", class: "bg-red-gradient" },
  { type: "grass", class: "bg-green-gradient" },
  { type: "water", class: "bg-blue-gradient" },
  { type: "bug", class: "bg-yellow-gradient" },
  { type: "normal", class: "bg-gray-gradient" },
  { type: "poison", class: "bg-purple-gradient" },
  { type: "electric", class: "bg-yellow-gradient" },
  { type: "ground", class: "bg-brown-gradient" },
  { type: "fairy", class: "bg-pink-gradient" },
  { type: "fighting", class: "bg-red-gradient" },
  { type: "psychic", class: "bg-purple-gradient" },
  { type: "rock", class: "bg-brown-gradient" },
  { type: "ghost", class: "bg-purple-gradient" },
  { type: "ice", class: "bg-blue-gradient" },
  { type: "dragon", class: "bg-red-gradient" },
  { type: "flying", class: "bg-blue-gradient" },
  { type: "dark", class: "bg-black-gradient" },
  { type: "steel", class: "bg-gray-gradient" },
];

const getPokemon = async () => {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/?limit=40`);
  let pokemonsList = await response.json();
  const { results } = pokemonsList;

  const pokemonsFullList = await Promise.all(
    results.map(async (pokemon) => {
      const pokemonResponse = await fetch(pokemon.url);
      return pokemonResponse.json();
    })
  );

  pokemonsFullList.map((pokemon) => {
    const pokemonObject = {
      id: pokemon.id,
      name: pokemon.name,
      image: pokemon.sprites.other["dream_world"].front_default,
      type: pokemon.types.map((type) => {
        return type.type.name;
      }),
      class: types.find((type) => {
        if (pokemon.types[0].type.name === type.type) {
          return type;
        }
      }),
    };
    pokemons.push(pokemonObject);
  });
};

getPokemon();
