import { useQuery } from "react-query";
import { GetPokemons } from "../services/services";
import PokemonCard from "./PokemonCard";
import Pokeball from '../assets/imgs/pokeball.png'
import { useEffect, useRef, useState } from "react";


function Main() {
  const buttonRef = useRef();
  const [limit, setLimit] = useState(20);
  const pokemons = useQuery("pokemons",()=>GetPokemons(limit));


  useEffect(() => {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 1.0, 
    };
    
    const handleIntersection = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) buttonRef.current.click();
      });
    };

    const observer = new IntersectionObserver(handleIntersection, options);
    if (buttonRef.current)  observer.observe(buttonRef.current);
    
    return () => {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      if (buttonRef.current) observer.unobserve(buttonRef.current);
    };
  }, []);


  return ( 
    <div className="bg-gray-800 w-full h-screen">
      <div className="w-full h-12 flex justify-center">
        <img src={Pokeball} alt='pokeball' className="h-6 w-6 mx-2 mt-1.5"/>
        <span className="text-2xl font-bold text-white">Pokedex</span>
      </div>
      <div className="relative mx-20 bg-white shadow-sm h-[90%]">
        <div className="px-10 py-2 relative h-[100%] overflow-auto grid grid-cols-5 gap-3">
        { pokemons.isLoading ? (
            <p>Loading...</p>
          ): pokemons.error ? (
            <span>Error!!</span>
          ):
          ( pokemons.data ? pokemons.data.results.map((pokemon, index) => (
                <div key={`card-${index+1}`}>
                  <PokemonCard pokemon={pokemon} isMini={false}/>
                </div>
             )):<></>
          )
        }
        <button 
          ref={buttonRef}
          className="w-full flex justify-start" 
          disabled={pokemons.isLoading || pokemons.isFetching} 
          onClick={()=>{
            if(limit <= pokemons.data.count){
              setLimit(limit+20); 
              pokemons.refetch();
            }
          }}
        >Loading more...</button>
        </div>
      </div>
    </div>
    );
}

export default Main;