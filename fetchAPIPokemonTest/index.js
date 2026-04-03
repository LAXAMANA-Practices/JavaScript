// Based on pokeapi.co

fetchData();

async function fetchData() {
  const pokemonName = document
    .getElementById("pokemonName")
    .value.toLowerCase();
  const pokemonSprite = document.getElementById("pokemonSprite");
  
  try {
    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${pokemonName}`,
    );

    if (!response.ok) {
      throw new Error("Could not fetch resource.");
    }

    const data = await response.json();

    pokemonSprite.setAttribute("src", data.sprites.front_default);
    pokemonSprite.style.display = "block";
  } catch (error) {
    console.error(error);

    pokemonSprite.style.display = "none";
    pokemonSprite.src = "";
  }
}
