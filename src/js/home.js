const api = `https://pokeapi.co/api/v2/pokemon?&limit=40`;
const pokeCards = document.getElementById("poke-cards");
let pokemons = [];

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
      image: pokemon.sprites.other["official-artwork"].front_default,
      type: pokemon.types.map((type) => {
        return type.type.name;
      }),
    };
    pokemons.push(pokemonObject);
  });
  console.log(pokemons);
};

getPokemon();
