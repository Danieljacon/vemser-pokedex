const api = `https://pokeapi.co/api/v2/pokemon/?limit=151`;
const pokeCards = document.getElementById("poke-cards");
const inputSearchPokemons = document.getElementById("input-search-pokemon");

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

const getPokemonTypes = (pokemon) => {
  return pokemon
    .map((type) => {
      return `<p class="popover ${
        types.find((t) => t.type === type).class
      }">${type}</p>`;
    })
    .join("");
};

const pokemonCardsComponent = (name, type, classes, image) => {
  return `
        <div class="poke-card">
            <div class="poke-infos">
                <h3>${name}</h3>
                <span>
                    ${getPokemonTypes(type)}
                </span>
            </div>
            <div class="poke-photo ${classes}">
                <img
                    src="${image}">
            </div>
        </div>
    `;
};

const waitListComponent = () => {
    return `
    <span class="load-list">
        <p>Aguarde carregar a lista de Pokémons!!</p>
        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Pok%C3%A9_Ball_icon.svg/640px-Pok%C3%A9_Ball_icon.svg.png">
    </span>
    `;
}

const getPokemon = async () => {
  pokeCards.innerHTML = waitListComponent();
  const response = await fetch(api);
  let pokemonsList = await response.json();
  const { results } = pokemonsList;

  const pokemonsFullList = await Promise.all(
    results.map(async (pokemon) => {
      const pokemonResponse = await fetch(pokemon.url);
      const response = pokemonResponse.json();
      return response;
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

  pokeCards.innerText = "";

  pokemons.map((pokemon) => {
    pokeCards.innerHTML += pokemonCardsComponent(
      pokemon.name,
      pokemon.type,
      pokemon.classes[0],
      pokemon.image
    );
  });

  inputSearchPokemons.addEventListener("keyup", (e) => {
    const search = e.target.value.toLowerCase();
    pokeCards.innerHTML = "";

    const filteredPokemons = pokemons.filter((pokemon) => {
      return pokemon.name.includes(search);
    });

    filteredPokemons.map((pokemon) => {
      pokeCards.innerHTML += pokemonCardsComponent(
        pokemon.name,
        pokemon.type,
        pokemon.classes[0],
        pokemon.image
      );
    });
  });
};

getPokemon();
