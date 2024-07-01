

//fetch function for pokemon data -----------------------------------------------------------------------------------------------------------------------------------
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
       // console.log(data)
       const height = data.height
       console.log(height)


       let resultDiv = document.getElementsByClassName("results")[0];
       let heightText = document.createElement("p");
       
       heightText.textContent = height; // Ensure 'height' is defined
       
       resultDiv.appendChild(heightText);
       console.log(height)
        return [data, null];
    }
    catch (error) {
        console.error(error.message);

        return [null, error];
    }
}

//------------------------------------------------------------------------------------------------------------------------------------------------


// JavaScript to handle button clicks and form submissions can go here

// Event listeners for the menu, info, and about the devs button ------------------------------------------------------------------------------------

//document.getElementById('menu-button').addEventListener('click', () => {
 //   alert('Menu button clicked');
//});

//document.getElementById('info-button').addEventListener('click', () => {
 //   alert('Info button clicked');
//});

//document.getElementById('about-devs-button').addEventListener('click', () => {
 //   alert('About the Devs button clicked');
//});

//-----------------------------------------------------------------------------------------------------------------------------------

// Datasets for each continent and the pokemon they contain -----------------------------------------------------------------------------------------------------------------------------------
const pokemonInRegionData = {
    "Africa": ["Sandile", "Torterra", "Hippopotas"],
    "Asia": ["Pikachu", "Charmander", "Bulbasaur"],
    "Europe": ["Rattata", "Eevee", "Snorlax"],
    "North America": ["Squirtle", "Pidgey", "Jigglypuff"],
    "South America": ["Ludicolo", "Tropius", "Yanma"],
    "Australia": ['Victreebel', "Sharpedo", "Houndoom"],
    "Oceania": ["Lapras", "Gyarados", "Kangaskhan"],
    "Antarctica": ["Regice", "Cubchoo", "Snom"],
};
//----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

