const api = `https://pokeapi.co/api/v2/pokemon?&limit=40`;
const pokeCards = document.getElementById("poke-cards");
let pokemons = [];

const getPokemon = async () => {
  for (let i = 0; i < 151; i++) {
    const pokeApi = `https://pokeapi.co/api/v2/pokemon/${i + 1}`;
    const response = await fetch(pokeApi);
    let data = await response.json();

    pokemons.push({
      id: data.id,
      name: data.name,
      image: data.sprites.other.dream_world.front_default,
      type: data.types.map((type) => type.type.name),
    });
  }

  console.log(pokemons);
};

getPokemon();
