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
      classes: pokemon.types.map((type) => {
        return types.find((t) => t.type === type.type.name).class;
      }),
    };
    pokemons.push(pokemonObject);
});
console.log(pokemons);

  pokemons.map((pokemon) => {
    pokeCards.innerHTML += `
        <div class="poke-card">
            <div class="poke-infos">
                <h3>${pokemon.name}</h3>
                <span>
                    <p class="popover bg-green-gradient">Grass</p>
                    <p class="popover bg-purple-gradient">Poison</p>
                </span>
            </div>
            <div class="poke-photo bg-green-gradient">
                <img
                    src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/1.svg">
            </div>
        </div>
    `;
  });
};

getPokemon();
