import { useEffect, useState } from "react";
import PokemonModal from "./PokemonModal";
import { GetTypeColor, P } from "../utils/utils";
import PokemonDetails from "./PokemonDetails";

function PokemonCard({pokemon, isMini}) {
  const [pokemonProps, setPokemonProps] = useState();
  const [visible, setModalVisibility] = useState(false);
  const getProps = async () =>{
    try{
      const props =await P.getPokemonByName(pokemon.name).then(response => response);
      setPokemonProps(props);
    }catch(error){
      console.log(`error: ${error}`);
    }
  };

  useEffect(()=> {
    getProps();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[pokemon]);

  return ( 
    <div 
      className="mb-3 w-full h-52 bg-gray-200 rounded shadow hover:shadow-xl" 
      onClick={()=>{
        if(!isMini) 
          setModalVisibility(true)
      }}
    >
      <div className="flex items-center justify-center bg-cover">
        <img src={pokemonProps ? pokemonProps.sprites.front_default : ''} alt={`sprite-${pokemon.name}`}/>
      </div>
      <span className="ml-4">
        <span className="font-bold">N.</span> 
        <span className="ml-2">{pokemonProps?.id}</span>
      </span>
      <span className="flex justify-center text-xl w-full">{pokemon.name}</span>
      <div className="flex ml-4 mt-2 gap-x-2.5">
        {pokemonProps?.types.map((type) => (
          <div className="rounded px-1 py-0.5" style={{backgroundColor:GetTypeColor(type.type.name)}} key={`type-${type.type.name}`}>
            <span className="text-sm">{type.type.name}</span>
          </div>
        ))}
      </div>
      <PokemonModal visible={visible} onClose={()=> setModalVisibility(false)} title={`${pokemon.name} N. ${pokemonProps?.id}`}>
        <PokemonDetails pokemon={pokemon} pokemonProps={pokemonProps} />
      </PokemonModal>
    </div> 
  );
}

export default PokemonCard;