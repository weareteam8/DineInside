var working = function () {
  console.log("Connected - hello from script.js");
};

//variables
working();
// API CALL 1 COCKTAILDB
// const options = {
//   method: "GET",
//   headers: {
//     "X-RapidAPI-Host": "the-cocktail-db.p.rapidapi.com",
//     "X-RapidAPI-Key": "37f2a9a7cemsh5b611bc49e7a303p1e79e6jsn6b86cc035e5d",
//   },
// };

// fetch("https://the-cocktail-db.p.rapidapi.com/filter.php?i=wine", options)
//   .then((response) => response.json())
//   .then((response) => console.log(response.drinks))
//   .catch((err) => console.error(err));
// API CALL 2 Cooking Recipe
const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Host": "cooking-recipe2.p.rapidapi.com",
    "X-RapidAPI-Key": "37f2a9a7cemsh5b611bc49e7a303p1e79e6jsn6b86cc035e5d",
  },
};

fetch("https://cooking-recipe2.p.rapidapi.com/", options)
  .then((response) => response.json())
  .then((response) => console.log(response))
  .catch((err) => console.error(err));
//functions
