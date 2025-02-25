import React, { useEffect, useState, useRef } from 'react';

function PokeRivals() {
    const isFirstRender = useRef(true);
    const[render,setRender]=useState(false);
    const[pokemons,setPokemons]=useState([]);
    useEffect(() => {
        if (!isFirstRender.current) return; // Prevents second execution
        isFirstRender.current = false;

        const fetchPoke = async () => {
            try {
                for (let i = 1; i <= 151; i++) {
                    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${i}`);
                    const data = await response.json();
                   
                    setPokemons(prev => [...prev, { img: data.sprites.front_default }]);

                    
                }
            } catch (error) {
                console.error(error);
            }
        };
          
        fetchPoke();
    }, []);

    return(

    
    <div>
       {
        pokemons.map((pokemon)=>(
            <div className='grid grid-rows-3 grid-flow-col gap-4'>

            </div>
        ))
       }
    </div>
    )
        
        
   



    
}

export default PokeRivals;
