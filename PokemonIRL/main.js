//fetch function for pokemon data
const fetchPokemonData = async (url, options = {}) => {
    try {
        const response = await fetch(url, options);

        if (!response.ok) {
            console.log(`Response: FAIL!`)
            throw new Error(`Fetch failed. ${response.status} ${response.statusText}`)
        } else if (response.ok === true) {
            console.log('Response: OK!')
        }
        const isJson = (response.headers.get('content-type') || '').includes('application/json')
        let data = isJson ? await response.json() : await response.text()
        console.log(data)
        return [data, null];
    }
    catch (error) {
        console.error(error.message);

        return [null, error];
    }
}



// JavaScript to handle button clicks and form submissions can go here
document.getElementById('menu-button').addEventListener('click', () => {
    alert('Menu button clicked');
});

document.getElementById('info-button').addEventListener('click', () => {
    alert('Info button clicked');
});

document.getElementById('about-devs-button').addEventListener('click', () => {
    alert('About the Devs button clicked');
});

// Mock dataset of Pokémon by continent
const pokemonInRegionData = {
    "Africa": ["Sandile", "Torterra", "Hippopotas"],
    "Asia": ["Pikachu", "Charmander", "Bulbasaur"],
    "Europe": ["Rattata", "Eevee", "Snorlax"],
    "North America": ["Squirtle", "Pidgey", "Jigglypuff"],
    "South America": ["Ludicolo", "Tropius", "Yanma"],
    "Australia": ['Victreebel', "Sharpedo", "Houndoom"],
    "Oceania": ["Lapras", "Gyarados", "Kangaskhan"],
    "Antarctica": ["Regice", "Cubchoo", "Snom"]
};



document.getElementById('enter-button').addEventListener('click', () => {
    const continent = document.getElementById('continent').value;
    const resultsDiv = document.getElementById('results');

    if (pokemonInRegionData[continent]) {
        resultsDiv.innerHTML = `<h2 aria-label="search-result-header" id="searchResultHeader">Pokémon in ${continent}:</h2><ul>` + pokemonInRegionData[continent].map(pokemon =>
            `<section id="pokemon-container"> 
                                                                                                                                        <img id="pokemon-sprite" src=""> 
                                                                                                                                        <li class='listed-pokemon'> ${pokemon} 
                                                                                                                                       <section id="types"> <button id="type1" class="type-button">Type 1</button>  <button id="type2" class="type-button">Type 2</button> </section>
                                                                                                                                        <button id="pokemon-more-info">Learn more</button> 
                                                                                                                                        </li>
                                                                                                                                        </section>`).join('') + `</ul>`;




        // Add click event listeners to each listed Pokémon
        const listedPokemons = resultsDiv.querySelectorAll('.listed-pokemon');

        console.log(listedPokemons)
        listedPokemons.forEach(pokemonElement => {
            pokemonElement.addEventListener('click', () => {
                const pokemon = pokemonElement.textContent.toLowerCase()
                //calling that fetch using a url
                const pokemonGenInfoUrl = `https://pokeapi.co/api/v2/pokemon/${pokemon}`
                const genPokemonData = fetchPokemonData(pokemonGenInfoUrl);
                console.log(genPokemonData)

                //writing promises to fetch

                const pokemonSprite = fetchPokemonData(pokemonSpriteUrl).then(
                    data => {
                        return data.sprites
                    }
                )
                console.log(pokemonSprite)





            });
        });
    } else {
        resultsDiv.innerHTML = `<p> No Pokémon data available for ${continent}. </p> `;
    }
});









// // <!-- Testing the fetch -->


// async function testRoute(url) {
//     const response = await fetch(url);
//     const data = await response.json();
//     console.log('data:', data);
// }


// const url1 = `https://pokeapi.co/api/v2/pokemon/ditto`;

// testRoute(url1);

// //creating a fetch function for pokemon types and testing it
// const typeTest = () => {

//     //defining a url variable which holds the url to a pokemon ground type database
//     const urlGround = (`https://pokeapi.co/api/v2/type/5`);

//     //returning a fetch promise
//     return fetch(urlGround)
//         //chaining .then promises 
//         .then(response => {
//             /*
//             checking if the promise resolved, if not creating an error message to increase 
//             error transparency to know how to debug (why it went wrong)
//             */
//             if (!response.ok) {
//                 throw new Error(`Error: ${response.status}`)
//             }
//             //when fetching from the given resource, the success default should be to return the response parsed with JSON
//             return response.json();
//             //taking the data or information within the response (information about ground types) and console logging all of ground type pokemon
//         }).then(data => {
//             console.log(data.pokemon)
//             //returning it so the promise results in having a value to offer to another promise chained to this promise, if anything 
//             return data.pokemon
//         }).then(pokemon => {
//             //returning a random pokemon of the ground type array by generating a number from 1 through 187 (representing the indexes of the object array the pokemon are held in)
//             const randomNum = Math.ceil(Math.random() * 188)
//             //returning the pokemon at the random given index generated by randomNum()
//             console.log(pokemon[randomNum - 1])
//         })
//         //catching the error and throwing it back???
//         .catch(error => {
//             console.error('Could not fetch pokemon:', error);
//             throw error; // Re-throw the error to ensure the promise is rejected?? I need more explanation 
//         });


// }

// typeTest();



