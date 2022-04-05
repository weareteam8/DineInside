var working = function () {
  console.log("Connected - hello from script.js");
};
working();

//variables
var cockTailUrl = "https://the-cocktail-db.p.rapidapi.com/random.php";
var yumlyUrl = "https://yummly2.p.rapidapi.com/categories/list";
var MealsUrl = "https://themealdb.p.rapidapi.com/latest.php";

// get element by ID for PARENT
var drinksList = document.querySelector(".drinks-list");
var randomMealImg = document.getElementById("RandomMealImg");
var randomMealTitleEl = document.getElementById("featuredMealTitle");
var randomMealIngredientsEl = document.getElementById("ingredients");

// // API CALL 1 COCKTAILDB
// const cockTails = {
//   method: "GET",
//   headers: {
//     "X-RapidAPI-Host": "the-cocktail-db.p.rapidapi.com",
//     "X-RapidAPI-Key": "37f2a9a7cemsh5b611bc49e7a303p1e79e6jsn6b86cc035e5d",
//   },
// };

// fetch(cockTailUrl, cockTails)
//   .then((response) => response.json())
//   .then((response) => console.log(response.drinks))
//   .catch((err) => console.error(err + "Error with Drinks"));

// //API CALL 2 YUMLY

// const yumlyMeals = {
//   method: "GET",
//   headers: {
//     "X-RapidAPI-Host": "yummly2.p.rapidapi.com",
//     "X-RapidAPI-Key": "37f2a9a7cemsh5b611bc49e7a303p1e79e6jsn6b86cc035e5d",
//   },
// };

// fetch(yumlyUrl, yumlyMeals)
//   .then((response) => response.json())
//   .then((response) => console.log(response))
//   .catch((err) => console.error(err));

// // API CALL 3 TheMealDB

//

//functions
drinksList.addEventListener("click", function (event) {
  if (event.target && event.target.innerHTML === "Vodka") {
    console.log("CLICKED VODKA");
  } else if (event.target && event.target.innerHTML === "Gin") {
    console.log("CLICKED GIN");
  } else if (event.target && event.target.innerHTML === "Rum") {
    console.log("Clicked RUM");
  } else if (event.target && event.target.innerHTML === "Whiskey") {
    console.log("clicked Whiskey");
  } else if (event.target && event.target.innerHTML === "NonAlcoholic") {
    console.log("NO ALCOHOL");
  }
});
