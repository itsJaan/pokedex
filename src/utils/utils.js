export const PokemonTypes = {
  bug: '#729f3f',
  dark: '#707070',
  dragon: '#f16e57',
  electric: '#eed535',
  fairy: '#fcb8e8',
  fighting : '#d56723',
  fire: '#fd7d24',
  flying: '#2f9cbc',
  ghost: '#7b62a3',
  grass: '#9bcc50',
  ground: '#ab9842',
  ice: '#51c4e7',
  normal: '#a4acaf',
  poison: '#b97fc9',
  psychic: '#f366b9',
  rock: '#a38c21',
  steel: '#9eb7b8',
  water: '#4592c4',
};

export const GetTypeColor = (name) => {
  if (name in PokemonTypes)return PokemonTypes[name];
  else return 'cbd5e1';
};

const Pokedex = require("pokeapi-js-wrapper")
export const P = new Pokedex.Pokedex();


export const GetEvolutionChainId = (url) =>{
  if(url){
    const parsedUrl= url.split('/');
    return parsedUrl[6];
  }
} 