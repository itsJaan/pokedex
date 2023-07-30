import { Bar, BarChart, CartesianGrid, Tooltip, XAxis, YAxis } from "recharts";
import { useEffect, useMemo, useState } from "react";
import { GetEvolutionChainId, GetTypeColor, P } from "../utils/utils";
import PokemonEvolChain from "./PokemonEvolChain";

function PokemonDetails({pokemon, pokemonProps}) {
  const [pokemonSpecie, setPokemonSpecie] = useState();

  const getSpecie = async() =>{
    try{
      const sp = await P.getPokemonSpeciesByName(pokemon.name).then(response => response);
      setPokemonSpecie(sp);
    }catch(error){
      console.log(`error: ${error}`);
    }
  };
  
  const pokemonStats = useMemo(()=>{
    if(pokemonProps?.stats){
      return pokemonProps?.stats.map((stat) =>{return {name:stat.stat.name, value:stat.base_stat}})
    }
  },[pokemonProps]);
  

  useEffect(()=>{
    getSpecie();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);

  return ( 
  <div className="grid grid-cols-2 h-[100%]">
  <div className="flex items-center bg-cover bg-center">
     <img  className="w-[80%] h-[80%] object-contain" src={pokemonProps ? pokemonProps.sprites.other.home.front_default : ''} alt={`sprite-${pokemon.name}`}/>
  </div>
  <div className="w-full h-full">
    <div className="p-4 relative bg-[#30a7d7] h-1/2 mr-6 rounded-md grid grid-cols-2">
      <div className="flex">
        <span className="font-semibold">Weight:</span>
        <span className="ml-2">{pokemonProps?.weight /10}kg</span>
      </div>
      <div className="flex">
        <span className="font-semibold">Happiness:</span>
        <span className="ml-2">{pokemonSpecie?.base_happiness}</span>
      </div>
      <div className="flex">
        <span className="font-semibold">Capture Rate:</span>
        <span className="ml-2">{pokemonSpecie?.capture_rate}</span>
      </div>
      <div className="flex">
      <span className="font-semibold">Habitat:</span>
        <span className="ml-2">{pokemonSpecie?.habitat.name}</span>
      </div>
      <div className="flex col-span-2">
        <span className="font-semibold">Growth Rate:</span>
        <span className="ml-2">{pokemonSpecie?.growth_rate.name}</span>
      </div>
      <div className="flex col-span-2">
        <span className="font-semibold">Abilities:</span>
        { pokemonProps?.abilities.map((ability,index) => (
            <div key={`ability-${index}`}>
              <span className="ml-2">{ability.ability.name}</span>
              {index+1 !== pokemonProps.abilities.length && <span>,</span>}
            </div>
        ))
        }
      </div>
    </div>
    <div className="relative h-1/2 mr-6 ">
      <div className="flex flex-col h-1/4">
        <span className="text-lg font-semibold text-left"> Type: </span>
        <div className="flex items-center gap-3">
          {pokemonProps?.types.map((type) => (
            <div className="w-fit rounded px-1 py-0.5" style={{backgroundColor:GetTypeColor(type.type.name)}} key={`type-${type.type.name}`}>
              <span className="text-sm">{type.type.name}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="w-full h-[70%] mt-5 rounded">
        <BarChart data={pokemonStats} width={400} height={150}>
        <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="value" fill="#30a7d7" barSize={25} />
        </BarChart>
      </div>
    </div>
  </div>
  <div className="col-span-2 mt-2 h-full ">
    <PokemonEvolChain id={GetEvolutionChainId(pokemonSpecie?.evolution_chain.url)}/>
  </div>
</div>);
}

export default PokemonDetails;