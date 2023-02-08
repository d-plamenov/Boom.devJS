import "../scss/app.scss";

window.addEventListener("DOMContentLoaded", () => {
  // This block will be executed once the page is loaded and ready
  const ul = document.querySelector("ul");
  fetch("https://pokeapi.co/api/v2/pokemon?limit=10")
    .then((response) => response.json())
    .then((data) => {
      const pokemon = data.results;
      pokemon.forEach(p => {
        const listItem = document.createElement("li");
        listItem.innerText = p.name
        ul.appendChild(listItem);
      })
    });
  

});