//event listener for the enter button when prompted with a continent 
document.getElementById('enter-button').addEventListener('click', async () => {
    //getting the continent submission data via the value
    const continent = document.getElementById('continent').value;
    console.log(continent)
    console.log(pokemonInRegionData[continent])
    const resultsDiv = document.getElementById('results');


    resultsDiv.innerHTML = `<h2 aria-label="search-result-header" id="searchResultHeader">Pokémon in ${continent}:</h2><ul></ul>`


    if (pokemonInRegionData[continent]) {

        pokemonInRegionData[continent].forEach(async pokemon => {
            // const pokemonName = document.querySelector("#pokemon-name").textContent.toLowerCase().trim();
            // console.log(pokemonName)


            //creating the list element -------------------------------------------------------------------------------------------------
            const pokemonListElement = document.createElement('li')
            pokemonListElement.setAttribute('id', `${pokemon}-listing`)
            //appending the list element
            document.querySelector('ul').appendChild(pokemonListElement)

            console.log(document.querySelector('ul'))

            //creating the pokemon container --------------------------------------------------------------------------------------------------------------------------------------------------
            const pokeContainer = document.createElement('section')
            pokeContainer.setAttribute('id', `${pokemon}-container`)
            pokeContainer.setAttribute('class', `pokemon-container`)


            //must select the specific list element for the specific pokemon, otherwise it shoves all the sections you create for each pokemon into the first instance of the selected html element it finds. FUCKKK
            document.querySelector(`#${pokemon}-listing`).appendChild(pokeContainer)
            console.log(pokeContainer)

            //getting the general information about the pokemon. Since their names in the api are all lowercase, we have to make the pokemon name all lowercase, too. ---------------------------------------------------------------------
            const pokemonGenInfoUrl = `https://pokeapi.co/api/v2/pokemon/${pokemon.toLowerCase()}`;
            console.log(pokemonGenInfoUrl);

            //calling that fetch using a url
            const pokemonInfo = await fetchPokemonData(pokemonGenInfoUrl);
            console.log(pokemonInfo);

            //getting the sprites ----------------------------------------------------------------------------------------------------
            const pokeSpriteData = await pokemonInfo[0].sprites.front_default;
            console.log(pokeSpriteData);
            //creating the image element
            const pokemonSprite = document.createElement(`img`);
            //setting the attribute up to have an id and the source be the url fetched in the pokeSpriteData promise
            pokemonSprite.setAttribute("id", `${pokemon}-sprite`);
            pokemonSprite.setAttribute("src", `${pokeSpriteData}`);
            pokemonSprite.setAttribute('class', 'poke-image')
            pokemonSprite.setAttribute('alt', `${pokemon}-default-look!`)

            document.querySelector(`#${pokemon}-container`).appendChild(pokemonSprite)

            //type section creation ---------------------------------------------------------------------------------------------
            const typeSection = document.createElement('section');
            typeSection.setAttribute('id', `${pokemon}-types`);
            typeSection.setAttribute('class', 'types');
            document.querySelector(`#${pokemon}-container`).appendChild(typeSection)
            console.log(pokeContainer)

            // // types button creation ---------------------------------------------------------------------------------------------------
            // const typeButton1 = document.createElement('button1')
            // typeButton1.setAttribute('class', 'types');
            // typeButton1.setAttribute('id', `${pokemon}-type1`)

            // //getting the type information from the array
            // const pokeTypeData = await pokemonInfo[0].types[0].type.name


            // typeButton1.textContent = pokeTypeData

            // document.querySelector(`#${pokemon}-types`).appendChild(typeButton1)

            if (pokemonInfo[0].types.length === 2) {
                //type 1 button ---------------------------------------------------------------------------------------------------
                const typeButton1 = document.createElement('button')
                typeButton1.setAttribute('class', 'type-button');
                typeButton1.setAttribute('id', `${pokemon}-type1`)

                //getting the type information from the array
                const pokeTypeData1 = await pokemonInfo[0].types[0].type.name
                // console.log(pokeTypeData)

                typeButton1.textContent = pokeTypeData1.toUpperCase();

                //type 2 button ---------------------------------------------------------------------------------------------------
                const typeButton2 = document.createElement('button')
                typeButton2.setAttribute('class', 'type-button');
                typeButton2.setAttribute('id', `${pokemon}-type2`)

                //getting the type information from the array
                const pokeTypeData2 = await pokemonInfo[0].types[1].type.name
                // console.log(pokeTypeData)

                typeButton2.textContent = pokeTypeData2.toUpperCase();

                document.querySelector(`#${pokemon}-types`).appendChild(typeButton1)
                document.querySelector(`#${pokemon}-types`).appendChild(typeButton2)

            } else if (pokemonInfo[0].types.length === 1) {
                const typeButton1 = document.createElement('button')
                typeButton1.setAttribute('class', 'type-button');
                typeButton1.setAttribute('id', `${pokemon}-type1`)

                //getting the type information from the array
                const pokeTypeData1 = await pokemonInfo[0].types[0].type.name
                // console.log(pokeTypeData)

                typeButton1.textContent = pokeTypeData1.toUpperCase();

                document.querySelector(`#${pokemon}-types`).appendChild(typeButton1)

            }

            console.log(document.querySelector(`#${pokemon}-types`))


            //creating the name element -------------------------------------------------------------------------------------------------------------------------------

            //Getting the pokemons name 
            const pokemonNameData = pokemon;
            //name element creation
            const pokemonName = document.createElement("h3");
            pokemonName.setAttribute("id", "pokemon-name");
            pokemonName.setAttribute('class', 'listed-pokemon');
            pokemonName.textContent = pokemonNameData
            document.querySelector(`#${pokemon}-container`).appendChild(pokemonName)
            console.log(pokemonName)


            //creating a 'more information' button ----------------------------------------------------------------------------------------------------------------------------------------
            const infoButton = document.createElement('button');
            infoButton.setAttribute('id', `${pokemon}-info-button`);
            infoButton.setAttribute('class', 'info-button')
            infoButton.textContent = `Learn More About ${pokemon}!`

            document.querySelector(`#${pokemon}-container`).appendChild(infoButton)




        }).join('');







        // const listedPokemons = document.querySelectorAll("#pokemon-container")

        // console.log(listedPokemons)
        // listedPokemons.forEach(async pokemonElement => {


        //     //trimming to take out whitespaces
        //     // console.log(pokemonElement)
        //     //Must do this for every
        //     //Getting the element that holds the pokemon name, getting the text content so it's just the name, making it all lowercase so it matches the name of the pokemon in the api database, trimming it so there's no whitespace (because the whitespace counts as a character)
        //     const pokemonName = document.querySelector("#pokemon-name").textContent.toLowerCase().trim();
        //     // console.log(pokemonName)
        //     //
        //     const pokemonGenInfoUrl = `https://pokeapi.co/api/v2/pokemon/${pokemonName}`;
        //     console.log(pokemonGenInfoUrl)

        //     //calling that fetch using a url
        //     const pokemonInfo = await fetchPokemonData(pokemonGenInfoUrl)
        //     console.log(pokemonInfo)


        //     const pokeSpriteData = await pokemonInfo[0].sprites.front_default;
        //     console.log(pokeSpriteData)

        //     const pokemonSprite = document.createElement(`img`);

        //     pokemonSprite.setAttribute("id", "poke-sprite")
        //     pokemonSprite.setAttribute("src", `${pokeSpriteData}`)

        //     document.querySelector('#pokemon-container').appendChild(pokemonSprite);
        //     document.querySelector('#pokemon-container').insertBefore('#pokemon-name')


        //     if (pokeSpriteData) {
        //         pokemonSprite.setAttribute("src", pokeSpriteData);
        //     }




        //when you click on the pokemon 
        // pokemonElement.addEventListener('click', async () => {




        // });
        // });
    } else {
        resultsDiv.innerHTML = `<p> No Pokémon data available for ${continent.trim()}. </p> `;
    }
});


// fetch function for Pokemon search bar
document.getElementById('search-button').addEventListener('click', fetchPokemonData);

async function fetchPokemonData() {
  const pokemonName = document.getElementById('pokemon-search').value.toLowerCase();
  const apiUrl = `https://pokeapi.co/api/v2/pokemon/${pokemonName}`;

  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error('Pokémon not found');
    }
    const data = await response.json();
    displayPokemonData(data);
  } catch (error) {
    console.error('Error fetching Pokémon data:', error);
    document.getElementById('search-results').innerHTML = `<p>${error.message}</p>`;
  }
}

function displayPokemonData(data) {
  const pokemonHTML = `
    <h2>${data.name.charAt(0).toUpperCase() + data.name.slice(1)}</h2>
    <img src="${data.sprites.front_default}" alt="${data.name}">
    <p>Height: ${data.height}</p>
    <p>Weight: ${data.weight}</p>
    <p>Type: ${data.types.map(type => type.type.name).join(', ')}</p>
  `;
  document.getElementById('search-results').innerHTML = pokemonHTML;
}










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



