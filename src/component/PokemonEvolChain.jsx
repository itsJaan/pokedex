import { useEffect, useState } from "react";
import { P } from "../utils/utils";
import PokemonCard from "./PokemonCard";

function PokemonEvolChain({id}) {
  const [evolutionChain, setEvolutionChain] = useState();
  const [evolutionArray, setEvolutionArray] = useState([]);
  const getEvolutionChain = async () =>{
    try{
      const evol = await P.getEvolutionChainById(id);
      setEvolutionChain(evol);
    }catch(error){
      console.log(`error: ${error}`);
    }
  }

  const separateChain = async() =>{
    try{
      let array=[]
      if(evolutionChain.chain){
        const first = await P.getPokemonByName(evolutionChain.chain.species?.name);
        array.push(first);
        if(evolutionChain.chain.evolves_to?.length>0){
          const second = await P.getPokemonByName(evolutionChain.chain.evolves_to[0].species.name);
          array.push(second);
          if(evolutionChain.chain.evolves_to[0]?.evolves_to?.length>0){
            const third = await P.getPokemonByName(evolutionChain.chain.evolves_to[0].evolves_to[0].species.name);
            array.push(third);
          }
        }
      }
      setEvolutionArray(array);
    }catch(error){
      console.log(`error: ${error}`);
    }
  }


  useEffect(()=>{
    getEvolutionChain();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[id]);

  useEffect(()=>{
    separateChain();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[evolutionChain]);

  return ( 
    <div className="w-full h-full grid grid-cols-3 gap-x-2 px-6">
      <div className="col-span-3 mt-2 text-xl font-bold"> Evolution Chain</div>
      { evolutionArray.length>0 && evolutionArray.map((pokemon, index) =>(
        <div key={`evolutioncard-${index}`} className="flex items-center">
          <PokemonCard pokemon={pokemon} isMini={true}/>
          {
            index< evolutionArray.length-1 && 
            <span className="font-extrabold text-xs" >{`>>`}</span>
          }
        </div>
      ))

      }
    </div>
  );
}

export default PokemonEvolChain;