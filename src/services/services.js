import axios from "axios";

export const GetPokemons = async (limit) =>{
    const data = await axios.get(`https://pokeapi.co/api/v2/pokemon?offset=0&limit=${limit}`).then(response => response.data);
    return data;
}