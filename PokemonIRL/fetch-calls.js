
// // JavaScript to handle button clicks and form submissions can go here
// document.getElementById('menu-button').addEventListener('click', () => {
//     alert('Menu button clicked');
// });

// document.getElementById('info-button').addEventListener('click', () => {
//     alert('Info button clicked');
// });

// document.getElementById('about-devs-button').addEventListener('click', () => {
//     alert('About the Devs button clicked');
// });

// // Mock dataset of Pokémon by continent
// const pokemonData = {
//     "Africa": ["Sandile", "Torterra", "Hippopotas"],
//     "Asia": ["Pikachu", "Charmander", "Bulbasaur"],
//     "Europe": ["Rattata", "Eevee", "Snorlax"],
//     "North America": ["Squirtle", "Pidgey", "Jigglypuff"],
//     "Oceania": ["Lapras", "Gyarados", "Kangaskhan"],
//     "South America": ["Ludicolo", "Tropius", "Yanma"]
// };

// document.getElementById('enter-button').addEventListener('click', () => {
//     const continent = document.getElementById('continent').value;
//     const resultsDiv = document.getElementById('results');

//     if (pokemonData[continent]) {
//         resultsDiv.innerHTML = `<h2>Pokémon in ${continent}:</h2><ul>` + pokemonData[continent].map(pokemon => `<li>${pokemon}</li>`).join('') + `</ul>`;
//     } else {
//         resultsDiv.innerHTML = `<p>No Pokémon data available for ${continent}.</p>`;
//     }
// });
