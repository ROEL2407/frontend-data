function starters() {
    // Fetch init API
    fetch("https://pokeapi.co/api/v2/pokemon?limit=9&offset=0")
        .then(response => response.json())
        .then(data => getPokemonData(data))
}
    
function getPokemonData(data) {
    let urls = [];
    let promises = [];
    let pokemons = [];

    data.results.forEach(result => {
        // Push all urls into array urls
        urls.push(result.url);
    });
    
    // For all urls, push a promise from the url to an array promises
    for (let i = 0; i < urls.length; i++) {
        promises.push(getPokemon(urls[i]));
    }
    // Resolve all promises
    Promise.all(promises).then(results => {
        // For each pokemon in results push the pokemon to the array pokemons
        results.forEach(pokemon => {
            pokemons.push({
                naam: pokemon.name,
                stats: pokemon.stats
            });
        });
        CountStats(pokemons);
    });
}

function CountStats(pokemons) {
    let starterMons = [];
    pokemons.forEach(e => {
        // For every pokemon/object in the array
        const stats = e.stats;  
        let valueHolder = [];
        let totalValueHolder = 0;
        stats.forEach(total => {
            // Counts up values of array to a total
            const reducer = (previousValue, currentValue) => previousValue + currentValue; 
            // Push the stats into a holder and add them up, then set into another holder 
            valueHolder.push(total.base_stat);  
            totalValueHolder = valueHolder.reduce(reducer);
        });
        // Push the name, stats and the total of the stats into a new array
        starterMons.push({
            Naam: e.naam,
            stats: e.stats,
            Totaal: totalValueHolder
        });
    });
    console.table(starterMons);
}

function getPokemon(url) {
    // return every fetch
    return fetch(url)
        .then(response => response.json())
        .then(data => data);
}
starters();